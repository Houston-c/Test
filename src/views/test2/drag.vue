<template>
  <div>
      <div id="box"></div>
      <p :style="{width:pWidth+'px',height:'100px',backgroundColor:'#000'}"></p>
  </div>
</template>
 
<script>
export default {
  name: "Dashboard",
  data(){
      return {
          pWidth:300
      }
  },
  mounted() {
    this.dragControllerDiv();
  },
  methods: {
    dragControllerDiv: function() {
      var oBox = document.getElementById("box");
      oBox.onmousedown = function(e) {
        e = e || event;
        var x = e.clientX;
        var y = e.clientY;
        var oBoxL = oBox.offsetLeft;
        var oBoxT = oBox.offsetTop;
        var oBoxW = oBox.offsetWidth;
        var oBoxH = oBox.offsetHeight;

        var d = 0;
        if (x < oBoxL + 10) {
          d = "left";
        } else if (x > oBoxL + oBoxW - 10) {
          d = "right";
        }

        // if (y < oBoxT + 10) {
        //     d = 'top';
        // } else if (d < oBoxT + oBoxH - 10) {
        //     d = 'bottom';
        // }
        // if (x < oBoxL + 10 && y < oBoxT + 10) {
        //     d = 'LT';
        // }
        document.onmousemove = function(e) {
          e = e || event;
          var xx = e.clientX;
          var yy = e.clientY;
          if (d == "left") {
            oBox.style.width = oBoxW + x - xx + "px";
            oBox.style.left = xx + "px";
          } 
        //   else if (d == "right") {
        //     oBox.style.width = oBoxW + xx - x + "px";
        //   }

          // if (d == 'top') {
          //     oBox.style.height = oBoxH + y - yy + 'px';
          //     oBox.style.top = yy + 'px';
          // } else if (d == 'bottom') {
          //     oBox.style.height = oBoxH + yy - y + 'px';
          // }
          // if (d == 'LT') {
          //     oBox.style.width = oBoxW + x - xx + 'px'
          //     oBox.style.left = xx + 'px';
          //     oBox.style.height = oBoxH + y - yy + 'px';
          //     oBox.style.top = yy + 'px';
          // }
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
#box {
  position: fixed;
  right: 10px;
  top: 0;
  width: 150px;
  height: calc(100vh - 10px);
  /* background: orangered; */
  border: 1px solid lightcoral;
}
</style>
