<template>
  <div id="big">
    <div id="c" @click="clear">c</div>
    <div id="a1" @click="add(1)">1</div>
    <div id="a2" @click="add(2)">2</div>
    <div id="a3" @click="add(3)">3</div>
    <div id="a4" @click="add(4)">4</div>
    <div id="a5" @click="add(5)">5</div>
    <div id="a6" @click="add(6)">6</div>
    <div id="a7" @click="add(7)">7</div>
    <div id="a8" @click="add(8)">8</div>
    <div id="a9" @click="add(9)">9</div>
    <div id="a0" @click="add(0)">0</div>
    <div id="a16" @click="add('+')">+</div>
    <div id="a15" @click="add('-')">-</div>
    <div id="a14" @click="add('/')">/</div>
    <div id="a13" @click="add('*')">X</div>
    <div id="a12" @click="run">=</div>
    <div id="a11" @click="add('.')">.</div>
    <input type="text" readonly="readonly" v-model="res" id="a17" />
  </div>
</template>

<script>
export default {
  name: "Col",
  data() {
    return {
      res: ""
    };
  },
  methods: {
    add(index) {
      this.res += index;
    },
    run() {
      try {
        this.res = eval(this.res);
      } catch (exception) {
        this.res = "";
        alert("输入有误，请重新输入");
      }
    },
    clear() {
      this.res = "";
    }
  }
};
</script>
<style lang="css" scoped>
#big {
  position: relative;
  width: 355px;
  height: 240px;
  background-color: #999cff;
  margin: 100px auto;
  border-radius: 10px;
  box-shadow: 15px 15px 15px #000;
  cursor: pointer;
}

#big div {
  position: absolute;
  box-shadow: 5px 5px 5px #000;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  width: 80px;
  height: 40px;
  border-radius: 5px;
}

#c {
  background-color: #ffffff;
  left: 10px;
  top: 7px;
}

#a7 {
  background-color: #ffffff;
  left: 10px;
  top: 55px;
}

#a4 {
  background-color: #ffffff;
  left: 10px;
  top: 100px;
}

#a1 {
  background-color: #ffffff;
  left: 10px;
  top: 145px;
}

#a0 {
  background-color: #ffffff;
  left: 10px;
  top: 190px;
}

#a8 {
  background-color: #ffffff;
  left: 95px;
  top: 55px;
}

#a5 {
  background-color: #ffffff;
  left: 95px;
  top: 100px;
}

#a2 {
  background-color: #ffffff;
  left: 95px;
  top: 145px;
}

#a11 {
  background-color: #ffffff;
  left: 95px;
  top: 190px;
}

#a9 {
  background-color: #ffffff;
  left: 180px;
  top: 55px;
}

#a6 {
  background-color: #ffffff;
  left: 180px;
  top: 100px;
}

#a3 {
  background-color: #ffffff;
  left: 180px;
  top: 145px;
}

#a12 {
  background-color: #ffffff;
  left: 180px;
  top: 190px;
}

#a16 {
  background-color: #f44336;
  left: 265px;
  top: 55px;
}

#a15 {
  background-color: #f44336;
  left: 265px;
  top: 100px;
}

#a14 {
  background-color: #f44336;
  left: 265px;
  top: 145px;
}

#a13 {
  background-color: #f44336;
  left: 265px;
  top: 190px;
}

#a17 {
  position: absolute;
  box-shadow: inset 5px 5px 5px #000;
  text-align: center;
  font-size: 20px;
  width: 250px;
  height: 40px;
  background-color: #99ffa6;
  border-radius: 5px;
  left: 95px;
  top: 5px;
}
</style>
