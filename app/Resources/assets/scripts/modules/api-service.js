/**
 * api-service module
 */
module.exports = (function ($) {
    'use strict';

    let name = 'apiService',
        S = require('string'),
        wsUrlMap = {
            product: {
                get: S('/webservice/rest/object/id/{{id}}'),
                del: S('/webservice/rest/object/id/{{id}}?method=delete'),
                create: S('/product/create'),
                update: S('/product/update/{{id}}'),
            },
            image: {
                get: S('/webservice/rest/asset/id/{{id}}'),
                del: S('/webservice/rest/asset/id/{{id}}?method=delete'),
                create: S('/webservice/rest/asset?method=PUT'),
                update: S('/webservice/rest/asset?method=PUT'),
            },
        }
    ;

    function get(id, type) {
        return $.ajax(wsUrlMap[type].get.template({id}).s);
    }

    function del(id, type) {
        return $.ajax(wsUrlMap[type].del.template({id}).s);
    }

    function create(id, type, data) {
        return $.ajax(wsUrlMap[type].create.template({id}).s, {
            method: 'POST',
            data: JSON.stringify(data),
        });
    }

    function update(id, type, data) {
        return $.ajax(wsUrlMap[type].update.template({id}).s, {
            method: 'POST',
            data: JSON.stringify(data),
        });
    }

    return {
        name,
        get,
        del,
        create,
        update,
    };
})(jQuery);