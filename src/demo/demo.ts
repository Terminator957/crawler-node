/*
 * @Description: 
 * @Author: xiuji
 * @Date: 2023-08-23 14:37:18`
 * @LastEditTime: 2023-08-23 14:52:54
 * @LastEditors: Do not edit
 */
function classDecorator1(target: any) {
    console.log('类装饰器 1 executed');
}

function classDecorator2(target: any) {
    console.log('类装饰器 2 executed');
}

function methodDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
    console.log(`方法装饰器 for ${key} executed`);
}

function methodDecorator1(target: any, key: string, descriptor: PropertyDescriptor) {
    console.log(`方法装饰器1 for ${key} executed`);
}

function propertyDecorator(target: any, key: string) {
    console.log(`属性装饰器 for ${key} executed`);
}

function parameterDecorator(target: any, key: string, index: number) {
    console.log(`参数装饰器 for ${key}, parameter index: ${index} executed`);
}

@classDecorator1
@classDecorator2
class ExampleClass {
    @propertyDecorator
    property: string;
    @propertyDecorator
    property1: string;

    constructor() {
        this.property = '示例属性';
        this.property1 = '示例属性1';
    }

    @methodDecorator
    @methodDecorator1
    exampleMethod(@parameterDecorator parameter: string, @parameterDecorator parameter1: string) {
        console.log('exampleMethod方法执行');
    }
}

const exampleInstance = new ExampleClass();
exampleInstance.exampleMethod('参数1', '参数2');
