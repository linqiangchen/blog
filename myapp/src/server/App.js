'Access-Control-Allow-Origin';
const newLocal = require('../modules/db');
var db = newLocal;
var User = require('../modules/User');
var express = require("express"); //引用express模块
var app = express();
var Post = require('../modules/post');
var Reply = require('../modules/Reply');
var Comment = require('../modules/Comment');
var Account = require('../modules/Account');
var Image = require('../modules/Image')
var fs = require('fs');
var multer = require('multer');

function getTime() {
  var date = new Date();
  var YY = date.getFullYear() + '-';
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return MM + DD + " " + hh + mm;
}
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
})
var upload = multer({
  storage: storage
})
var express = require('express');
var session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static('./public/images'));
const formidable = require('formidable');
var Artic = require("../modules/Contont");
app.all('*', function (req, res, next) {
  // 解决跨域
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-type');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  res.header('Access-Control-Max-Age', 1728000); //预请求缓存20天
  next();
});
//上传图片
app.post('/upload', upload.single('logo'), function (req, res, next) {
  var user = req.body.user;
  var name = req.file.filename;

  User.upImage(user, name, function (err) {})
  Image.create({
    name: name,
    user: user,
    time: getTime()
  }, function () {})
  res.send({
    ret_code: '0'
  });
});
//上传头像
app.post('/upAvatr', upload.single('logo'), function (req, res, next) {
  var user = req.body.user;
  var name = req.file.filename;
  User.upAvatr(user, name, function (err) {})
  res.send({
    ret_code: '0'
  });
});
//获取头像
app.get('/avatr', function (req, res, next) {
  var user = req.query.user;
  User.check(user, function (err, rlt) {
    if (!rlt) {
      res.json({
        err: 1,
        msg: "用户账号有误"
      })
      return false
    } else {
      var result = "http://10.20.158.17:3000/" + rlt[0].avatr;
      res.json({
        result: result
      });
    }
  })
});
//登录
app.post('/dologin', function (req, res) {
  const form = new formidable.IncomingForm();
  //使用form.parse进行接收
  form.parse(req, function (err, fields, files) {
    var user = fields.user;
    var pass = fields.pass;
    Account.check(user, function (err, result) {

      if (!result) { //判断用户名是否存在
        res.json({
          res: "用户账号不存在"
        })
      } else {
        if (pass == result[0].pass) {
          res.json({
            res: "ok"
          })
        } else {
          res.json({
            res: "用户账号或密码错误"
          })
        }
      }
    })
  });
});
app.get('/addAcount', function (req, res) {
  //使用form.parse进行接收
  var user = req.query.user;
  var pass = req.query.pass;
  Account.check(user, function (err, rlt) {
    if (rlt.length > 0) {
      res.end("用户名重复")
    } else {
      Account.create({
        user: user,
        pass: pass
      }, function (err) {});
      res.end("ok")
    }
  })

});
//注册
app.post('/dores', function (req, res) {
  const form = new formidable.IncomingForm();
  //使用form.parse进行接收
  form.parse(req, function (err, fields, files) {
    var user = fields.user;
    var pass = fields.pass;
    User.check(user, function (err, rlt) {
      if (rlt.length > 0) {
        res.end("用户名重复")
      } else {
        User.create({
          user: user
        }, function (err) {});
        Account.create(fields, function (err) {});
        res.end("ok")
      }
    })
  });
});
//填写信息
app.get('/doUserName', function (req, res) {
  var form = JSON.parse(req.query.form);
  User.upUserName(form.user, form, function (err) {})
  res.end("ok")
});
//查询文章表
app.get("/post", function (req, res) {
  Post.check(function (err, result) {
    result = result.reverse()
    for (var i = 0, n = result.length; i < n; i++) {
      if (result[i].user.avatr.indexOf("http://10.20.158.17:3000/") === -1)
        result[i].user.avatr = `http://10.20.158.17:3000/${result[i].user.avatr}`
    };

    res.json(result)
  })
});
app.get("/artic", function (req, res) {
  Artic.check(function (err, result) {
    res.json(result)
  })
});
app.get("/image", function (req, res) {
  var image;
  var user = req.query.user
  User.check(user, function (err, result) {
    if (result.length === 0) {
      res.json({
        err: 1,
        msg: "用户账号有误"
      })
    } else {
      image = result[0].image;
      res.json(image);
    }

  })
});
app.get("/userImage", function (req, res) {
  var image;
  var user = req.query.user
  Image.find({
    user: user
  }, function (err, result) {
    // 
    // image = result[0].image;
    res.json(result);
  })
});
app.get("/allImage", function (req, res) {
  var image;
  Image.check(function (err, result) {
    image = result;
    res.json(image);
  })
});
//发表文章
app.get("/add", async function (req, res) {
  var cont = req.query.cont;
  var user = req.query.user;
  var time = req.query.time
  var user1 = await User.findOne({
    user: user
  })
  var mess = {
    con: cont,
    user: user1._id,
    createTime: time
  };
  Post.create(mess, function (err) {})
  res.send("成功");
});
app.get("/removePost", async function (req, res) {
  var user = req.query.user;
  var id = req.query.id
  Post.findByIdAndRemove(id, {
    _id: id
  }, function (err, result) {
    if (err) {
      res.send("reeor");
    } else {
      res.send("成功");
    }
  })
});
app.get("/centerPer", function (req, res) {
  var user = req.query.user;
  User.checkAllmsg(user, function (err, result) {
    result = result[0]
    for (var i = 0, n = result.posts.length; i < n; i++) {
      if (result.posts[i].user.avatr.indexOf("http://10.20.158.17:3000/") === -1)
        result.posts[i].user.avatr = `http://10.20.158.17:3000/${result.posts[i].user.avatr}`
    };
    res.json(result)
  })
});
app.get("/myPosts", async function (req, res) {
  var user = req.query.user;
  User.findOne({
    user: user
  }, function (err, result) {
    if (result) {
      Post.myPosts(result._id, function (err, result2) {
        result2 = result2.reverse()
        for (var i = 0, n = result2.length; i < n; i++) {
          if (result2[i].user.avatr.indexOf("http://10.20.158.17:3000/") === -1)
            result2[i].user.avatr = `http://10.20.158.17:3000/${result2[i].user.avatr}`
        };
        res.json(result2)
      })
    } else {
      res.json({
        err: 1,
        msg: "用户账号有误"
      })
    }

  })
});
app.get("/shoucang", async function (req, res) {
  var user = req.query.user;
  var id = req.query.id; //文章id
  User.find({
    $and: [{
      user: user
    }, {
      posts: id
    }]
  }, (err, result) => {
    if (result.length == 0) {
      Post.findOne({
        _id: id
      }, function (err, result3) {
        var num = result3.read;
        num++
        Post.updateOne({
          _id: id
        }, {
          $set: {
            read: num
          }
        }, function (err, data) {});
      })
      User.shoucang(user, id, function (err, result2) {
        res.send("ok")
      })
    } else {
      res.send("false")
    }
  })
  Post.findOne({
    _id: id
  }, function (err, result3) {
    var num = result3.read;
    num++

    Post.updateOne({
      _id: id
    }, {
      $set: {
        read: num
      }
    }, function (err, data) {});
  })
});
app.get("/follow", async function (req, res) {
  var user = req.query.user;
  var id = req.query.id;
  User.find({
    $and: [{
      user: user
    }, {
      follow: id
    }]
  }, (err, result) => {

    if (result.length == 0) {
      User.follow(user, id, function (err, result2) {

        res.send("ok")
      })
    } else {
      res.send("false")
    }
  })

});
app.get("/cancelFollow", async function (req, res) {
  var user = req.query.user;
  var id = req.query.id;

  User.find({
    $and: [{
      user: user
    }, {
      follow: id
    }]
  }, (err, result) => {

    if (result.length != 0) {
      User.updateOne({
        user: user
      }, {
        $pull: {
          follow: id
        }
      }, function (err, result) {
        res.send("ok")
      })
    } else {
      res.send("false")
    }
  })

});
app.get("/myShoucang", async function (req, res) {
  var user = req.query.user;
  User.myShoucang(user, function (err, result) {
    if (!result) {
      res.json({
        err: 1,
        msg: "数据出错"
      })
    }
    for (var i = 0, n = result.posts.length; i < n; i++) {
      if (result.posts[i].user.avatr.indexOf("http://10.20.158.17:3000/") === -1)
        result.posts[i].user.avatr = `http://10.20.158.17:3000/${result.posts[i].user.avatr}`
    };

    res.json(result)
  })
});
app.get("/postById", async function (req, res) {
  var id = req.query.id;

  Post.show(id, function (err, result) {

    res.json(result)
  })
  Post.findOne({
    _id: id
  }, function (err, result3) {
    var num = result3.read;
    num++

    Post.updateOne({
      _id: id
    }, {
      $set: {
        read: num
      }
    }, function (err, data) {

    });
  })
});
app.get("/postComment", async function (req, res) {
  var id = req.query.id;
  Comment.find({
    id: id
  }).populate('user').populate({
    path: 'reply',
    populate: {
      path: 'user'
    },
  }).populate({
    path: 'reply',
    populate: {
      path: 'to'
    },
  }).exec(function (err, result) {
    res.json(result)
  })
});
app.get("/doComment", async function (req, res) {
  var id = req.query.id; //评论的_id
  var user = req.query.user;
  var comment = req.query.comment;
  User.findOne({
    user: user
  }, function (err, result) {
    Comment.create({
      id: id,
      user: result._id,
      con: comment,
      createTime: getTime()
    }, function (err, result) {
      res.send("ok")
    })
  })

});
app.get("/doReply", async function (req, res) {
  var id = req.query.id;
  var comment_id = req.query.comment_id //评论_id
  var user = req.query.user; //当前用户
  var comment = req.query.comment; //回复内容
  var user_id = req.query.user_id; //要回复的人
  User.findOne({
    user: user
  }, function (err, result) {
    if (!result) {
      res.json({
        err: 2,
        msg: "用户不存在"
      });
      return
    }
    Reply.create({
      to: user_id,
      user: result._id,
      con: comment,
      createTime: getTime()
    }, function (err, result2) {
      // if(!result2){
      //   res.json({
      //     err:3,
      //     msg:"用户不存在"
      //   });
      //   return
      // }
      Comment.updateOne({
        _id: comment_id
      }, {
        $push: {
          reply: result2._id
        }
      }, function (err, result) {

      })

    })
  })

});
app.get("/fans", function (req, res) {
  var id = req.query.id;

  User.fans(id, function (err, result) {

    res.json(result)
  })
});
app.get("/star", async function (req, res) {
  var id = req.query.id;
  var user = req.query.user;
  var star = req.query.star;
  var user_id = await (await User.findOne({
    user: user
  }))._id
  Post.find({
    $and: [{
      _id: id
    }, {
      star_user: user_id
    }]
  }, function (err, res1) {
    if (res1.length == 0) {
      star++;
      Post.updateOne({
        _id: id
      }, {
        $push: {
          star_user: user_id
        },
        $set: {
          star: star
        }
      }, function (err, res2) {
        res.send("ok")
      });
      Post.findOne({
        _id: id
      }, function (err, result3) {
        var num = result3.read;
        num++
        Post.updateOne({
          _id: id
        }, {
          $set: {
            read: num
          }
        }, function (err, data) {

        });
      })
    } else {
      res.send("false")
    }
  })
});
app.get("/findUserByName", function (req, res) {
  var name = req.query.name;
  User.findUserByName(name, function (err, result) {
    res.json(result)
  });
});
app.get("/allUser", function (req, res) {
  User.find(function (err, result) {
    res.json(result)
  });
});
app.get('/removeImage', function (req, res) {
  var name = req.query.name;
  var user = req.query.user;
  User.updateOne({
    user: user
  }, {
    $pull: {
      image: name
    }
  }, function (err, result) {})
  Image.deleteOne({
    name: name
  }, function (err, doc) {
    if (err) {
      return
    }
  })
  res.send('ok')
})
app.listen(3000);
