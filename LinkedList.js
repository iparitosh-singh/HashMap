"use strict";
exports.__esModule = true;
var LLNode = /** @class */ (function () {
    function LLNode(key, data) {
        this.next = null;
        this.prev = null;
        this.data = data;
        this.key = key;
    }
    return LLNode;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        var _this = this;
        this.head = null;
        this.findNode = function (node, key) {
            if (!node)
                return null;
            return node.key === key ? node : _this.findNode(node.next, key);
        };
    }
    LinkedList.prototype.toArray = function () {
        var arr = [];
        if (!this.head)
            return arr;
        var addToArray = function (node) {
            var pair = {
                key: node.key,
                value: node.data
            };
            arr.push(pair);
            return node.next ? addToArray(node.next) : arr;
        };
        return addToArray(this.head);
    };
    LinkedList.prototype.isEmpty = function () {
        return this.head === null;
    };
    LinkedList.prototype.insertAtEnd = function (key, data) {
        var node = new LLNode(key, data);
        if (!this.head) {
            this.head = node;
            return node;
        }
        var getLast = function (node) {
            return node.next ? getLast(node.next) : node;
        };
        var lastNode = getLast(this.head);
        node.prev = lastNode;
        lastNode.next = node;
        return node;
    };
    LinkedList.prototype.deleteNode = function (key) {
        var node = this.findNode(this.head, key);
        if (!node) {
            console.log("not found");
            return -1;
        }
        if (!node.prev) {
            this.head = node.next;
            return 0;
        }
        var prevNode = node.prev;
        prevNode.next = node.next;
        if (node.next) {
            node.next.prev = prevNode;
        }
        return 0;
    };
    LinkedList.prototype.updateNode = function (key, value) {
        var node = this.findNode(this.head, key);
        if (!node)
            return -1;
        node.data = value;
        return 0;
    };
    LinkedList.prototype.searchNode = function (key) {
        var node = this.findNode(this.head, key);
        if (!node)
            return -1;
        return node.data;
    };
    return LinkedList;
}());
exports["default"] = LinkedList;
