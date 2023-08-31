/*
 * @Description: 
 * @Author: xiuji
 * @Date: 2023-08-18 14:32:50
 * @LastEditTime: 2023-08-31 10:52:27
 * @LastEditors: Do not edit
 */
import { Request, Response } from "express";
import 'reflect-metadata';
import { controller, get, post } from "../decorator/index";
import { responseData } from "../utils/responseData";

interface RequestWithBody extends Request {
    body: {
        [propName: string]: string | undefined
    }
}

@controller('/')
class LoginController {
    static isLogin(req: RequestWithBody): Boolean {
        return !!(req.session ? req.session.login : false);
    }
    @get('/isLogin')
    isLogin(req: RequestWithBody, res: Response): void {
        res.json(responseData(LoginController.isLogin(req)));
    }

    @post('/login')
    login(req: RequestWithBody, res: Response): void {
        const isLogin = LoginController.isLogin(req);
        const { username, password } = req.body;
        if (isLogin) {
            res.json(responseData(isLogin,));
            return;
        } else {
            if (password === undefined || password === '') {
                res.json(responseData(false, '密码不能为空'));
                return;
            }
            if (username === 'admin' && password === '123' && req.session) {
                req.session = { login: true };
                res.json(responseData(true, '登录成功'));
                return;
            } else {
                res.json(responseData(false, '用户名或密码错误'));
                return;
            }
        }
    }

    @get('/logout')
    logout(req: Request, res: Response): void {
        req.session = undefined;
        res.json(responseData(LoginController.isLogin(req), '退出成功'));
    }
}