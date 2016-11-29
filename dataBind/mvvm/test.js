'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MVVM = function () {
    function MVVM(options) {
        _classCallCheck(this, MVVM);

        this.input = options.input;
        this.output = options.output;
        var data = this.data = options.data;
        var key = null,
            slice = [].slice;

        slice.call(options.input.attributes).forEach(function (attr) {
            return attr.name === 'data-model' && (key = attr.value);
        });

        if (key && data[key]) {
            var value = data[key];
            this.input.value = this.output.textContent = value;
            this.dataBinder(data, key, value);
        }
    }

    _createClass(MVVM, [{
        key: 'dataBinder',
        value: function dataBinder(data, key, value) {
            var _this = this;

            this.input.addEventListener('input', function (event) {
                return data[key] = event.target.value;
            });

            Object.defineProperty(data, key, {
                enumerable: true,
                configurable: false,
                get: function get() {
                    return value;
                },
                set: function set(newValue) {
                    if (newValue === value) return;
                    value = newValue;
                    _this.notify(value);
                }
            });
        }
    }, {
        key: 'notify',
        value: function notify(value) {
            this.output.textContent = value;
        }
    }]);

    return MVVM;
}();
