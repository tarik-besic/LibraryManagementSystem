import axios from "axios";
class Request {
    static DefaultSettings = {
        Protocol: "http",
        BaseUrl: process.env.REACT_APP_BACKEND_URL,
        Headers: {
            "Content-Type": "application/json",
        },
        queryParams: []
    }

    static basic(
        method,
        url,
        headers = {},
        queryParams = {},
        data = null,
    ) {
        return axios({
            method: method,
            url: `${this.DefaultSettings.Protocol}://${this.DefaultSettings.BaseUrl}${url}`,
            headers: {
                ...this.DefaultSettings.Headers
            },
            data: data
        });
    }

    static get(url, queryParams = {}, headers = {}) {
        return this.basic("GET", url, headers, queryParams);
    }

    static post(url,data, queryParams = {}, headers = {}) {
        return this.basic("POST", url, headers, queryParams,data);
    }
    static delete(url,data, queryParams = {}, headers = {}) {
        return this.basic("DELETE", url, headers, queryParams,data);
    }
    static patch(url,data, queryParams = {}, headers = {}) {
        return this.basic("PATCH", url, headers, queryParams,data);
    }
}
export default Request;