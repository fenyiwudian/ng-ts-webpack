// 其他模块不要依赖该模块,该模块也不依赖其他模块
// 这是一个单独的多语言预加载模块

const langSrc: any = {
  'en-US': require('../lang/en-US'),
  'zh-CN': require('../lang/zh-CN'),
};

const getCookieItem = function (sKey: string) {
  if (!sKey) { return null; }
  return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
};

const getLangCode = function () {
  let rs = '';
  try {
    const session: any = JSON.parse(getCookieItem('session'));
    rs = session.user.locale;
  } catch (e) {

  }
  return rs || 'zh-CN';
};

const req = new XMLHttpRequest();
const code = getLangCode();
req.open('GET', 'lang-assets-host-placeholder' + langSrc[code].default);
req.onload = () => {
  window.LANG = {
    code,
    data: JSON.parse(req.responseText),
    ngReady: false,
  };

  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', 'bundle.js');
  document.body.appendChild(script);
};
req.send();


