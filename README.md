猎上网前端代码风格指南
===
HunterDrive FE Code Style Guideline

原则
===
我们的原则是编写可维护的代码：

* 可读性强
  * 二元操作符号都应以空格和前后相隔，不需要空格的是括号、标识符和一元操作符
  * 表达式（statement）格式化要点：控制流关键字（if,while）等,和后面判断表达式单元以空格隔开
  * 命名规范要点：自己不要发明命名规范了——C程序员就去参考Linux内核代码的命名规范，或者GNU的规范，java的遵循java规范；
  * 注释，可以参考Doxygen的要求，注释内容尽量详细，若是方法，尽可能给出示例
  * 代码的对齐
* 可理解的，简单就是美！ 不要复化你的代码
  * 表达式、函数、方法不能过大：易读的代码函数一般都在10-20行左右
  * 关于控制语句的书写：控制语句中的状态判断（if XX,while XX），和相应的处理语句都应该力图简单明了
  * 函数需要写的易于识别，莫要特立独行，让人误解
  * 降低程序之间的耦合性
* 是一致的，看起来好像出自同一个人
* 是可预测的
* 有一定的文档规范

参考：
* <a href="http://blog.csdn.net/kanghua/article/details/3649209" target="_blank">谈谈软件的可维护性问题 </a>


细则
===
* <a href="https://github.com/amily4555/fe/blob/master/css/reset.css" target="_blank">reset.css</a>
* <a href="https://github.com/amily4555/fe/blob/master/css/reset.css" target="_blank">util.css</a>


