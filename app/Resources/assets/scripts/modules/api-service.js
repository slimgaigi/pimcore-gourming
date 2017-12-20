/**
 * api-service module
 */
module.exports = (function ($) {
    'use strict';

    let name = 'apiService';

    function fail(cb, p) {
        if (cb && typeof cb === 'function') {
            cb(p);
        }
    }

    function success(cb, p) {
        if (cb && typeof cb === 'function') {
            cb(p);
        }
    }

    function get(pId, cb, errCb) {
        $.ajax(`/webservice/rest/object/id/${pId}`).then((p) => {
            success(cb, p);
            return p;
        }).fail((r, s) => {
            fail(errCb, s);
        });
    }

    function del(pId, cb, errCb) {
        $.ajax(`/webservice/rest/object/id/${pId}?method=delete`).then((p) => {
            success(cb, p);
            return p;
        }).fail((r, s) => {
            fail(errCb, s);
        });
    }

    function create(pId, data, cb, errCb) {
        $.ajax(`/webservice/rest/object/id/${pId}?method=PUT`, {
            data: JSON.stringify(data),
        }).then((p) => {
            success(cb, p);
            return p;
        }).fail((r, s) => {
            fail(errCb, s);
        });
    }

    function update(pId, data, cb, errCb) {
        $.ajax(`/webservice/rest/object/id/${pId}?method=PUT`, {
            data: JSON.stringify(data),
        }).then((p) => {
            success(cb, p);
            return p;
        }).fail((r, s) => {
            fail(errCb, s);
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