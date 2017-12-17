/**
 * edit-product module
 */
module.exports = (function ($) {
    'use strict';

    let name = 'editProduct',
        apiService = require('./api-service'),
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
            name: '',
            description: '',
            images: []
        }
    ;

    window.location.href.replace(/product\/(\d+)/gi, (a, id) => {
        pObject.id = id;
    });

    function setListeners() {
        $product.on('click', '.cta', function(e) {
            let $target = $(e.currentTarget),
                $delConfirm = $('<button type="button">I confirm image delete !</button>'),
                $delCancel = $('<button type="button">Cancel image delete</button>'),
                $popupContent = $('<div class="popup-content"></div>')
            ;

            console.log($target);

            if ($target.hasClass('cta--delete')) {
                console.log('delete');
                $popupContent.append($delConfirm, $delCancel);
                $delCancel.click(() => {
                    $.magnificPopup.close();
                });

                $delConfirm.click(() => {
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

        pObject.name = $pName.text();
        pObject.description = $pDescription.html();

        $pImages.each((i, img) => {
            pObject.images.push(img);
        });

        apiService.get(pObject.id);

        setListeners();
    }

    return {
        name,
        ready
    };
})(jQuery);