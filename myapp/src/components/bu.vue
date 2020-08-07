<template>
 <div class="wrap2">
        <div class="scr">
            <div class="top">
                <div class="show">
                </div>
                <div class="show2">
                </div>
            </div>
        </div>
        <div class="bottom">
            <input type="text" class="inp" placeholder="快来一起吐槽吧">
            <span class="send">发送</span>
        </div>
    </div>
</template>
<style lang="" scope="">
 * {
            margin: 0;
            padding: 0;
        }

        .wrap2 {
            padding: 10px 0;
            position: absolute;
            width: 800px;
            background: darkslategray;
            height: 600px;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;

        }

        .wrap2 .top {
            text-shadow: 1px 2px 3px #000;
            text-align: center;
            width: 4000px;
            height: 550px;

        }

        .wrap2 .show {

            float: left;
            min-width: 800px;
            height: 550px;
            position: relative;
        }

        .wrap2 .show2 {

            float: left;
            min-width: 800px;
            height: 550px;
            position: relative;
        }

        .wrap2 .show2 div {
            width: 200px;

            position: absolute;
            font-size: 14px;
            height: 20px;
            line-height: 20px;
        }

        .wrap2 .show div {

            width: 200px;
            position: absolute;
            font-size: 14px;
            height: 20px;
            line-height: 20px;
        }

        .wrap2 .bottom {
            padding: 10px 40px;
            width: 720px;

            height: 30px;
            position: absolute;
            bottom: 0;

        }

        .wrap2 input {

            height: 30px;
        }

        .wrap2 .inp {
            float: left;
            border-radius: 8px;
            border: none;
            width: 600px;
            padding-left: 10px;
            outline: none;
        }

        .wrap2 .send {
            border-radius: 10px;
            float: right;
            width: 100px;
            height: 30px;
            background-color: floralwhite;
            line-height: 30px;
            text-align: center;
        }

        .scr {
            opacity: 0.6;
            width: 800px;
            height: 550px;
            overflow: hidden;
        }
</style>
<script>
export default {
  created() {
    this.avatrUser = this.user;
    var islogin = localStorage.getItem("islogin");
    localStorage.getItem("islogin");
    if (islogin !== "true" || localStorage.getItem("user") === null) {
      window.location.href = "#/login";
    } else {



    //   this.$axios
    //     .get("http://10.20.158.17:3000/avatr?user=" + this.user)
    //     .then((res) => {
    //       this.circleUrl = res.data.result;
    //     })
    //     .catch((err) => {});
    }
  },
  mounted(){
     var date = ["弹幕护体", "愿世间再无bug", "弹幕护体", "雾山五行", "弹幕护体", "为什么bug总是改不完", "弹幕护体", "你的bug，不这是你的bug", "弹幕护体", "为什么bug总是改不完",
            "弹幕护体", "愿世间再无bug", "弹幕护体", "雾山五行", "弹幕护体", "为什么bug总是改不完", "弹幕护体", "愿世间再无bug"
        ]
        var point = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var show = document.querySelector(".show");
        var show2 = document.querySelector(".show2");
        var wrap = document.querySelector(".wrap2");
        var _src = document.querySelector(".scr");
        var send = document.querySelector(".send");
        
        var inp = document.querySelector(".inp");
        var max_left;
        var timer = null;
        var max = 0;
        for (var i = 0, n = date.length; i < n; i++) {
            addDiv(date[i])
        };
        var time = 0;
        timer = setInterval(function () {
            time += 0.6;
            if (time > max) {
                time = 0
            }
            _src.scrollLeft = time
        }, 1)
        send.onclick = function () {
            var inp = document.querySelector(".inp");
            if (inp.value.trim() == '') {
                return
            }
            addDiv(inp.value)
        }

        function addDiv(str) {
            var newDiv = document.createElement("div");
            newDiv.innerText = str
            var t = randomInt(0, 19);
            var l = point[t];
            point[t]++
            max_left = Math.max(...point);
            max = max_left > 4 ? max_left * 200 : 800;
            newDiv.style.top = t * 20 + 'px'
            newDiv.style.left = l * 200 + 30 + 'px';
            newDiv.style.color = randomColor()
            show.style.width = max + 'px'
            show2.style.width = max + 'px'
            show.appendChild(newDiv)
            show2.innerHTML = show.innerHTML;
            inp.value = ''
        }
        inp.onkeyup = function (ev) {
            var e = ev || event;
            if (e.keyCode === 13) {
                var inp = document.querySelector(".inp");
                if (inp.value.trim() == '') {
                    return
                }
                addDiv(inp.value)
            }
        }

        function randomInt(min, max) { //产生[min,max]范围内的整数
            return Math.round(Math.random() * (max - min)) + min
        }

        function randomColor() { //产生随机的颜色
            var map = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
            var str = '#'
            for (var i = 0; i < 6; i++) {
                var index = randomInt(0, 15);
                str += map[index];
            }
            return str
        }
  },
  data() {
    return {
      circleUrl: "",
      avatrUser: "",
    };
  },
  methods:{

  }
};
</script>