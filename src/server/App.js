'Access-Control-Allow-Origin';
var express = require("express"); //引用express模块
var app = express();
var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: './public/images' });
var msg = [
    {
      id: 1,
      cont: "人类的悲欢从不相通",
      author: "扶桑"
    },
    {
      id: 2,
      cont: "幸福的人是相似的，不幸的人各有各的不幸",
      author: "扶桑"
    },
    {
      id: 3,
      cont:
        "我本可以忍受黑暗，如果我不曾见过太阳，然而阳光已使我的荒凉成为更新的荒凉",
      author: "扶桑"
    },
    {
      id: 4,
      cont: "青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪",
      author: "扶桑"
    },
    {
      id: 5,
      cont: "少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉",
      author: "扶桑"
    },
    {
      id: 6,
      cont: "迟到的正义已非正义",
      author: "扶桑"
    },
    {
      id: 7,
      cont: "若能避开猛烈的欢喜，自然不会有悲痛来袭",
      author: "扶桑"
    },
    {
      id: 8,
      cont: "愿你岁岁安好，哪怕生生不见",
      author: "扶桑"
    },
    {
      id: 9,
      cont: "如果说思想会腐蚀语言的话，那么语言也会腐蚀思想",
      author: "扶桑"
    },
    {
      id: 10,
      cont: "幸福的人是相似的，不幸的人各有各的不幸",
      author: "扶桑"
    },
    {
      id: 11,
      cont: "伟大的背后都是苦难",
      author: "扶桑"
    }
  ];
//   var readDir = fs.readdirSync("./public/images");
// console.log(readDir);

  var flag = 11;
app.all('*', function(req, res,next ) {
    // console.log(req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header('Access-Control-Max-Age',1728000);//预请求缓存20天
   next();
});
app.post('/upload', upload.single('logo'), function(req, res, next){
  
  res.send({ret_code: '0'});
});

app.get("/user",function(req,res){

    res.json(msg);
});
app.use(express.static('./public/images'));
app.get("/image",function(req,res){
  var readDir = fs.readdirSync("./public/images");
  var image = [];
  
  for(var i =0; i<readDir.length;i++){
    image.push({
      id:i,
      url:'http://127.0.0.1:3000/' + readDir[i]
    });
  }
  res.json(image);
 
});
app.get("/add",function(req,res){
  
var cont = req.query.cont;
var author = req.query.author;
console.log(cont);
var mess = {
  id:++flag,
  cont:cont,
  author:author
};
msg.push(mess);
res.send("成功");
});
app.listen(3000);