
/***
 *
 *@邓水雄
 *@用于操作canvas绘图
 */

/*********全局变量*******************/

    var Global = {
        canvas:null,
        ctx:null,
        gra:null
    }

    Global.canvas = document.getElementById("canvas");
    Global.ctx = Global.canvas.getContext('2d');
    Global.gra = new Graph();

//必须对canvas的长度和宽度赋值成css中的宽度和长度，否则会导致绘画失败
//赋值的另外一个功能是擦除画布上原有的东西

    Global.canvas.width = 600;
    Global.canvas.height = 550;



//分割字符串，将字符串转换成数组

    var splitStr = function(str) {

        var a = str.split(",");

        return a;

    }

//随机生成要绘制的点的坐标

    var drawPoint = function(x,y) {

        var point = {
            x:0,
            y:0
        }

        point.x = x + Math.ceil(Math.random() * 500);
        point.y = y + Math.ceil(Math.random() * 410);
        return point;
    }


//绘制图形和文字
    var drawGraph = function(x,y,label,state) {

            Global.ctx.beginPath();
            Global.ctx.arc(x,y,20,0,Math.PI * 2.0,true);
            Global.ctx.closePath();
            Global.ctx.fillStyle = 'rgba(100,255,100,0.8)';
            if(!state){
                Global.ctx.fillStyle = '#5B8293';
            }
            if(state === 2){
                Global.ctx.fillStyle = '#D25D65';
            }
            Global.ctx.fill();
            Global.ctx.fillStyle = '#ffffff';
            Global.ctx.font="bold 14px sans-serif";
            Global.ctx.fillText(label,x-12,y+5);

    }


//绘制两个圆心之间的直线

    var drawLine = function(vertexA,vertexB,state) {

       Global.ctx.moveTo(vertexA.x,vertexA.y);
       Global.ctx.lineTo(vertexB.x,vertexB.y);
        Global.ctx.strokeStyle = 'rgba(100,255,100,0.8)';
        if(!state){
            Global.ctx.strokeStyle = '#ffffff';
        }
        Global.ctx.stroke();
    }
//
   // setTimeout(function() {
   //   var B =  drawPoint(50,100);
   //   setTimeout(function(){
   //     drawLine(A,B);
   //   },200)
   //},500);

//创建图的顶点

var creatG = function(s){

    var Length = s.length;
    Global.canvas.width = 600;
    Global.canvas.height = 530;
    for(var i = 0;i < Length; ++i){

        Global.gra.addVertex(s[i]);
        var point = drawPoint(50,100);
        Global.gra.setPoint(i,point);
        drawGraph(point.x,point.y,s[i],true);

    }
};




//清空画布

var Destroy = function(){

    Global.gra.DestroyGraph();
    Global.canvas.width = 600;
    Global.canvas.height = 530;

};

//输入顶点名称获取顶点信息

var Locate = function(s) {

   var i =  Global.gra.LocateVex(s[0]);
   if(!i&&i!=0){
        alert("当前顶点不存在!");
        return;
   }

   var Label = "当前顶点是"+Global.gra.vertexList[i].label + "\n";
   var X = "x:"+Global.gra.vertexList[i].point.x +"\n";
   var Y = "Y:" + Global.gra.vertexList[i].point.y +"\n";
   alert(Label + X + Y);

};

//输入编号获取顶点信息

var Get = function(s){
    var vertex = Global.gra.GetVex(s);
    if(!vertex){

        alert("当前顶点不存在!");
        return;

    }
    var Label = "当前顶点是" + vertex.label + "\n";
    var X = "x:" + vertex.point.x + "\n";
    var Y = "Y:" + vertex.point.y + "\n";
    alert(Label + X + Y);

};

//修改顶点的标签

var changeLabel = function(s){
    var vertex = Global.gra.PutVex(s[0],s[1]);
    if(!vertex){
        alert("该顶点不存在");
    }
    drawGraph(vertex.point.x,vertex.point.y,vertex.label,true);

};

//寻找第一个邻接顶点
var showFirst = function(s){
    var vertex = Global.gra.FirstAdjVex(s[0]);
    if(!vertex){
        alert("没有找邻接顶点");
        return;
    }
    var Label =s+ "的邻接顶点是" + vertex.label +"\n";
    var X = '坐标是' + vertex.point.x +"\n";
    var Y = '     ' + vertex.point.y +"\n";
    alert(Label+X+Y);
};


//寻找两点之间的邻接点

