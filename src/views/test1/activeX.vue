<template>
    <div id="app">
        <div class="wrapper">
            <object :classid="clsid" :width="width" :height="height" id="ebring_test" align="center"></object>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                objOcx: "ebring_test",
                clsid: "clsid:0E4613EE-4EF4-40CD-A2F9-CB7D50CF318E",
                SceneResLocation: "D:/dacheng_gl/",
                SceneResName: "Resource_guangliantest",
                sym_name: "",
                sym_x: 0,
                sym_y: 0,
                sym_z: 0,
                showSymbol: false,
                symbolData: [
                    {SymbolName: "test1", SymbolText: "测试1", x: 516556.90625, y: 2651675.25, z: 58.63468933105469},
                    {SymbolName: "test2", SymbolText: "测试2", x: 516904.625, y: 2650589, z: 58.186588287353516},
                    {SymbolName: "test3", SymbolText: "测试3", x: 517818.84375, y: 2649800.5, z: 65.99507904052734},
                ]
            };
        },
        props: {
            height: {
                type: Number,
                default: 930
            },
            width: {
                type: Number,
                default: 2000
            },
            leftShow: {
                type: Boolean,
                default: true
            }
        },
        components: {},
        mounted() {
            window.activeXListener = this;
            this.initOnRealBimOcxInited();
            this.initOnCurSelModelChanged();
            this.initSnapShootData();
            this.initOnPickPosition();
            this.initOnSymbolSelected();
            this.initUIClicked();
            this.objOcx = document.getElementById("ebring_test");
            let param = document.createElement("param");
            param.setAttribute("name", "wmode");
            param.setAttribute("value", "transparent");
            this.objOcx.appendChild(param);
        },
        methods: {
            //   初始化完成调用绘制图像
            initOnRealBimOcxInited() {
                this.temp("OnRealBimOcxInited()", "draw()");
            },
            // 初始化选中构件后的通知事件
            initOnCurSelModelChanged() {
                this.temp(
                    "OnCurSelModelChanged(strObjName, uFileID,uObjSubID,   fObjSelX, fObjSelY, fObjSelZ,  fObjBVMinX,fObjBVMinY,fObjBVMinZ,  fObjBVMaxX,fObjBVMaxY,fObjBVMaxZ)",
                    "change(strObjName, uFileID,uObjSubID,   fObjSelX, fObjSelY, fObjSelZ,  fObjBVMinX,fObjBVMinY,fObjBVMinZ,  fObjBVMaxX,fObjBVMaxY,fObjBVMaxZ)"
                );
            },
            // 截图
            initSnapShootData() {
                this.temp(
                    "SnapShootData( PicBuf,  PicWidth,  PicHeight,  RenDataBuf ,Type)",
                    "shotData(PicBuf,  PicWidth,  PicHeight,  RenDataBuf ,Type)"
                );
            },
            // 点击时的位置信息(点击上方添加标记时触发)
            initOnPickPosition() {
                this.temp(
                    "OnPickPosition( fPosX,  fPosY,  fPosZ)",
                    "locationData(fPosX,  fPosY,  fPosZ)"
                );
            },
            // 选中标记
            initOnSymbolSelected() {
                this.temp("OnSymbolSelected(SelSymbolName)", " checkSym(SelSymbolName)");
            },
            // 点击左上角的图标
            initUIClicked() {
                this.temp(
                    "UIClicked(ButtonType,ButtonMode)",
                    "clickUI(ButtonType, ButtonMode)"
                );
            },
            temp(event, func) {
                var ring = document.createElement("script");
                ring.setAttribute("for", "ebring_test");
                ring.event = event;
                ring.appendChild(document.createTextNode(`activeXListener.${func}`));
                document.body.appendChild(ring);
            },
            // 场景数据
            draw() {
                this.objOcx.SwitchBIMSceneSimple(
                    this.SceneResLocation,
                    this.SceneResName
                );
            },
            // 构件切换
            change(
                strObjName,
            ) {
                // document.getElementById("EleBox").value = strObjName;
                this.objOcx.FocusCameraToComponent(strObjName, 3.0);
                // 根据构件状态显示不同颜色
                var objId = [{strObjName: strObjName, state: 0}];
                // var objId = [{"strObjName":strObjName,"state":0},{"strObjName":"1_1143","state":1}];
                this.SetColor(objId);
                // 构件ID
                console.log(strObjName);
            },
            // 截图数据
            shotData(PicBuf, PicWidth, PicHeight, RenDataBuf, Type) {
                alert(PicBuf);
            },
            // 点击左上角图标
            clickUI(ButtonType, ButtonMode) {
                console.log("uiClick");
                let that = this;
                var buttontype = ButtonType;
                var buttonmode = ButtonMode;
                if (buttontype == "CAPTURE") {
                    that.objOcx.CreateSnapShootInMem(true, 40, 30, true, true);
                }
                if (buttontype == "ADD_SYMBOL") {
                    that.objOcx.AddSymbolBegin("");
                }
                if (buttontype == "DISP_SYMBOL") {
                    that.showSymbol = !that.showSymbol;
                    if (that.showSymbol) {
                        that.addMarker();
                    } else {
                        that.objOcx.DelAllSymbols();
                    }
                }
            },
            // 点击位置坐标信息
            locationData(fPosX, fPosY, fPosZ) {
                this.sym_x = fPosX;
                this.sym_y = fPosY;
                this.sym_z = fPosZ;
                console.log(this.sym_x, this.sym_y, this.sym_z);
                let location = this.objOcx.GetCamLocation();
                console.log(location)
            },
            // 选取标记信息
            checkSym(SelSymbolName) {
                this.sym_name = SelSymbolName;
                console.log(this.sym_name);
                let option = Math.random();
                let info = {name: SelSymbolName, option};
                this.$parent.showManageInfo(info);
            },
            // 获取构件信息
            Function_GetElementBox() {
                var Text = document.getElementById("EleBox");
                var m = this.objOcx.GetHugeObjSubAABB(Text.value);
                alert(m);
            },
            // 相机定位
            Function_LocateCamTo() {
                if (arguments[0]) {
                    console.log("arguments" + arguments[0]);
                    this.objOcx.LocateCamToAnimation(arguments[0]);
                } else {
                    var Text = document.getElementById("cameralocation");
                    //把相机定位到指定方位 （相机方位相关  -> 2）
                    this.objOcx.LocateCamToAnimation(Text.value);
                }
            },
            //重置相机
            Function_ResetCamera() {
                this.objOcx.ResetCamera();
            },
            // 截屏
            Function_CreateSnapShootInMem() {
                this.objOcx.CreateSnapShootInMem(true, 40, 30, true, true);
            },
            //  提交输入的标注文字内容
            SubmitText_onclick() {
                var submitText = document.getElementById("CapText");
                this.objOcx.SubmitMarkerText(submitText.value);
                console.log(this.objOcx.SubmitMarkerText(submitText.value));
            },
            // 保存标注
            SaveText_onclick() {
                this.objOcx.CreateMarkerEndInMem(true, 800, 600, true, true);
            },

            // 提交标记内容：保存标记
            SaveSymbol_onclick(SymbolText, SymbolName) {
                let symbol = {SymbolName, SymbolText, x: this.sym_x, y: this.sym_y, z: this.sym_z};
                this.objOcx.AddSymbol(
                    SymbolName,
                    SymbolText,
                    this.sym_x,
                    this.sym_y,
                    this.sym_z,
                    50.0,
                    0
                );
                this.symbolData.push(symbol);
            },
            // 结束添加标记
            ExitSymbol_onclick() {
                this.objOcx.AddSymbolEnd();
                this.objOcx.DeleteSymbol("[object HTMLInputElement]");
            },
            // 删除标记
            DeleteSymbol_onclick(symName) {
                console.log(symName)
                if (symName) {
                    this.objOcx.DeleteSymbol(symName);
                    this.objOcx.DeleteSymbol("[object HTMLInputElement]");
                } else {
                    this.objOcx.DeleteSymbol(this.sym_name);
                    this.objOcx.DeleteSymbol("[object HTMLInputElement]");
                }
            },
            // 隐藏左上角添加标记按钮
            HidButton_onclick() {
                this.objOcx.SetButtonVisible("ADD_SYMBOL", false);
            },
            //相机定位
            locateCamTo(data) {
                this.objOcx.LocateCamToAnimation(data);
            },
            addMarker(symbolData) {
                let markerData = symbolData ? symbolData : this.symbolData;
                this.objOcx.AddSymbolBegin("");
                for (let i = 0; i < markerData.length; i++) {
                    this.objOcx.AddSymbol(
                        markerData[i].SymbolName,
                        markerData[i].SymbolText,
                        markerData[i].x,
                        markerData[i].y,
                        markerData[i].z,
                        50.0,
                        0
                    );
                }
                this.objOcx.AddSymbolEnd();
            }
        }
    };
</script>
<style>
    body {
        margin: 0;
        padding: 0;
    }

    .wrapper {
        display: flex;
    }
</style>
