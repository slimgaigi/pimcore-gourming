/**
 * edit-product module
 */
module.exports = (function ($) {
    'use strict';

    let name = 'editProduct',
        apiService = require('./api-service'),
        productModel = require('./product-model'),
        ProductField = productModel.ProductField,
        Product = productModel.Product,
        $product,
        $pName,
        $pNameInput,
        $pDescription,
        $pDescriptionInput,
        $pImagesList,
        $pImages,
        $addImageCta,
        pObject = {
            id: null,
            images: [],
        }
    ;

    window.location.href.replace(/product\/(\d+)/gi, (a, id) => {
        pObject.id = id;
    });

    function setListeners() {
        $product.on('click', '.cta', function (e) {
            let $target = $(e.currentTarget),
                $popupContent = $('<div class="popup-content"></div>'),
                imgIndex,
                $delConfirm,
                $delCancel
            ;

            if ($target.hasClass('cta--delete')) {
                imgIndex = $pImagesList.find('.cta--delete').index($target);

                $delConfirm = $('<button type="button">I confirm image delete !</button>');
                $delCancel = $('<button type="button">Cancel image delete</button>');
                $popupContent.append($delConfirm, $delCancel);

                $delCancel.click(() => {
                    $.magnificPopup.close();
                });

                $delConfirm.click(() => {
                    let updatedProduct = Object.assign({}, pObject.product.native()),
                        data
                    ;

                    updatedProduct.images.value = pObject.product.images.value.filter((o, i) => i !== imgIndex);

                    data = Object.assign({}, pObject.data, {elements: [
                            updatedProduct.name,
                            updatedProduct.description,
                            updatedProduct.images
                        ]})
                    ;

                    console.log(data);

                    apiService.update(pObject.id, data, (r) => {
                        console.log(r);
                    });
                    $.magnificPopup.close();
                });

                $.magnificPopup.open({
                    items: {
                        type: 'inline',
                        src: $popupContent
                    }
                });
            }

        });
        $pName.on({
            click: () => {
                $pName.addClass('js-edit-mode');
            }
        });
        $pDescription.on({
            click: () => {
                $pDescription.addClass('js-edit-mode');
            }
        });
        $pImagesList.on({
            click: () => {
                $pImagesList.addClass('js-edit-mode');
            }
        });
    }

    function ready() {
        $product = $('.product');

        if (!$product.length || !$product.hasClass('editable')) {
            return;
        }

        $pName = $product.find('.product__name');
        $pNameInput = $product.find('.product__input--name');
        $pDescription = $product.find('.product__description');
        $pDescriptionInput = $product.find('.product__input--description');
        $pImagesList = $product.find('.product__images-list');
        $pImages = $pImagesList.find('.product__image');
        $addImageCta = $product.find('#addImage');

        $pImages.each((i, img) => {
            pObject.images.push(img);
        });

        apiService.get(pObject.id, (p) => { // let's record the product
            pObject.data = p.data;
            pObject.product = new Product(p.data.id);
            pObject.product.name = new ProductField(p.data.elements[0]);
            pObject.product.description = new ProductField(p.data.elements[1]);
            pObject.product.images = new ProductField(p.data.elements[2]);
        });

        setListeners();
    }

    return {
        name,
        ready
    };
})(jQuery);