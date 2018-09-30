import {$service} from '../app';
import config  from 'config';
const langSrc: any = {
    'en-US': 'lang-en-US.json',
    'zh-CN': 'lang-zh-CN.json',
}

export default (code?: string) => {
    code = 'zh-CN';
    return $service.$http.get(config.host + '/' + langSrc[code])
    .then(res => {
        return {
            data: res.data,
            code,
        }
    });
}