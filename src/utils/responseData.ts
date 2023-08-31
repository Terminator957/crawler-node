/*
 * @Description: 
 * @Author: xiuji
 * @Date: 2023-08-14 16:22:35
 * @LastEditTime: 2023-08-31 10:14:35
 * @LastEditors: Do not edit
 */
interface ResponseData<T> {
    success: boolean;
    data: T;
    msg?: string;
}

export const responseData = <T>(data: T, msg?: string): ResponseData<T> => {
    return {
        success: true,
        data,
        msg
    }
}