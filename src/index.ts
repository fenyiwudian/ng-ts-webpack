
import './style.less';
import './person-detail/component';
import config from 'config';
// 配置文件加载与使用
document.writeln(config.env);
// 这个是整个项目的入口,需要从此处一层层引用其他模块,
// webpack才能正确生成一颗模块树,正确的包含需要用到的代码;

import './class/musician';
