/**
 * api-service module
 */
module.exports = (function ($) {
    'use strict';

    let name = 'apiService';

    function get(pId) {
        $.ajax(`/webservice/rest/object/id/${pId}`, {
            method: 'GET'
        }).then((p) => {
            if (!p.success) {
                console.log(p.msg);
            }
            return p;
        });
    }

    function del(pId) {
        $.ajax(`/webservice/rest/object/id/${pId}`, {
            method: 'DELETE'
        }).then((p) => {
            if (!p.success) {
                console.log(p.msg);
            }
            return p;
        });
    }

    function create(pId, elements) {
        $.ajax(`/webservice/rest/object/id/${pId}`, {
            method: 'PUT',
            data: {
                className: "Product",
                elements: elements,
            },
        }).then((p) => {
            if (!p.success) {
                console.log(p.msg);
            }
            return p;
        });
    }

    function update(pId, elements) {
        $.ajax(`/webservice/rest/object/id/${pId}`, {
            method: 'PUT',
            data: {
                className: "Product",
                elements: elements,
                id: pId
            },
        }).then((p) => {
            if (!p.success) {
                console.log(p.msg);
            }
            return p;
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