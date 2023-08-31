/*
 * @Description: 
 * @Author: xiuji
 * @Date: 2023-08-11 10:34:39
 * @LastEditTime: 2023-08-24 09:55:49
 * @LastEditors: Do not edit
 */
import express from 'express'
import './controller/LoginController';
import './controller/CrawlerController';
import router from './router';
import bodyParser from 'body-parser';
// cookie-session
import cookieSession from 'cookie-session';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    cookieSession({
        name: 'session',
        keys: ['system key'],
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })
)
app.use(router);

app.listen(7001, () => {
    console.log('server is running');
})