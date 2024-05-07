<script setup>
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

const markedFunc = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      console.log('code: ', code);
      console.log('lang: ', lang);
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);
console.log('markedFunc: ', markedFunc);

const mdStr1 =
  '本报文以下特征与路径遍历的常见攻击载荷格式相同，所以报文可识别为恶意，攻击载荷是：\n```\n../../../../../../../../ usr / local / lib / php / pearcmd & +config - create + /&/ <? echo(md5("hi"));?>\n```\n报文详细过程是：\n- `../../../../../../../../usr/local/lib/php/pearcmd&+config-create+/&/`：攻击者尝试利用路径遍历漏洞访问服务器的深层目录结构，以达到读取或执行非预期文件的目的。其中的特殊字符`+`和`/`可能被用于绕过某些安全过滤机制，而`pearcmd`可能是攻击者尝试调用的恶意PHP命令或脚本。\n\n- `<?echo(md5("hi"));?>`：这部分payload在成功执行路径遍历后，会尝试执行PHP代码。这里的`echo(md5("hi"))`会计算字符串"hi"的MD5哈希值并输出，实际攻击中可能会替换为更复杂的恶意代码，例如系统命令执行、文件写入等操作。\n经过大模型深入分析报文作用，确认该报文意图为扫描探测。\n结合响应内容可判断，该报文攻击失败。';

const mdStr2 =
  "\`\`\`javascript const highlight = 'code';\`\`\` 本报文以下特征与SQL注入的常见攻击载荷格式相同，所以报文可识别为恶意，攻击载荷是：\n```\nsql=select substring(sys.fn_sqlvarbasetostr(hashbytes('MD5','40025')),3,32)\n```\n报文详细过程是：\n- `sql=select substring(sys.fn_sqlvarbasetostr(hashbytes('MD5','40025')),3,32)`：该payload利用了SQL注入技术，尝试执行一个动态SQL查询。具体来说：\n  - `sys.fn_sqlvarbasetostr(hashbytes('MD5','40025'))`：使用SQL函数`sys.fn_sqlvarbasetostr()`将十六进制的MD5哈希值转换为可执行的字符串形式。\n  - `substring(sys.fn_sqlvarbasetostr(hashbytes('MD5','40025')),3,32)`：从上述哈希值的中间部分（长度为32）提取出一部分作为查询字符串的一部分，这里的数字40025可能是用于混淆或者编码目的的特定ID值，实际攻击中可能会是任意计算得出的哈希值。\n  - 这段payload意图通过注入到数据库查询语句中，利用服务器端解析时存在的漏洞，执行恶意SQL命令，从而获取或修改数据库中的数据。\n经过大模型深入分析报文作用，确认该报文意图为真实攻击。";

const mdStr3 = `
\`\`\`javascript
const highlight = "code";
function test() {
  console.log("test")
}
// test();
\`\`\`
`;
const res = markedFunc.parse(mdStr2);
</script>

<template>
  <div v-html="res"></div>
</template>

<style src="highlight.js/styles/github.css"></style>
