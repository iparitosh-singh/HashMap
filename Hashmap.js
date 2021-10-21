"use strict";
exports.__esModule = true;
var LinkedList_1 = require("./LinkedList");
var crypto_1 = require("crypto");
var highwayhash_1 = require("highwayhash");
var HashMap = /** @class */ (function () {
    function HashMap(size) {
        var _this = this;
        if (size === void 0) { size = 10; }
        this.set = function (key, value) {
            var index = _this.hashMethod(key) % _this.bucket.length;
            if (_this.bucket[index].searchNode(key) == -1) {
                _this.bucket[index].insertAtEnd(key, value);
                _this.size += 1;
            }
            else {
                _this.bucket[index].updateNode(key, value);
            }
            if (_this.size - _this.bucket.length > _this.bucket.length) {
                _this.doubleBucketSize();
            }
        };
        this.get = function (key) {
            var index = _this.hashMethod(key) % _this.bucket.length;
            var value = _this.bucket[index].searchNode(key);
            if (typeof value == 'number')
                return null;
            else
                return value;
        };
        this["delete"] = function (key) {
            var index = _this.hashMethod(key) % _this.bucket.length;
            _this.bucket[index].deleteNode(key);
        };
        this.size = size;
        this.bucket = new Array(size);
        this.hashKey = (0, crypto_1.randomBytes)(32);
        for (var i = 0; i < size; i++)
            this.bucket[i] = new LinkedList_1["default"]();
    }
    HashMap.prototype.hashMethod = function (key) {
        var stringKey = key.toString();
        var inputBuffer = Buffer.from(stringKey);
        var hash = (0, highwayhash_1.asUInt32Low)(this.hashKey, inputBuffer);
        return hash;
    };
    // debug fucntion
    // public printEntireMap(): void{
    //     this.bucket.forEach(list => {
    //         const array = list.toArray()
    //         console.log(array)
    //     })
    // }
    HashMap.prototype.doubleBucketSize = function () {
        var _this = this;
        var newBucket = new Array(this.bucket.length * 2);
        this.bucket.forEach(function (list) {
            var array = list.toArray();
            array.forEach(function (pair) {
                var index = _this.hashMethod(pair.key) % newBucket.length;
                newBucket[index].insertAtEnd(pair.key, pair.value);
            });
        });
    };
    return HashMap;
}());
exports["default"] = HashMap;
