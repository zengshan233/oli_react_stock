import axios, { AxiosResponse } from 'axios';
import AppConfig from '../config/AppConfig';

enum RequestType {
    get,
    post,
    put,
    delete
}


export class Ajax<T>{
    private url: string;
    private data: object;
    constructor(_url: string, _data?: object) {
        this.url = _url;
        this.data = _data || {};
    }

    public async get(): Promise<T> {
        let response: T;
        response = await this.request(RequestType.get);
        return response;
    }

    public async post(): Promise<T> {
        let response: T;
        response = await this.request(RequestType.post)
        return response;
    }

    public async put(): Promise<T> {
        let response: T;
        response = await this.request(RequestType.put)
        return response;
    }

    public async delete(): Promise<T> {
        let response: T;
        response = await this.request(RequestType.delete)
        return response;
    }

    private async request(type: RequestType): Promise<T> {
        let response: AxiosResponse<T>;
        let requestConfig = {
            headers: {
                'content-type': "application/x-www-form-urlencoded; charset=UTF-8",
            }
        };
        let url = AppConfig.host+this.url;
        try {
            switch (type) {
                case RequestType.get:
                    response = await axios.get(`${url}${this.paramsPostBody(this.data,true)}`, requestConfig);
                    break;
                case RequestType.post:
                    response = await axios.post(url, this.paramsPostBody(this.data,false), requestConfig);
                    break;
                case RequestType.put:
                    response = await axios.put(url, this.paramsPostBody(this.data,false), requestConfig);
                    break;
                case RequestType.delete:
                    response = await axios.delete(`${url}${this.paramsPostBody(this.data,true)}`, requestConfig);
                    break;
            }
        } catch (e) {
            console.log("e", e);
            throw e;
        }
        let result = response.data;
        return result;
    }

    private paramsPostBody(obj: any,get:boolean) {
        var result = '';//接受最后结果
        var item;
        for (item in obj) {
            result += '&' + item + '=' + encodeURIComponent(obj[item])
        }
        if (result) {
            result = result.slice(1)//去掉第一个&
        }
        return  (get && result ? '?':'') + result
    }
}