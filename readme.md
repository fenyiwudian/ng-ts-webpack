# ng-ts-webpack

这里尝试了使用angularjs+typescript+webpack搭建起一个项目,样式使用less,模板引擎使用jade,为os-editor升级为typescript编程做准备.


变化:
+ 使用webpack作为编译工具,与原有的gulp理念完全不同,一切资源都已依赖的方式处理.
    - 业务样式不会再单独处理,而是靠webpack依赖方式处理,参照[src/person-detail/component.ts](./src/person-detail/component.ts)中的样式导入方式
    - 组件模板不再使用templateUrl + templateCache的方式,而是改为webpack依赖方式处理参照[src/person-detail/component.ts](./src/person-detail/component.ts)中template的配置
    - 业务脚本文件不再以一股脑打包成一本,而是从入口[src/index.ts](./src/index.ts)为入口靠webpack按模块依赖树收集代码并打包.
    - 各种压缩,文件hash处理都有各种插件和loader来准备处理,相比gulp自己使用某些插件来编程处理更为省心.
    - 有了dev-server,比起gulp中serve-watch任务,也更省心.
+ 全面使用typescript/es6的语言级模块,除了某些特殊场合,不再使用依赖注入,不再使用anglaur的service和factory,参照[src/app.ts](./src/app.ts)中注释

+ 更方便的config文件组织方式

+ 
