var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var _this = this;
/*
 * @Description: 方法装饰器
 * @Author: xiuji
 * @Date: 2023-08-16 10:29:58
 * @LastEditTime: 2023-08-16 10:45:00
 * @LastEditors: Do not edit
 */
/**
 * @Description:
 * @Author:
 * @param {any} target // 原型对象
 * @param {string} key // 方法名
 * @param {PropertyDescriptor} descriptor // 属性描述符，包含value, writable, enumerable, configurable
 * @return {*}
 * @Date: 2023-08-16 10:37:35
 */
function getNameDecorator(target, key, descriptor) {
    console.log(target);
    // descriptor.writable = false;
    descriptor.value = function () {
        return 'decorator';
    };
}
var UseDecorator = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _getName_decorators;
    return _a = /** @class */ (function () {
            function UseDecorator(name) {
                this.name = (__runInitializers(this, _instanceExtraInitializers), void 0);
                this.name = name;
            }
            UseDecorator.prototype.getName = function () {
                return this.name;
            };
            return UseDecorator;
        }()),
        (function () {
            _getName_decorators = [getNameDecorator];
            __esDecorate(_a, null, _getName_decorators, { kind: "method", name: "getName", static: false, private: false, access: { has: function (obj) { return "getName" in obj; }, get: function (obj) { return obj.getName; } } }, null, _instanceExtraInitializers);
        })(),
        _a;
}();
var useDecorator = new UseDecorator('neo');
console.log(useDecorator.getName()); // decorator
