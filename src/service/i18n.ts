import {$filter} from '../app'; 

class I18N{
    private code = '';
    put(){

    }
    get(){
        return this.code || 'zh-CN';
    }

    setLangCode(code: string){
        this.code = code;
    }

    translate(key: string, replacement?: any): string{
        return ($filter('translate') as any)(key, replacement);
    }
}

export default new I18N();