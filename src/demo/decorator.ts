/*
 * @Description: 装饰器
 * @Author: xiuji
 * @Date: 2023-08-15 14:34:59
 * @LastEditTime: 2023-08-16 10:17:09
 * @LastEditors: Do not edit
 */

function test1() {
    // <T extends new (...args: any[]) => any>(target: T)定义一个泛型函数，入参是原有类construcor构造函数中的所有属性，返回值是一个类
    return function <T extends new (...args: any[]) => any>(target: T) {
        return class extends target {
            name = 'xiuji'
            getName() {
                return this.name
            }
        }
    }
}


const Test = test1()(
    class UseDecorator {
        name: string;
        constructor(name: string) {
            this.name = name;
            console.log(this.name);
        }
    }
)

console.log(new Test('test').getName());