var showNext = function(s) {

    var vertex = Global.gra.NextAdjVex(s[0],s[1]);
    if(!vertex){
        alert("没有找邻接顶点");
        return;
    }
    var Label =s[0]+"的"+s[1]+ "的邻接顶点是" + vertex.label +"\n";
    var X = '坐标是'+ '\n' +'X:' + vertex.point.x +"\n";
    var Y = '     Y:' + vertex.point.y + "\n";
    alert(Label+X+Y);

};

//添加新顶点
var addNewVer = function(s) {

    Global.gra.addVertex(s[0]);
    var point = drawPoint(50,100);
    Global.gra.setPoint(Global.gra.length-1,point);
    drawGraph(point.x,point.y,s[0],true);

};

//删除顶点

var DeleteV = function(s) {
    var i = Global.gra.LocateVex(s[0]);
    if(!i&&i!==0){
        alert("要删除的顶点不存在!");
        return;
    }
    Global.gra.DeleteVex(i);
    RepaintGraph();

};


//绘制两点之间的弧
var drawArc = function(s) {

    var i = Global.gra.LocateVex(s[0]);
    var j = Global.gra.LocateVex(s[1]);
    Global.gra.addSide(i,j);
    drawLine(Global.gra.vertexList[i].point,Global.gra.vertexList[j].point,true);

};


//删除顶点间的弧

var DeleteA = function(s){

    var A = Global.gra.LocateVex(s[0]);
    var B = Global.gra.LocateVex(s[1]);
    if(!A&&A!==0){
        alert("没有找到"+s[0]+"顶点");
        return;
    }
    if(!B&&B!==0){
        alert("没有找到"+s[1]+"顶点");
        return;
    }

    Global.gra.DeleteArc(A,B);

    RepaintGraph();

};


//深度优先遍历演示
var DFSTraverse = function(s) {
    var i = Global.gra.LocateVex(s[0]);
    if(!i&&i!=0){
        alert("该顶点不存在!");
        return;
    }
    $("a").remove();
    var Length = Global.gra.length;
    for(var j = 0; j < Length; ++j){
        Global.gra.vertexList[j].wasVisited = false;
    }
    Global.gra.dfs(i);
};

//
var throttle = function(v) {

    var vertex = Global.gra.vertexList[v];
    drawGraph(vertex.point.x,vertex.point.y,vertex.label,false);
    printLabel(vertex);
};

var printLabel = function(vertex) {
    $("canvas").after("<a>"+vertex.label+"-->"+"</a>");

};


//广度优先遍历算法的演示

var BFSTraverse = function(s) {

    var i = Global.gra.LocateVex(s[0]);
    if(!i&&i!=0){
        alert("该顶点不存在!");
        return;
    }
    $("a").remove();
    var Length = Global.gra.length;
    for(var j = 0; j < Length; ++j){
        Global.gra.vertexList[j].wasVisited = false;
    }
    Global.gra.dfs_Queue(i);
};


//重新绘制整个图

var RepaintGraph = function() {

    var adjMat = Global.gra.adjMat;
    var Length = Global.gra.length;
    var vertexList = Global.gra.vertexList;

    //清空画布准备重绘

    Global.canvas.width = 600;
    Global.canvas.height = 530;
    for(var j = 0; j < Length; ++j){
        drawGraph(vertexList[j].point.x,vertexList[j].point.y,vertexList[j].label,true);
    }

    for(var i = 0; i < Length; ++i){
        for(var j = 0; j < Length; ++j){
            if(adjMat[i][j] === 1){
                drawLine(vertexList[i].point,vertexList[j].point,true);
            }
        }
    }


};




  (function(){

    $(document).ready(function(){

        $("button").click(function(){

            var Id = $(this).attr('id');
            var text = $(this).parent().prev().val();
            if(text && Id !== '11'){

                var textStr = splitStr(text);

           }
            if(!text && Id!=='11'){
                   alert("输入不能为空！");
                   return;
            }
            switch(Id){

                case '1': creatG(textStr);break;
                case '2': Locate(textStr);break;
                case '3': Get(parseInt(textStr));break;
                case '4': changeLabel(textStr);break;
                case '5': showFirst(textStr);break;
                case '6': showNext(textStr);break;
                case '7': addNewVer(textStr);break;
                case '8': DeleteV(textStr);break;
                case '9': drawArc(textStr);break;
                case '10': DeleteA(textStr);break;
                case '11': Destroy();break;
                case '12': DFSTraverse(textStr);break;
                case '13': BFSTraverse(textStr);break;
                default: break;
        }


        });
    }
    );

})();

