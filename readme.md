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

+ typescript模块循环引用调查
  - `invalid`A,B双方都有对对方立即执行的代码  
    * 级别:模块解析角度发生了循环依赖,代码执行角度也发生了循环依赖
    * 执行情况 => 死翘翘,这种代码是无法执行的.
    * 不要做这样的傻事
  - `dangerous`A对B立即执行,B对A不立即执行,只在某些中非立即执行的方法中才对A进行执行
    * 级别:模块解析角度发生了循环依赖,代码执行角度也发生了循环依赖
    * 执行情况1:A先被加载 => 可以成功
      1. A加载B
      2. B加载A得到一个A的未完全填充的模块引用对象,B继续运行完自己.
      3. A加载B成功,得到一个完整的B模块的引用,立即执行B,成功,A继续运行完自己.
      4. A运行完以后,第2布中B得到的A的半成品被填充为了完整品.
      5. 后续B中方法调用了A也能正确执行,成功.
    * 执行情况2:B先被加载 => 死翘翘
      1. B加载A
      2. A加载B得到一个B的未完全填充的模块引用对象,,B继续运行自己的时候要执行A,A没有 => 死翘翘
    * 由于大项目中模块的加载顺序很微妙,很难保证,所以也不要这样做  
  - `ok`A,B都不对对方立即执行,只在非立即执行的方法中对对方进行执行
    * 级别:模块解析角度发生了循环依赖,代码执行角度也发生了循环依赖
    * 执行情况: => 可以成功
    * 合法的循环引用
  - `ok`A,B只引用了对方的类型信息,没有具体的执行操作.
    * 级别:模块解析角度发生了循环依赖,代码执行角度没有发生了循环依赖
    * 执行情况: => 可以成功
    * 合法的循环引用,其实只在typescript辨型的时候发生了引用,编译后是不会有循环引用的.
