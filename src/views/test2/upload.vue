<template>
  <div id="upload">
    <el-upload
      :multiple="true"
      :action="actionPath"
      accept="image/jpeg, image/gif, image/png, image/bmp"
      :before-upload="beforeAvatarUpload"
      :data="postData"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" height="150" width="150" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <br />
    <!-- 视频上传 -->
    <el-upload
      class="avatar-uploader el-upload--text"
      :action="actionPath"
      :show-file-list="false"
      accept=".mp4"
      :data="postData"
      :on-success="handleVideoSuccess"
      :before-upload="beforeUploadVideo"
      :on-progress="uploadVideoProcess"
    >
      <video
        v-if="videoForm.showVideoPath !='' && !videoFlag"
        :src="videoForm.showVideoPath"
        class="avatar video-avatar"
        controls="controls"
      >您的浏览器不支持视频播放</video>
      <i
        v-else-if="videoForm.showVideoPath =='' && !videoFlag"
        class="el-icon-plus avatar-uploader-icon"
      ></i>
      <el-progress
        v-if="videoFlag == true"
        type="circle"
        :percentage="videoUploadPercent"
        style="margin-top:30px;"
      ></el-progress>
      <el-button
        class="video-btn"
        slot="trigger"
        size="small"
        v-if="isShowUploadVideo"
        type="primary"
      >选取文件</el-button>
    </el-upload>
    <P v-if="isShowUploadVideo" class="text">请保证视频格式正确，且不超过20M</P>
  </div>
</template>
<script>
import { genUpToken } from "../../util/qiNiuToken";
export default {
  data() {
    return {
      actionPath: "http://upload-z2.qiniup.com",
      postData: {
        token: ""
      },
      imageUrl: "",
      videoFlag: false, //是否显示进度条
      videoUploadPercent: "", //进度条的进度，
      isShowUploadVideo: false, //显示上传按钮,
      videoForm: {
        showVideoPath: ""
      }
    };
  },
  created() {
    var token;
    var policy = {};
    var bucketName = "hcz206";
    var AK = "RXDZ4MnqIrOkTRNhDFkN1LLQ0q58EApAOBI10AlV";
    var SK = "_MmaIWLsBFuKzPJ7Bj3l9DwoyFzAmqXCsEGmoqP2";
    var deadline = Math.round(new Date().getTime() / 1000) + 3600;
    policy.scope = bucketName;
    policy.deadline = deadline;
    token = genUpToken(AK, SK, policy);
    console.log(token);
    this.postData.token = token;
  },
  methods: {
    //   图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 视频上传
    beforeUploadVideo(file) {
      let that = this;
      var fileSize = file.size / 1024 / 1024 < 50;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov"
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!fileSize) {
        this.$message.error("视频大小不能超过50MB");
        return false;
      }
      this.isShowUploadVideo = false;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        // console.log(e.target.result); //base64数据
        // that.videoForm.showVideoPath = e.target.result;
      };
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      this.videoForm.showVideoPath =
        "http://qaklge62i.bkt.clouddn.com/" + res.key;
    }
  }
};
</script>
<style  scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.video-avatar {
  width: 230px;
  height: 230px;
}
</style>