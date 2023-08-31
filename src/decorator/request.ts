/*
 * @Description: 
 * @Author: xiuji
 * @Date: 2023-08-24 10:44:43
 * @LastEditTime: 2023-08-24 11:01:05
 * @LastEditors: Do not edit
 */
enum Methods {
    get = 'get',
    post = 'post'
}

function requestDecorator(type: Methods) {
    return function (path: string) {
        return function (target: any, key: string): void {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        }
    }
}

export const get = requestDecorator(Methods.get);
export const post = requestDecorator(Methods.post);