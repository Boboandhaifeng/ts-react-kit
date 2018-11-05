import axios from 'axios';
import {Modal} from 'antd';

const instance = axios.create();

instance.interceptors.request.use(config => {
    config.url = `/api${config.url}`
    console.log('config=====', config)
    return config;
});

instance.interceptors.response.use(response => {
    if (response.status === 200 && response.data.code === 0) {
        return response.data || {};
    } else {
        // 返回错误处理
        Modal.warning({
            title: '服务错误',
            content: response.data.message,
        });
        throw new Error(response.data.message);
    }
}, function(error) {
    // 请求错误处理
});

export default instance;