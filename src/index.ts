
import './style.less';
import './person-detail/component';
// 配置文件加载与使用
// 这个是整个项目的入口,需要从此处一层层引用其他模块,
// webpack才能正确生成一颗模块树,正确的包含需要用到的代码;
import './class/mixin-core';
import './class/musician';
import Team from './circular-depend/Team';
import { FirstClass } from './circular-depend/FirstClass';
import MyWorker from './circular-depend/Worker';
// import {SecondClass} from './circular-depend/SecondClass';
// import {ThirdClass} from './circular-depend/ThirdClass';

const first = new FirstClass();
first.say();
// const second = new SecondClass();
// second.say();
// const third = new ThirdClass();
// third.say();
const worker = new MyWorker(1 as any);
console.log(worker, worker.team);

const team = new Team();

team.show();



