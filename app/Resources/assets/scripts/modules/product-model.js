/**
 * product-model module
 */
module.exports = (function () {
    'use strict';

    let name = 'productModel';

    class ProductField {
        constructor(o) {
            this._language = o.language;
            this._name = o.name;
            this._type = o.type;
            this._value = o.value;
        }

        get name() {
            return this._name;
        }
        set name(value) {
            this._name = value;
        }

        get type() {
            return this._type;
        }
        set type(value) {
            this._type = value;
        }

        get language() {
            return this._language;
        }
        set language(value) {
            this._language = value;
        }

        get value() {
            return this._value;
        }
        set value(value) {
            this._value = value;
        }

        native() {
            return {
                name: this._name,
                type: this._type,
                language: this._language,
                value: this._value,
            }
        }
    }

    class Product {
        constructor(id) {
            this._id = parseInt(id, 10);
        }
        get id() {
            return this._id;
        }
        set id(value) {
            this._id = parseInt(value, 10);
        }

        get name() {
            return this._name;
        };
        set name(pf) {
            this._name = pf;
        };

        get description() {
            return this._description;
        };
        set description(pf) {
            this._description = pf;
        };

        get images() {
            return this._images;
        };
        set images(pf) {
            this._images = pf;
        };

        native() {
            return {
                id: this._id,
                name: this._name.native(),
                description: this._description.native(),
                images: this._images.native(),
            }
        }
    }

    return {
        name,
        ProductField,
        Product,
    };
})();