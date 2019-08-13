/**
 * command line tool
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var xss = require("./");//현재 디렉토리 index.js를 불러옴
var readline = require("readline");//한 줄씩 읽어오는 모듈
var rl = readline.createInterface({
  input: process.stdin,//입력을 받을 수 있음
  output: process.stdout// 출력
});

console.log('Enter a blank line to do xss(), enter "@quit" to exit.\n');

function take(c, n) {
  var ret = "";
  for (var i = 0; i < n; i++) {
    ret += c;
  }
  return ret;
}

function setPrompt(line) {
  line = line.toString();
  rl.setPrompt("[" + line + "]" + take(" ", 5 - line.length));
  rl.prompt();
}

setPrompt(1);

var html = [];
rl.on("line", function(line) {
  if (line === "@quit") return process.exit();
  if (line === "") {
    console.log("");
    console.log(xss(html.join("\r\n")));
    console.log("");
    html = [];
  } else {
    html.push(line);
  }
  setPrompt(html.length + 1);
});
