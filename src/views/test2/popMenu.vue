<template>
  <div id="popMenu">
    <div class="tags_div" v-menus>
      <ul class="contextmenu" :style="{'left': menuLeft, 'top': menuTop}" v-show="menuShow">
        <li id="addPage" @mousemove="addPage">新增页面</li>
        <li @mousemove="addPageout">复制页面</li>
        <li @mousemove="addPageout">删除页面</li>
        <li @mousemove="addPageout">排序</li>
        <li @mousemove="addPageout">导入定位图片</li>
        <li @mousemove="addPageout">导入定位视频</li>
      </ul>
      <ul
        class="contextmenu"
        :style="{'left': parseInt(menuLeft) + 150 +'px', 'top': menuTop}"
        v-show="addShow"
      >
        <li @click="singleWindow">单窗口</li>
        <li @click="lrWindow">左右窗口</li>
        <li @click="tbWindow">上下窗口</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "popMenu",
  directives: {
    //指令定义函数
    menus: {
      // inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）
      inserted: function(el, binding, vnode) {
        //钩子函数
        /** el可以获取当前dom节点，并且进行编译，也可以操作事件 **/
        /** binding指的是一个对象，一般不用 **/
        /** vnode 是 Vue 编译生成的虚拟节点 **/

        //获取vue实例对象
        let vm = vnode.context;
        let showFlag = true;
        vnode = vnode.elm;
        //阻止默认浏览器的右键菜单
        el.oncontextmenu = event => {
          event.preventDefault();
        };
        el.onmouseup = event => {
          // 右键点击
          if (event.button === 2) {
            vm.menuShow = true;
            vm.addShow = false;
            showFlag = false;
            let realTop = vm.getElementToPageTop(vnode);
            let realLeft = vm.getElementToPageLeft(vnode);
            let top = event.pageY - realTop + 5 + "px";
            let left = event.pageX - realLeft + 5 + "px";
            vm.menuLeft = left;
            vm.menuTop = top;
          }
        };
        document.onmouseup = () => {
          if (showFlag) {
            vm.menuShow = false;
            vm.addShow = false;
          }
          showFlag = true;
        };
      }
    }
  },
  //vue实例数据
  data() {
    return {
      menuShow: false,
      menuLeft: 0,
      menuTop: 0,
      addShow: false,
      addData: {},
      rules: {
        content: [
          { required: true, message: "请输入标记内容", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入标记名", trigger: "blur" }]
      }
    };
  },
  //获取当前元素距离body原点的距离
  methods: {
    getElementToPageTop: function(el) {
      if (el.offsetParent) {
        return this.getElementToPageTop(el.offsetParent) + el.offsetTop;
      }
      return el.offsetTop;
    },
    getElementToPageLeft: function(el) {
      if (el.offsetParent) {
        return this.getElementToPageLeft(el.offsetParent) + el.offsetLeft;
      }
      return el.offsetLeft;
    },
    // 鼠标悬浮在新增页面时显示对应菜单
    addPage() {
      this.addShow = true;
    },
    // 隐藏新增页面菜单
    addPageout() {
      this.addShow = false;
    },
    singleWindow() {
      console.log("单窗口");
    },
    lrWindow() {
      console.log("左右窗口");
    },
    tbWindow() {
      console.log("上下窗口");
    }
  }
};
</script>
<style>
.tags_div {
  position: relative;
  display: inline-block;
  height: 500px;
  width: 200px;
  background-color: gray;
}

.contextmenu {
  margin: 0;
  background: #fff;
  width: 150px;
  z-index: 100;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  color: #333;
  /* box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3); */
}

.contextmenu li {
  margin: 0;
  padding: 10px 16px;
  cursor: pointer;
}

.contextmenu li:hover {
  background: #eee;
}
</style>