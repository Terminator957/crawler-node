/*
 * @Description: 
 * @Author: xiuji
 * @Date: 2023-08-16 10:29:58
 * @LastEditTime: 2023-08-18 10:59:52
 * @LastEditors: Do not edit
 */
const useInfo: any = undefined;

function catchError(msg: string) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const fn = descriptor.value;
        descriptor.value = function () {
            try {
                fn();
            } catch (error) {
                console.log(msg);
            }
        }
    }
}

class UseDecorator {
    @catchError('useInfo.name 不存在')
    getName() {
        return useInfo.name;
    }
    @catchError('useInfo.age 不存在')
    getAge() {
        return useInfo.age;
    }
}

const useDecorator = new UseDecorator();
useDecorator.getName(); // useInfo.name 不存在
useDecorator.getAge();  // useInfo.age 不存在
