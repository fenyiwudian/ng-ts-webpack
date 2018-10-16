
import { $service } from '../app';
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
    const LANG = window.LANG;
    if (LANG.ngReady) {
      return "ng: " + ($service.$filter('translate') as any)(key, replacement);
    } else {
      return "custom: " + this.customTranslate(key, replacement);
    }
  }

  customTranslate(key: string, replacement?: any): string {
    const keys = key.split('.');
    let data = window.LANG.data;
    key = keys.shift();
    while (key) {
      data = data[key];
      key = keys.shift();
    }
    if (replacement) {
      Object.keys(replacement).forEach(name => {
        data = data.replace(new RegExp(`{{${name}}}`, 'g'), replacement[name]);
      });
    }
    return data;
  }
}
export default new I18N();
