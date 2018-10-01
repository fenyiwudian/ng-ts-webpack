import { $service } from '../app';
import config  from 'config';
const langSrc: any = {
    'en-US': require('../../lang/en-US'),
    'zh-CN': require('../../lang/zh-CN'),
}
class I18N {
    private code = '';
    put() {

    }
    get() {
        return this.code || 'zh-CN';
    }

    setLangCode(code: string) {
        this.code = code;
    }

    translate(key: string, replacement?: any): string {
        return ($service.$filter('translate') as any)(key, replacement);
    }

    load() {
        const code = this.get();
        return $service.$http.get(config.host + '/' + langSrc[code].default)
            .then(res => {
                return {
                    data: res.data,
                    code,
                }
            });
    }
}

export default new I18N();