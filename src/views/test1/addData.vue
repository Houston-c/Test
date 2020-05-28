<template>
  <div class="wrapper">
    <div class="bimModel">
      <da-cheng :width="bimWidth" :height="screenHeight" ref="ActiveX"></da-cheng>
    </div>
    <div class="manageInfo" :style="{width:manageInfoWidth+'px'}">
      <div id="manageBorder"></div>
      <div style="display:flex;flex-direction: column">
        <div class="title">管理信息</div>
        <el-form :model="addData" ref="addData" :rules="rules" label-width="80px">
          <el-form-item label="标记内容" prop="content">
            <el-input v-model="addData.content" placeholder="请输入标记内容"></el-input>
          </el-form-item>
          <el-form-item label="标记名" prop="name">
            <el-input v-model="addData.name" placeholder="请输入标记名"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              action
              list-type="picture-card"
              :on-change="onUploadChange"
              :before-upload="beforeUpload"
              :on-preview="handlePictureCardPreview"
              :auto-upload="false"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="视频">
            <el-upload
              class="avatar-uploader el-upload--text"
              :action="uploadUrl"
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
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addMarker()">添加标记</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import DaCheng from "./activeX";

export default {
  name: "demo",
  components: {
    DaCheng
  },
  data() {
    return {
      screenWidth: document.body.clientWidth,
      screenHeight: document.body.clientHeight,
      bimWidth: document.body.clientWidth * 0.7,
      addData: {},
      rules: {
        content: [
          { required: true, message: "请输入标记内容", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入标记名", trigger: "blur" }]
      },
      gjTreeData: [
        {
          text: "测试1",
          location:
            "516024,2650820,672.448,0.424708,-0.17592,-0.339851,0.820473"
        },
        {
          text: "测试2",
          location:
            "516271,2650120,693.158,0.424708,-0.17592,-0.339851,0.820473"
        },
        {
          text: "测试3",
          location:
            "517300,2649350,520.511,0.424708,-0.17592,-0.339851,0.820473"
        }
      ],
      manageInfo: [
        { name: "测试1", option: "1" },
        { name: "测试2", option: "2" },
        { name: "测试3", option: "3" }
      ],
      showInfo: Object,
      uploadUrl: "http://upload-z2.qiniup.com", //你要上传视频到你后台的地址
      videoFlag: false, //是否显示进度条
      videoUploadPercent: "", //进度条的进度，
      isShowUploadVideo: false, //显示上传按钮,
      videoForm: {
        showVideoPath: ""
      },
      postData: {
        token: ""
      },
      imageData: [],
      videoData: []
    };
  },
  computed: {
    manageInfoWidth: {
      get() {
        return this.screenWidth - this.bimWidth;
      }
    }
  },
  mounted() {
    let that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        window.screenHeight = document.body.clientHeight;
        that.screenWidth = window.screenWidth;
        that.screenHeight = window.screenHeight;
        console.log(that.screenWidth);
      })();
    };
    this.dragControllerDiv();
  },
  watch: {
    screenWidth(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          // 打印screenWidth变化的值
          console.log(that.screenWidth);
          that.timer = false;
        }, 400);
      }
    }
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
    handlePictureCardPreview(file) {
      let content = require(`./imageShow.vue`).default;
      this.$layer.iframe({
        content: {
          content: content, //传递的组件对象
          parent: this, //当前的vue对象
          data: {
            imageUrl: file.url
          } //props
        },
        // id:'xxxxxx',
        // resize: true,
        top: 10,
        // left: 10,
        right: 10,
        // bottom: 10,
        icon: 0,
        // maxmin: true,
        // btn: "确定",
        shade: false, //是否显示遮罩
        area: ["320px", "340px"],
        title: "管理",
        cancel: () => {
          //关闭事件
          // alert('关闭iframe');
        }
      });
    },
    onUploadChange(file) {
      let that = this;
      let reader = new FileReader();
      console.log(file);
      reader.readAsDataURL(file.raw);
      reader.onload = function(e) {
        // console.log(this.result); //图片的base64数据
        that.imageData.push({ name: file.raw.name, data: e.target.result });
      };
    },
    beforeUpload(file) {
      const isIMAGE =
        file.raw.type === "image/jpeg" || file.raw.type === "image/png";
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isIMAGE) {
        this.$message.error("只能上传jpg/png图片!");
        return false;
      }
      if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 1MB!");
        return false;
      }
    },
    beforeUploadVideo(file) {
      let that = this;
      let fileSize = file.size / 1024 / 1024 < 50;
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
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        // console.log(e.target.result); //base64数据
        // that.videoForm.showVideoPath = e.target.result;
        that.videoData.push({ name: file.name, data: e.target.result });
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
    },
    addMarker() {
      let SymbolText = this.addData.content;
      let SymbolName = this.addData.name;
      let textVaild =
        SymbolText !== null &&
        SymbolText !== undefined &&
        SymbolText.trim() !== "";
      let nameVaild =
        SymbolName !== null &&
        SymbolName !== undefined &&
        SymbolName.trim() !== "";
      if (textVaild && nameVaild) {
        this.$refs.ActiveX.SaveSymbol_onclick(SymbolText, SymbolName);
        this.$refs.ActiveX.ExitSymbol_onclick();
        let imageData = this.imageData;
        let videoData = this.videoData;
        let json = { SymbolText, SymbolName, imageData, videoData };
        console.log(json);
      }
    },
    dragControllerDiv: function() {
      let that = this;
      let info = document.getElementsByClassName("manageInfo")[0];
      let oBox = document.getElementById("manageBorder");
      oBox.onmousedown = function(e) {
        e = e || event;
        let x = e.clientX;
        let oBoxL = info.offsetLeft;
        let oBoxW = info.offsetWidth;

        let d = 0;
        if (x < oBoxL + 10) {
          d = "left";
        }
        document.onmousemove = function(e) {
          e = e || event;
          let xx = e.clientX;
          if (d == "left") {
            //信息框宽度最小为300,信息框左侧宽度最小为800
            let maxWidth = that.screenWidth - 800;
            let boxWidth = oBoxW + x - xx;
            if (boxWidth > 300 && boxWidth < maxWidth) {
              info.style.width = boxWidth + "px";
              that.bimWidth = that.screenWidth - boxWidth;
            }
          }
          return false;
        };
        document.onmouseup = function() {
          document.onmousemove = null;
          document.onmouseup = null;
        };
        if (e.preventDefault) {
          e.preventDefault();
        }
      };
    }
  }
};
</script>

<style scoped>
.wrapper {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}

.bimModel {
  display: flex;
  flex-direction: column;
}

#manageBorder {
  width: 10px;
  height: 100%;
  background-color: transparent;
  /*background-color: #000;*/
}

.manageInfo {
  position: absolute;
  right: 0;
  top: 0;
  height: calc(100vh - 2px);
  display: flex;
}

.title {
  margin: 20px 0;
}

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
