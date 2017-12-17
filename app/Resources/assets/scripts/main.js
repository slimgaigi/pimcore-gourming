/**
 * main module
 */
module.exports = (function ($) {
    'use strict';

    let name = 'main',
        resizeTO,
        modules = [
            require('./modules/edit-product'),
        ]
    ;

    $(document).ready(() => {
        for (let module of modules) {
            if (module.ready && typeof module.ready === 'function') {
                module.ready();
            }
        }
    });

    $(window).resize(() => {
        for (let module of modules) {
            if (module.resize && typeof module.resize === 'function') {
                module.resize();
            }
        }

        resizeTO && clearTimeout(resizeTO);
        resizeTO = setTimeout(() => {
            for (let module of modules) {
                if (module.resizeTO && typeof module.resizeTO === 'function') {
                    module.resizeTO();
                }
            }
        }, 250);
    });

    return {
        name,
    };
})(jQuery);