console.log('init lang module start');

const langSrc: any = {
  'en-US': require('../lang/en-US'),
  'zh-CN': require('../lang/zh-CN'),
};

const req = new XMLHttpRequest();
const code = localStorage.getItem('lang-code') || 'zh-CN';
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
  script.onload = () => {
    console.log('bundle loaded');
  };
  document.body.appendChild(script);
  console.log('loading bundle');
};
req.send();

console.log('init lang module end');

