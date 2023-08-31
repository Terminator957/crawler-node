/*
 * @Description:
 * @Author: xiuji
 * @Date: 2023-07-05 16:54:21
 * @LastEditTime: 2023-08-14 16:28:23
 * @LastEditors: Do not edit
 */
import fs from 'fs'; // nodejs自带的文件模块
import path from 'path'; // nodejs自带的路径模块
import superangent from 'superagent'; // 爬虫

export interface NowPlay {
    analyse: (html: string, time: string, filePath: string) => Promise<string | undefined>;
}

export default class Crawler {
    // 查询时间
    private time: string = '';
    // 文件路径
    private filePath: string = path.resolve(__dirname, '../../data/movie.json');
    constructor(private targetUrl: string, private nowplaying: NowPlay) {
        this.time = this.formatTimestampToDateString(new Date().getTime());
        this.init();
    }
    /**
     * @Description: 获取网页html
     * @Date: 2023-07-24 10:56:50
     */
    async getHtml() {
        const result = await superangent.get(this.targetUrl);
        return result.text;
    };

    /**
     * @Description: 格式化时间戳为日期字符串
     * @Date: 2023-07-31 15:20:33
     * @param {number} timestamp
     */
    formatTimestampToDateString(timestamp: number): string {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDateString = `${year}-${month}-${day}`;
        return formattedDateString;
    };

    /**
     * @Description: 创建json文件
     * @Date: 2023-08-01 13:54:33
     * @param {Content} fileContent
     */
    createJsonFile(fileContent: string) {
        fs.writeFileSync(this.filePath, fileContent);
    }

    async init() {
        const html = await this.getHtml();
        const resultData: string | undefined = await this.nowplaying.analyse(html, this.time, this.filePath);
        if (!resultData) return;
        this.createJsonFile(resultData);
    };
}

