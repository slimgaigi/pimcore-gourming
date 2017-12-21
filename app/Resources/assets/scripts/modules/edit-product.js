/**
 * edit-product module
 */
module.exports = (function ($) {
    'use strict';

    let name = 'editProduct',
        S = require('string'),
        Rx = require('rxjs-es/Rx'),
        api = require('./api-service'),
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
        },
        confirmCtaTpl = S('<button type="button" class="cta cta--confirm">{{text}}</button>'),
        cancelCtaTpl = S('<button type="button" class="cta cta--cancel">{{text}}</button>'),
        imgItemTpl = S(`
        <li class="product__images-item">
            <img src="{{ src }}" alt="" class="product__image">
            <div class="product__image-ctas">
                <button type="button" class="cta cta--delete"><svg class="icon icon--close"><use xlink:href="#icon-close"></use></svg></button>
                <input type="file" class="product__input product__input--image" id="pImage-{{ index }}" name="images[]">
            </div>
        </li>
        `)
    ;

    window.location.href.replace(/product\/(\d+)/gi, (a, id) => {
        pObject.id = id;
    });

    function setProductData(data) {
        pObject.data = data;
        pObject.product = new Product(data.id);
        pObject.product.name = new ProductField(data.elements[0]);
        pObject.product.description = new ProductField(data.elements[1]);
        pObject.product.images = new ProductField(data.elements[2]);
    }

    function updateImagesList() {
        Rx.Observable.forkJoin(pObject.product.images.value.map((img) => {
            return api.get(img.id, 'image');
        })).subscribe((a) => {
            $pImagesList.html('');
            a.map((r, i) => {
                $(imgItemTpl.template({
                    src: r.data.path + r.data.filename,
                    index: i
                }).s).appendTo($pImagesList)
                ;
            });
        })
        ;
    }

    function updateTextFields() {
        $pName.find('.product__value').text(pObject.product.name.value);
        $pNameInput.val(pObject.product.name.value);
        $pName.removeClass('js-edit-mode');
        $pDescription.find('.product__value').text(pObject.product.description.value);
        $pDescriptionInput.val(pObject.product.description.value);
        $pDescription.removeClass('js-edit-mode');
    }

    function setListeners() {
        $product.on('click', '.cta', function (e) {
            let $target = $(e.currentTarget),
                $popupContent = $('<div class="popup-content"></div>'),
                imgIndex,
                $delConfirm,
                $delCancel,
                updatedProduct,
                data
            ;

            if ($target.hasClass('cta--delete')) {
                imgIndex = $pImagesList.find('.cta--delete').index($target);

                $delConfirm = $(confirmCtaTpl.template({text: 'I confirm image delete !'}).s);
                $delCancel = $(cancelCtaTpl.template({text: 'Cancel image delete'}).s);
                $popupContent.append($delConfirm, $delCancel);

                $delCancel.click(() => {
                    $.magnificPopup.close();
                });

                $delConfirm.click(() => {
                    $product.addClass('pending');
                    updatedProduct = Object.assign({}, pObject.product.native());
                    updatedProduct.images.value = pObject.product.images.value.filter((o, i) => i !== imgIndex);
                    data = Object.assign({}, pObject.data, {
                        elements: [
                            updatedProduct.name,
                            updatedProduct.description,
                            updatedProduct.images
                        ]
                    });

                    api
                        .update(pObject.id, 'product', data)
                        .done((r) => {
                            setProductData(r.data);
                            updateImagesList();
                        })
                        .always(() => {
                            $product.removeClass('pending');
                        })
                    ;
                    $.magnificPopup.close();
                });

                $.magnificPopup.open({
                    items: {
                        type: 'inline',
                        src: $popupContent
                    }
                });
            }

            if ($target.hasClass('cta--add')) {
                // TODO: implement add image feature
            }

            if ($target.hasClass('cta--validate')) {
                $product.addClass('pending');
                $pName.removeClass('dirty');
                $pDescription.removeClass('dirty');
                updatedProduct = Object.assign({}, pObject.product.native());
                $pNameInput.val().length && (updatedProduct.name.value = $pNameInput.val());
                updatedProduct.description.value = $pDescriptionInput.val();
                data = Object.assign({}, pObject.data, {
                    elements: [
                        updatedProduct.name,
                        updatedProduct.description,
                        updatedProduct.images
                    ]
                });
                api
                    .update(pObject.id, 'product', data)
                    .done((r) => {
                        setProductData(r.data);
                        updateTextFields();
                    })
                    .always(() => {
                        $product.removeClass('pending');
                    })
                ;
            }

        });
        $pName.on({
            click: () => {
                $pName.addClass('js-edit-mode');
                $pDescription.removeClass('js-edit-mode');
            }
        });
        $pNameInput.on({
            keyup: (e) => {
                if (pObject.product.name.value !== e.target.value.trim() && e.target.value.trim().length) {
                    $pName.addClass('dirty');
                } else {
                    $pName.removeClass('dirty');
                }
            },
            blur: updateTextFields
        });

        $pDescription.on({
            click: () => {
                $pDescription.addClass('js-edit-mode');
                $pName.removeClass('js-edit-mode');
            }
        });
        $pDescriptionInput.on({
            keyup: (e) => {
                if (pObject.product.description.value !== e.target.value.trim()) {
                    $pDescription.addClass('dirty');
                } else {
                    $pDescription.removeClass('dirty');
                }
            },
            blur: updateTextFields
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

        api
            .get(pObject.id, 'product')
            .then((p) => { // let's record the product
                setProductData(p.data);
            })
        ;

        setListeners();
    }

    return {
        name,
        ready
    };
})(jQuery);