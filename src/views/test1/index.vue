<template>
    <div id="app">
        <div class="wrapper">
            <!-- <LeftTool v-show="leftShow"></LeftTool> -->
            <object :classid="clsid" :width="width" :height="height" id="ebring_test" align="center"></object>
        </div>

        <!--    <input id="EleBox" type="text" placeholder="构件id" />-->
        <!--    <button type="button" @click="Function_GetElementBox()" id="button_red15">获取构件box</button>-->
        <!--    <button type="button" @click="Function_GetCamLocation()" id="button_red2">获取相机位置</button>-->
        <!--    <input id="cameralocation" type="text" placeholder="相机位置" />-->
        <!--    <button type="button" @click="Function_LocateCamTo()" id="button12">相机定位</button>-->
        <!--    <button type="button" @click="Function_ResetCamera()" id="button_red1">重置相机</button>-->
        <!--    <input id="ComId" type="text" placeholder="1_1143" />-->
        <!--    <button type="button" @click="Function_FocusCameraToComponent()" id="button_fc">定位构件</button>-->
        <!--    <button type="button" @click="Function_SetAllSubClrInfos()" id="button_red4">设置所有构件颜色</button>-->
        <!--    <button type="button" @click="SetAllSubStatusInfos()" id="button_s1">隐藏所有构件</button>-->
        <!--    <button type="button" @click="SetAllSubStatusInfos1()" id="button_s2">还原所有构件</button>-->
        <!--    <button type="button" @click="SetSubArrayStatusInfo0()" id="button_A0">设置构件颜色</button>-->
        <!--    <button type="button" @click="SetSubArrayStatusInfo()" id="button_A1">隐藏一批构件</button>-->
        <!--    <button type="button" @click="SetSubArrayStatusInfo1()" id="button_A2">还原一批构件</button>-->
        <!--    <button type="button" @click="SetElementsInvalidByIds()" id="button_A1">设置一批构件无效</button>-->
        <!--    <button type="button" @click="SetAllElementsInvalid()" id="button_A2">设置所有构件无效</button>-->
        <!--    <button type="button" @click="Function_SetSceHugeObjVisible()" id="button_red10">模型隐藏</button>-->
        <!--    <button type="button" @click="Function_SetSubObjFlickerBegin()" id="button_red11">闪烁准备</button>-->
        <!--    <button type="button" @click="Function_AddFlickerSubObjects()" id="button_red12">添加闪烁构件</button>-->
        <!--    <button type="button" @click="Function_SetSubObjFlickerEnd()" id="button_red13">闪烁</button>-->
        <!--    <button type="button" @click="Function_CreateSnapShootInMem()" id="button_red14">截屏</button>-->
        <!--    <input id="CapText" type="text" />-->
        <!--    <input id="SubmitText" type="button" value="提交输入" @click="SubmitText_onclick()" />-->
        <!--    <input id="SaveText" type="button" value="保存标注" @click="SaveText_onclick()" />-->
        <!--    <button type="button" @click="Function_ShowSnapshotOrMarkerInMem()" id="button_red3">还原标注</button>-->
        <!--    <input id="AddSymbol" type="text" placeholder="SymbolText" />-->
        <!--    <input id="SymbolName" type="text" placeholder="SymbolName" />-->
        <!--    <input id="SaveSymbol" type="button" value="保存标记" @click="SaveSymbol_onclick()" />-->
        <!--    <input id="ExitSymbol" type="button" value="结束添加" @click="ExitSymbol_onclick()" />-->
        <!--    <input id="DeleteSymbol" type="button" value="删除标记" @click="DeleteSymbol_onclick()" />-->
        <!--    <input id="hiddbut" type="button" value="隐藏按钮" @click="HidButton_onclick()" />-->
        <!--    <input id="editresourcebut" type="button" value="编辑资源" @click="EditResourceButton_onclick()" />-->
        <!--    <input id="moveresourcebut" type="button" value="移动资源" @click="MoveResourceButton_onclick()" />-->
        <!--    <input id="trans_text" type="text" placeholder="模型偏移值" />-->
        <!--    <button type="button" @click="Function_MoveResourceById()" id="button6">模型偏移</button>-->
        <!--    <button type="button" @click="roaming(['1_1143','1_1134','1_430'])" id="button_red17">漫游</button>-->
        <!--    <button-->
        <!--      type="button"-->
        <!--      @click="locationRoaming('514822,2.6484e+006,2549.3,0.424708,-0.17592,-0.339851,0.820473')"-->
        <!--      id="button_red18"-->
        <!--    >坐标漫游</button>-->
    </div>
