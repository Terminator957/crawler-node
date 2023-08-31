/*
 * @Description: 
 * @Author: xiuji
 * @Date: 2023-08-24 10:38:48
 * @LastEditTime: 2023-08-24 15:10:39
 * @LastEditors: Do not edit
 */
import router from '../router';
import { RequestHandler } from 'express';

// 枚举
enum Methods {
    get = 'get',
    post = 'post'
}
export function controller(rootPath: string) {
    return function (target: any): void {
        for (let key in target.prototype) {
            const path: string = Reflect.getMetadata('path', target.prototype, key);
            const method: Methods = Reflect.getMetadata('method', target.prototype, key);
            const handler = target.prototype[key];
            const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', target.prototype, key);
            if (path && method && handler) {
                const wholePath = rootPath === '/' ? path : `${rootPath}/${path}`;
                // 通过原型链拿到target.prototype[key]对应的方法并执行
                // router.get(path, target.prototype[key]);
                if (middlewares && middlewares.length) {
                    router[method](wholePath, ...middlewares, handler);
                } else {
                    router[method](wholePath, handler);
                }
            }
        }
    }
}


