/*
 * @Description: 
 * @Author: xiuji
 * @Date: 2023-08-07 09:32:16
 * @LastEditTime: 2023-08-31 11:04:57
 * @LastEditors: Do not edit
 */
import fs from 'fs'; // nodejs自带的文件模块
import cheerio from 'cheerio'; // 服务端的jquery
import { NowPlay } from './crawler';
interface Movie {
    post?: string;
    name?: string;
    img?: string;
}

interface MovieJson {
    time: string;
    data: Movie[];
}

interface Content {
    [propName: string]: Movie[];
}

export default class NowPlaying implements NowPlay {
    private static instance: NowPlaying;
    /**
     * @Description: 类的静态方法，外部可不实例化直接调用
     * @Author: 
     * @return {class} 当前类只能创建一个实例
     * @Date: 2023-08-07 15:25:04
     */
    static getInstance() {
        if (!NowPlaying.instance) {
            NowPlaying.instance = new NowPlaying();
        }
        return NowPlaying.instance;
    }
    /**
     * @Description: 处理数据
     * @Date: 2023-07-24 10:03:37
     * @param {string} html
     */
    private async processingData(html: string): Promise<Movie[]> {
        let movieList: Movie[] = [];
        const $ = cheerio.load(html);
        // 获取正在上映的电影列表
        const playingLists = $('#nowplaying .list-item');
        playingLists.each((i, ele) => {
            const moviePoster = $(ele).find('.poster a').attr('href');
            const movieName = $(ele).find('.stitle a').attr('title');
            const movieImg = $(ele).find('.poster img').attr('src');
            movieList.push(
                {
                    post: moviePoster,
                    name: movieName,
                    img: movieImg
                }
            )
        });
        return Promise.resolve(movieList);
    };

    /**
     * @Description: 调整数据格式
     * @Author: 
     * @param {MovieJson} listData
     * @param {string} filePath
     * @return {string | undefined } 
     * @Date: 2023-08-07 10:23:53
     */
    private storageData(listData: MovieJson, filePath: string): Content | undefined {
        try {
            let fileContent: Content = {};
            // fs.existsSync() 判断文件是否存在
            if (fs.existsSync(filePath)) {
                fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            }
            // 创建一个新的对象 newFileContent
            const newFileContent: Content = {
                [listData.time]: listData.data, // 将最新时间的数据放在最前方
            };

            // 将原有的键值对添加到 newFileContent 中
            for (const key in fileContent) {
                if (fileContent.hasOwnProperty(key)) {
                    newFileContent[key] = fileContent[key];
                }
            }

            return newFileContent;
        } catch (error) {
            console.log(error, 'storageData');
            return undefined;
        }
    };
    /**
     * @Description: 分析数据
     * @Author: 
     * @param {string} html
     * @param {string} time
     * @param {string} filePath
     * @return {*}
     * @Date: 2023-08-07 10:24:06
     */
    public async analyse(html: string, time: string, filePath: string): Promise<string | undefined> {
        const listData: Movie[] = await this.processingData(html);
        const resultData = this.storageData({ time, data: listData }, filePath);
        return Promise.resolve(JSON.stringify(resultData));
    }

    private constructor() { }
}