<template>
  <div class="upFile-wrap">
    <el-upload
      :data="user"
      name="logo"
      action="http://10.20.158.17:3000/upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "UpFile",
  created: function() {
    if (localStorage.getItem("islogin") != "true") {
      window.location.href = "#/login";
    } else {
      this.user = { user: localStorage.getItem("user") };
    }
  },
  methods: {
    handleRemove(file, fileList) {   
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  data() {
    return {
      user: "",
      dialogImageUrl: "",
      dialogVisible: false
    };
  }
};
</script>
<style  scoped>
.upFile-wrap {
  margin: 200px auto;
  width: 350px;
  height: 200px;
}
</style>
