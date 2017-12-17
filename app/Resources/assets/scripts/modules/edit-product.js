/**
 * edit-product module
 */
module.exports = (function ($) {
    'use strict';

    let name = 'editProduct',
        apiService = require('./api-service'),
        $product,
        $pName,
        $pDescription,
        $pImages,
        pObject = {
            id: null,
            name: '',
            description: '',
            images: ''
        }
    ;

    window.location.href.replace(/product\/(\d+)/gi, (a, id) => {
        pObject.id = id;
    });

    function setListeners() {
        $pName.on({
            mouseenter: () => {
                $pName.addClass('editable');
            },
            mouseleave: () => {
                $pName.removeClass('editable');
            }
        });
        $pDescription.on({
            mouseenter: () => {
                $pDescription.addClass('editable');
            },
            mouseleave: () => {
                $pDescription.removeClass('editable');
            }
        });
        $pImages.on({
            mouseenter: () => {
                $pImages.addClass('editable');
            },
            mouseleave: () => {
                $pImages.removeClass('editable');
            }
        });
    }

    function ready() {
        $product = $('.product');

        if (!$product.length || !$product.hasClass('editable')) {
            return;
        }

        $pName = $product.find('.product__name');
        $pDescription = $product.find('.product__description');
        $pImages = $product.find('.product__images-list');

        setListeners();
        apiService.get(pObject.id);
    }

    return {
        name,
        ready
    };
})(jQuery);