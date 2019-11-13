<template>
  <div class="upFile-wrap">
    <el-upload
  class="upload-demo"
  drag
  name="logo"
  action="http://127.0.0.1:3000/upload"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  </div>
</template>

<script>
export default {
  name: 'UpFile'
}
</script>
<style  scoped>
.upFile-wrap{
  width: 400px;
  height: 400px;
  margin: 150px auto;
}
</style>
