<template>
    <div class="wrapper">
        <div class="gjTree" ref="gjTree">
            <div v-for="(item,index) in gjTreeData" :key="index">
                <div class="treeItem" @click="gjTreeClick(item,index)">{{item.text}}</div>
            </div>

        </div>
        <!--        bim模型-->
        <div class="bimModel">
            <da-cheng :width="bimModelWidth" :height="930" ref="ActiveX"></da-cheng>
            <!--            <div class="markerInfo">-->
            <!--                <input type="text" name="" id="markerContent" placeholder="请输入标记内容"-->
            <!--                       style="height:25px;margin-top:25px;"/>-->
            <!--                <input type="text" name="" id="markerName" placeholder="请输入标记名"-->
            <!--                       style="height:25px;margin-top:25px;"/>-->
            <!--                <button class="buttonStyle" @click="addMarker()">添加标记</button>-->
            <!--                <button class="buttonStyle" @click="endMarker()">结束添加</button>-->
            <!--            </div>-->
        </div>
        <!--        详细信息-->
        <div class="manageInfo">
            <div class="title">管理信息</div>
            <div v-if="Object.keys(showInfo).length != 0">
                <div> 标记名：{{showInfo.text}}</div>
                <div> 设计选项：{{showInfo.option}}</div>
                <div>
                    图片：<br>
                    <img :src="showInfo.imageUrl"
                         alt="" height="200px" width="200px">
                </div>
                <div>
                    视频：<br>
                    <video :src="showInfo.videoUrl" controls="controls"
                           alt="" height="200px" width="200px"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DaCheng from "./activeX"

    export default {
        name: "demo",
        components: {
            DaCheng
        },
        data() {
            return {
                screenWidth: document.body.clientWidth,
                gjTreeData: [{
                    text: "测试1", location: "516024,2650820,672.448,0.424708,-0.17592,-0.339851,0.820473", option: "1",
                    imageUrl: "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4018557288,1217151095&fm=26&gp=0.jpg",
                    videoUrl: "http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4"
                },
                    {
                        text: "测试2",
                        location: "516271,2650120,693.158,0.424708,-0.17592,-0.339851,0.820473",
                        option: "2",
                        imageUrl: "https://t8.baidu.com/it/u=2247852322,986532796&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1590478127&t=22bb2788a6ec72fa2d958fe9105110bb",
                        videoUrl: "http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4"
                    },
                    {
                        text: "测试3",
                        location: "517300,2649350,520.511,0.424708,-0.17592,-0.339851,0.820473",
                        option: "3",
                        imageUrl: "https://t9.baidu.com/it/u=583874135,70653437&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1590478127&t=ec25a5f573492cd0c67deb6d42532a3d",
                        videoUrl: "http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4"
                    }],
                showInfo: Object
            }
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
                    window.screenWidth = document.body.clientWidth
                    that.screenWidth = window.screenWidth
                    console.log(that.screenWidth)
                })()
            }
        },
        watch: {
            screenWidth(val) {
                // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
                if (!this.timer) {
                    // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
                    this.screenWidth = val
                    this.timer = true
                    let that = this
                    setTimeout(function () {
                        // 打印screenWidth变化的值
                        console.log(that.screenWidth)
                        that.timer = false
                    }, 400)
                }
            }
        },
        methods: {
            addMarker() {
                let SymbolText = document.getElementById("markerContent").value;
                let SymbolName = document.getElementById("markerName").value;
                console.log(SymbolText);
                this.$refs.ActiveX.SaveSymbol_onclick(SymbolText, SymbolName);
            },
            endMarker() {
                this.$refs.ActiveX.ExitSymbol_onclick();
            },
            gjTreeClick(item, index) {
                console.log(item)
                this.$refs.ActiveX.locateCamTo(item.location);
                this.showInfo = item;
                console.log(this.showInfo)
            },
            showManageInfo(info) {
                console.log(info)
                this.showInfo = info;
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
    }

    .gjTree {
        width: 300px;
    }

    .bimModel {
        display: flex;
        flex-direction: column;
    }

    .treeItem {
        margin: 20px 0 0 20px;
        cursor: default;
    }

    .markerInfo {
        margin-top: 10px;
    }

    .manageInfo {
        width: 300px;
        margin: 0 10px;
    }

    .title {
        margin: 20px 0;
    }
</style>
