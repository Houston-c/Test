<template>
  <div class="wrapper">
    <!--        <div class="gjTree" ref="gjTree">-->
    <!--            <div v-for="(item,index) in gjTreeData" :key="index">-->
    <!--                <div class="treeItem" @click="gjTreeClick(item,index)">{{item.text}}</div>-->
    <!--            </div>-->
    <!--        </div>-->
    <div class="bimModel">
      <da-cheng :width="bimModelWidth" :height="930" ref="ActiveX"></da-cheng>
    </div>
    <div class="manageInfo">
      <div class="title">管理信息</div>
      <el-form
        :model="addData"
        ref="addData"
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="标记内容" prop="content">
          <el-input v-model="addData.content"></el-input>
        </el-form-item>
        <el-form-item label="标记名" prop="name">
          <el-input v-model="addData.name"></el-input>
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
        token:
          "RXDZ4MnqIrOkTRNhDFkN1LLQ0q58EApAOBI10AlV:iqGo9fOU2-eCBcKriSZNP72qwx8=:eyJzY29wZSI6ImhjejIwNiIsImRlYWRsaW5lIjoxNTg5ODg0NTE3fQ=="
      },
      imageData: [],
      videoData: []
    };
  },
  computed: {
    bimModelWidth() {
      return this.screenWidth * 0.7;
    }
  },
  mounted() {
    let that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
        console.log(that.screenWidth);
      })();
    };
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
  methods: {
    gjTreeClick(item, index) {
      console.log(this.manageInfo[index]);
      this.$refs.ActiveX.locateCamTo(item.location);
      this.showInfo = this.manageInfo[index];
    },
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
        area: ["320px", "400px"],
        title: "管理",
        cancel: () => {
          //关闭事件
          // alert('关闭iframe');
        }
      });
    },
    onUploadChange(file) {
      let that = this;
      var reader = new FileReader();
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
        console.log(imageData, videoData);
        let json = { SymbolText, SymbolName, imageData, videoData };
        console.log(json);
      }
    }
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  /*justify-content: space-around;*/
}

.bimModel {
  display: flex;
  flex-direction: column;
}

.manageInfo {
  width: 300px;
  margin: 0 10px;
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
