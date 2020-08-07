<template>
  <div class="upFile-wrap">
    <!-- <el-upload
  class="upload-demo"
  drag
  name="logo"
  :data="user"
  action="http://10.20.158.17:3000/upload"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>-->
    <h1>请上传头像</h1>
    <el-upload
      ref="upload"
      :data="user"
      name="logo"
      multiple
      :limit="1"
      auto-upload
      action="http://10.20.158.17:3000/upAvatr"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传头像</el-button>
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
    submitUpload() {
      window.location.href = "";
    },
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
      dialogVisible: false,
      isAuto: "false"
    };
  }
};
</script>
<style  scoped>
.upFile-wrap {
  width: 400px;
  height: 400px;
  margin: 150px auto;
}
</style>