</template>
<script>
    import LeftTool from "@/components/DaCheng/LeftToolBar";

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
                    {SymbolName: "测试1", SymbolText: "测试1", x: 516556.90625, y: 2651675.25, z: 58.63468933105469},
                    {SymbolName: "测试2", SymbolText: "测试2", x: 516904.625, y: 2650589, z: 58.186588287353516},
                    {SymbolName: "测试3", SymbolText: "测试3", x: 517818.84375, y: 2649800.5, z: 65.99507904052734},
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
        components: {
            LeftTool
        },
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
                uFileID,
                uObjSubID,
                fObjSelX,
                fObjSelY,
                fObjSelZ,
                fObjBVMinX,
                fObjBVMinY,
                fObjBVMinZ,
                fObjBVMaxX,
                fObjBVMaxY,
                fObjBVMaxZ
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
            },
            // 获取构件信息
            Function_GetElementBox() {
                var Text = document.getElementById("EleBox");
                var m = this.objOcx.GetHugeObjSubAABB(Text.value);
                alert(m);
            },
            // 通过状态设置颜色，需要传入一个数组，数组中可以包含多个对象，每个对象中包含 构件ID：strObjName 和 状态：state
            SetColor(obj) {
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].state === -1) {
                        this.objOcx.SetSubArrayClrInfo(
                            obj[i].strObjName,
                            169,
                            169,
                            169,
                            150.0
                        );
                    } else if (obj[i].state === 0) {
                        // console.log(typeof obj[i].strObjName);
                        this.objOcx.SetSubArrayClrInfo(
                            obj[i].strObjName,
                            222.0,
                            184.0,
                            135.0,
                            150.0
                        );
                    } else if (obj[i].state === 1) {
                        this.objOcx.SetSubArrayClrInfo(
                            obj[i].strObjName,
                            152,
                            251,
                            152,
                            150.0
                        );
                    }
                }
            },
            // 获取相机位置信息
            Function_GetCamLocation() {
                var cameralocation = document.getElementById("cameralocation");
                cameralocation.value = this.objOcx.GetCamLocation();
                console.log(cameralocation.value);
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
            // 定位构件
            Function_FocusCameraToComponent() {
                if (arguments[0]) {
                    this.objOcx.FocusCameraToComponent(arguments[0], 3.0);
                    // 定位之后判断状态
                    var objId = [{strObjName: arguments[0], state: 0}];
                    this.SetColor(objId);
                } else {
                    var compId = document.getElementById("ComId").value;
                    // console.log(compId);
                    this.objOcx.FocusCameraToComponent(compId, 3.0);
                    // 定位之后判断状态
                    var objId = [{strObjName: compId, state: 0}];
                    this.SetColor(objId);
                }
            },
            // 设置所有构件颜色
            Function_SetAllSubClrInfos() {
                this.objOcx.SetAllSubClrInfos(100.0, 149.0, 237.0, 50.0);
            },
            // 隐藏所有构件
            SetAllSubStatusInfos() {
                this.objOcx.SetAllSubStatusInfos(0);
            },
            // 还原所有构件
            SetAllSubStatusInfos1() {
                this.objOcx.SetAllSubStatusInfos(1);
            },
            // 隐藏一批构件
            SetSubArrayStatusInfo() {
                this.objOcx.SetSubArrayStatusInfo("1_1143,1_581", 0);
            },
            // 还原一批构件
            SetSubArrayStatusInfo1() {
                this.objOcx.SetSubArrayStatusInfo("1_1143,1_581", 1);
            },
            // 设置构件颜色
            SetSubArrayStatusInfo0() {
                var objId = "1_1143";
                this.objOcx.SetSubArrayClrInfo("1_1143", 255, 99, 71, 100.0);
            },
            // 设置一批构件无效
            SetElementsInvalidByIds() {
                this.objOcx.SetElementsInvalidByIds("1_1143");
            },
            // 设置所有构件无效
            SetAllElementsInvalid() {
                this.objOcx.SetAllElementsInvalid();
            },
            // 模型隐藏
            Function_SetSceHugeObjVisible() {
                this.objOcx.SetSceHugeObjVisible(false);
            },
            // 闪烁准备
            Function_SetSubObjFlickerBegin() {
                this.objOcx.SetSubObjFlickerBegin(
                    6,
                    1000,
                    0.0,
                    250.0,
                    0.0,
                    250.0,
                    0.0,
                    100.0,
                    0.0,
                    250.0
                );
            },
            // 添加闪烁构件
            Function_AddFlickerSubObjects() {
                this.objOcx.AddFlickerSubObjects("1_1143");
                this.objOcx.AddFlickerSubObjects("1_581");
            },
            // 闪烁
            Function_SetSubObjFlickerEnd() {
                this.objOcx.SetSubObjFlickerEnd();
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
                console.log("SymbolText.value:" + SymbolText);
                console.log(this.sym_x, this.sym_y, this.sym_z);
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
            // 编辑资源
            EditResourceButton_onclick() {
                this.objOcx.SetCurrentSelectModel(1);
            },
            // 移动资源
            MoveResourceButton_onclick() {
                var resourceId = this.objOcx.GetSelectFileModelIds();
                console.log(resourceId);
                this.objOcx.MoveResourceById(resourceId, 20.0, 30.0, 40.0);
            },
            // 移动资源
            Function_MoveResourceById() {
                var Text1 = document.getElementById("trans_text");
                var resourceId = this.objOcx.GetSelectFileModelIds();
                var splitArray = new Array();
                var string = Text1.value;
                var regex = ",";
                splitArray = string.split(regex);
                //偏移某个资源文件   （场景初始化 ->  -1）
                this.objOcx.MoveResourceById(
                    resourceId,
                    splitArray[0],
                    splitArray[1],
                    splitArray[2]
                );
            },
            // 根据构件进行漫游
            roaming(arr) {
                for (let i = 0; i < arr.length; i++) {
                    setTimeout(() => {
                        console.log(i, arr[i]);
                        var objId = [{strObjName: arr[i], state: 0}];
                        this.SetColor(objId);
                        this.objOcx.FocusCameraToComponent(arr[i], 3.0);
                    }, 2000 * i);
                }
            },
            // 坐标漫游
            locationRoaming() {
                var arr = [
                    "516024,2650820,672.448,0.424708,-0.17592,-0.339851,0.820473",
                    "516271,2650120,693.158,0.424708,-0.17592,-0.339851,0.820473",
                    "516767,2649850,515.511,0.424708,-0.17592,-0.339851,0.820473"
                ];
                let that = this;
                for (let i = 0; i < arr.length; i++) {
                    setTimeout(function () {
                        // that.objOcx.LocateCamTo(arr[i]);
                        that.objOcx.LocateCamToAnimation(arr[i]);
                    }, 1200 * i);
                }
                that.objOcx.SetBackGroundColor(0.0, 0.0, 0.0, 150.0);
            },
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
