<template>
  <div id="dragDiv">
    <div :style="{width:leftWidth+'px',backgroundColor:'gray',height:screenHeight+'px'}"></div>
    <div class="manageInfo" id="manageInfo" :style="{width:manageInfoWidth+'px'}">
      <div id="manageBorder"></div>
      <div class="info">
        <div class="title">管理信息</div>
        <el-form :model="addData" ref="addData" :rules="rules" label-width="80px">
          <el-form-item label="内容" prop="content">
            <el-input v-model="addData.content" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="名字" prop="name">
            <el-input v-model="addData.name" placeholder="请输入名字"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      screenWidth: document.body.clientWidth,
      screenHeight: document.body.clientHeight,
      leftWidth: document.body.clientWidth * 0.7,
      addData: {},
      rules: {
        content: [
          { required: true, message: "请输入标记内容", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入标记名", trigger: "blur" }]
      }
    };
  },
  computed: {
    manageInfoWidth: {
      get() {
        return this.screenWidth - this.leftWidth;
      }
    }
  },
  mounted() {
    this.dragControllerDiv();
  },
  methods: {
    dragControllerDiv: function() {
      let that = this;
      let info = document.getElementById("manageInfo");
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
            let maxWidth = that.screenWidth - 400;
            let boxWidth = oBoxW + x - xx;
            if (boxWidth > 300 && boxWidth < maxWidth) {
              info.style.width = boxWidth + "px";
              that.leftWidth = that.screenWidth - boxWidth;
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

<style>
#manageBorder {
  width: 10px;
  height: 100%;
  background-color: transparent;
  /*background-color: #000;*/
  cursor: w-resize;
}

.manageInfo {
  position: absolute;
  right: 0;
  top: 0;
  height: calc(100vh - 2px);
  display: flex;
}
.info {
  display: flex;
  flex-direction: column;
}
.title {
  margin: 20px 0;
}
</style>