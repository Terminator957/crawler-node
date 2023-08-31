/*
 * @Description: 
 * @Author: xiuji
 * @Date: 2023-08-24 10:38:55
 * @LastEditTime: 2023-08-24 14:38:02
 * @LastEditors: Do not edit
 */
import { RequestHandler } from 'express';

export function use(middleware: RequestHandler) {
    return function (target: any, key: string): void {
        const originalMiddlewares: RequestHandler[] = Reflect.getMetadata('middlewares', target, key) || [];
        originalMiddlewares.push(middleware);
        Reflect.defineMetadata('middlewares', originalMiddlewares, target, key);
    }
}