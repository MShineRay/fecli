# fecli 
Front-End Command Line Interface
  
### run && debug cli
~~~
    1、npm发布后全局执行
      * npm adduser a0znpm
      * npm publish --access public
    2、在cli内部调试vue
      * cd fecli
      * npm run fe 
~~~


### ref
<p d="1618">几个开发命令行工具的关键依赖。</p>
<ul d="1619">
<li d="1620">
<p d="1621"><a href="http://npm.im/inquirer" d="1747"><code d="1746">inquirer</code></a>、<a href="http://npm.im/enquirer" d="1751"><code d="1750">enquirer</code></a>、<a href="https://npm.im/prompts" d="1755"><code d="1754">prompts</code></a>：可以处理复杂的用户输入，完成命令行输入交互。</p>
</li>
<li d="1622">
<p d="1623"><a href="http://npm.im/chalk" d="1759"><code d="1758">chalk</code></a>、<a href="https://npm.im/kleur" d="1763"><code d="1762">kleur</code></a>：使终端可以输出彩色信息文案。</p>
</li>
<li d="1624">
<p d="1625"><a href="http://npm.im/ora" d="1767"><code d="1766">ora</code></a>：可以让命令行出现好看的 Spinners。</p>
</li>
<li d="1626">
<p d="1627"><a href="http://npm.im/boxen" d="1771"><code d="1770">boxen</code></a>：可以在命令行中画出 Boxes 区块。</p>
</li>
<li d="1628">
<p d="1629"><a href="http://npm.im/listr" d="1775"><code d="1774">listr</code></a>：可以在命令行中画出进度列表。</p>
</li>
<li d="1630">
<p d="1631"><a href="http://npm.im/meow" d="1779"><code d="1778">meow</code></a>、<a href="http://npm.im/arg" d="1783"><code d="1782">arg</code></a>：可以进行基础的命令行参数解析。</p>
</li>
<li d="1632">
<p d="1633"><a href="http://npm.im/commander" d="1787"><code d="1786">commander</code></a>、<a href="https://www.npmjs.com/package/yargs" d="1791"><code d="1790">yargs</code></a>：可以进行更加复杂的命令行参数解析。</p>
</li>
</ul>
