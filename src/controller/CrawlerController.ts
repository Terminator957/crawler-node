/*
 * @Description: 
 * @Author: xiuji
 * @Date: 2023-08-23 16:01:57
 * @LastEditTime: 2023-08-31 10:54:25
 * @LastEditors: Do not edit
 */
import path from "path";
import fs from 'fs'; // nodejs自带的文件模块
import { Request, Response, NextFunction } from "express";
import 'reflect-metadata';
import { controller, get, use } from "../decorator/index";
import { responseData } from "../utils/responseData";
import NowPlaying from "../utils/nowPlaying";
import Crawler from "../utils/crawler";

interface RequestWithBody extends Request {
    body: {
        [propName: string]: string | undefined
    }
}

const checkLogin = (req: RequestWithBody, res: Response, next: NextFunction): void => {
    console.log('checkLogin');
    const isLogin = !!(req.session ? req.session.login : false);
    if (isLogin) {
        next();
    } else {
        res.json(responseData(null, '请先登录'));
    }
}

const checkLogin1 = (req: RequestWithBody, res: Response, next: NextFunction): void => {
    console.log('checkLogin1');
    const isLogin = !!(req.session ? req.session.login : false);
    if (isLogin) {
        next();
    } else {
        res.json(responseData(null, '请先登录'));
    }
}

@controller('/')
class CrawlerController {
    @get('/getData')
    @use(checkLogin)
    @use(checkLogin1)
    getData(req: RequestWithBody, res: Response): void {
        const url = 'https://movie.douban.com/cinema/nowplaying/nanjing/';
        const nowPlaying = NowPlaying.getInstance();
        new Crawler(url, nowPlaying);
        res.json(responseData(null, '爬取数据成功'));
    }

    @get('/showData')
    @use(checkLogin)
    showData(req: RequestWithBody, res: Response): void {
        try {
            const filePath = path.resolve(__dirname, '../../data/movie.json');
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            res.json(responseData(JSON.parse(fileContent)));
        } catch (e) {
            res.json(responseData(null, '读取文件失败'));
        }
    }
}