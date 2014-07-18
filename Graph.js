

/**********定义一个顶点**********/

var Vertex = function(label) {

   //顶点的名字或者标签

    this.label = label;

    //是否访问过

    this.wasVisited = false;

    //当前的坐标
    this.point = {

        x:0,
        y:0
    }


}


/*****************定义一个栈***************/

    var Stack = function() {

        this.array = new Array();

        //相当与栈顶指针

        this.top = -1;

    }

//栈的push方法,压栈

    Stack.prototype.push = function(obj) {

        this.array[++this.top] = obj;

    }

//栈的peek方法，返回栈顶元素

    Stack.prototype.peek = function() {

        return this.array[this.top];

    }

//栈的pop方法，删除并返回栈顶元素

    Stack.prototype.pop = function() {

        if(this.top < 0)
            this.top = 0;
        return this.array[this.top--];

    }

//检测栈是否为空

    Stack.prototype.isEmpty = function() {


        return this.length == -1;

    }





/********************定义一个队列****************************/

var Queue = function() {

    this.array = new Array();
    this.head = 0;
    this.rear = -1;

}

//往队尾添加元素

    Queue.prototype.Enqueue = function(obj) {

       return  this.array[++this.rear] = obj;

    }

//删除队列元素
    Queue.prototype.Dequeue = function() {

       return  this.array[this.head++];

    }




/**********定义一个图*********/

var Graph = function() {

    //最大的顶点矩阵容量

    this.Max_Vertex = 30;

    //顶点的数组

    this.vertexList = new Array();

    //当前的的顶点数

    this.length = 0;

    //顶点的边的数组

    this.adjMat = [];

    for (var i = 0; i < this.Max_Vertex ; ++i) {

        //在数组中添加[]使其变为二维数组

        this.adjMat.push([]);

        for(var j = 0; j < this.Max_Vertex; ++j){

            this.adjMat[i][j] = 0;

        }
    }
}


/********添加顶点和边********/

//添加顶点

Graph.prototype.addVertex = function(label) {

    var vertex = new Vertex(label);

    this.vertexList.push(vertex);

    this.length++;
}

//添加邻接矩阵的边

Graph.prototype.addSide = function(start,end) {

    //邻接矩阵赋值
    if(start != end){

         this.adjMat[start][end] = 1;
         this.adjMat[end][start] = 1;

    }
}

//给顶点坐标赋值
Graph.prototype.setPoint = function(n,point){

    this.vertexList[n].point.x = point.x;
    this.vertexList[n].point.y = point.y;
}



/*****************创建图**********************/

Graph.prototype.GreatGraph = function() {



}


/*****************销毁图*******************/

Graph.prototype.DestroyGraph = function() {

    this.vertexList = [];
    this.length = 0;
    this.adjMat = [];

    for (var i = 0; i < this.Max_Vertex ; ++i) {

        //在数组中添加[]使其变为二维数组

        this.adjMat.push([]);

        for(var j = 0; j < this.Max_Vertex; ++j){

            this.adjMat[i][j] = 0;

        }
    }

}

/****************查找某个顶点的位置********************/
//返回其在图中的位置

Graph.prototype.LocateVex = function(label) {

    var length = this.vertexList.length;
    var vertexList = this.vertexList;
    for(var i = 0; i < length; ++i){

        if(vertexList[i].label === label){

            return i;
        }
    }
    return false;
}

/*****************找到某个顶点的值***************************/
//输入编号找到某个顶点，并输出这个顶点的值

Graph.prototype.GetVex = function(n) {

    if(n > this.length)
        return false;
    return this.vertexList[--n];
}


/*****************对图中的某个顶点进行赋值****************************/

Graph.prototype.PutVex = function(label,value) {

    var i = this.LocateVex(label);
    if((i+1)){

        this.vertexList[i].label = value;
        return this.vertexList[i];
    }
    return false;

}


/*****************求某个顶点的第一个邻接顶点****************************/

Graph.prototype.FirstAdjVex = function(label) {

    var adjMat = this.adjMat;
    var length = this.vertexList.length;
    var i = this.LocateVex(label);

    if(i==0 || i){
        for(var k = 0; k < length; ++k){

            if(adjMat[i][k] == 1){
                return this.vertexList[k];
            }
        }

    }
    return false;
}

/******************返回下一个邻接顶点************************/

Graph.prototype.NextAdjVex = function(labelv,labelw) {

    var adjMat = this.adjMat;
    var length = this.length;
    var i = this.LocateVex(labelv);
    var j = this.LocateVex(labelw);

    if((i+1) && (j+1)){
        for(var k = j + 1; k < length; ++k){

            if(adjMat[i][k] == 1){
                return this.vertexList[k];
            }

        }
    }

    return false;

}


/******************新增加一个顶点***************************/

Graph.prototype.InsertVex = function(label) {

    this.addVertex(label);
}


/******************删除某个顶点**************************/

Graph.prototype.DeleteVex = function(index) {

    this.vertexList.splice(index,1);
    var Length = this.length;

    //删除列
     for(var j = index; j < Length-1; ++j){

        for(var k = 0; k < Length; ++k){

            this.adjMat[k][j] = this.adjMat[k][j+1];
        }

    }
    //删除行

    for(var j = index; j < Length-1; ++j){

        for(var k = 0; k < Length; ++k){

            this.adjMat[j][k] = this.adjMat[j+1][k];
        }

    }

    this.length--;

}

/******************在两个顶点之间增加对称弧********************/

Graph.prototype.InsertArc = function(labelv,labelw) {

    var i = this.LocateVex(labelv);
    var j = this.LocateVex(labelw);
    if((i+1) && (j+1)){

        this.addSide(i,j);
    }

}


/******************删除两个顶点之间的弧*******************************/

Graph.prototype.DeleteArc = function(va,vb) {

        this.adjMat[va][vb] = 0;
        this.adjMat[vb][va] = 0;

}



/**********运用栈的深度优先遍历算法********/
/*****
 *1.访问一个邻接点未访问的顶点，标记并访问，然后压入栈
 *2.如果1无法执行就弹出一个顶点，然后继续进行1
 *3.如果1和2无法执行就结束遍历,利用栈进行操作
 * /
 *****/

Graph.prototype.dfs_Stack = function(v) {


    //访问的第一个顶点入栈

    if(this.length == 0)
        return;

    var vertexStack = new Stack();

    this.vertexList[v].wasVisited = true;

    this.vertexList[v].Display();

    vertexStack.push(v);

    var node = v;

    var count = 1;

    var adjMat = this.adjMat;

    var vertexList = this.vertexList;

    var max_length = this.length;

    while(count < max_length){

        //所有被访问的结点依次入栈，当node没有下一个结点时，才使用出栈。

        for(var j = 0; j < max_length; ++j){

             if(adjMat[node][j] == 1 && !vertexList[j].wasVisited){

                     this.vertexList[j].wasVisited = true;
                     this.vertexList[j].Display();
                     count++;
                     vertexStack.push(j);
                     break;

             }

         }

         if(j == max_length){

            //与node相连的节点已经被访问，pop返回node的上一个结点，看是否有相连节点未被访问

            node = vertexStack.pop();

         }
         else{

            //继续找到与node相连且未被访问的节点

             node = j;

         }

    }

}
/******************递归的深度优先遍历算法**********/

Graph.prototype.dfs = function(v) {

    this.vertexList[v].wasVisited = true;
    throttle(v);
    var adjMat = this.adjMat;

    var col = this.length;

    var vertexList = this.vertexList;

    for(var j = 0;j < col; ++j){

        if(adjMat[v][j] == 1 && !vertexList[j].wasVisited){

                this.dfs(j,this.length);
        }
    }

}

/**********************图的广度优先遍历算法,运用队列实现**********************************/
/*****
*1.访问当前的所有邻接点，标记并进入对列
*2.若访问完毕则从队列中取出一点继续访问
*
* ******/

Graph.prototype.dfs_Queue = function(v) {


    //访问的第一个顶点入对列

    if(this.length == 0)
        return;

    var vertexQueue = new Queue();

     this.vertexList[v].wasVisited = true;
    var vertex = this.vertexList[v];

    drawGraph(vertex.point.x,vertex.point.y,vertex.label,2);

    printLabel(vertex);

     vertexQueue.Enqueue(v);

    var node = v;

    var max_length = this.length;

    var count = 1;

    var adjMat = this.adjMat;

    var vertexList = this.vertexList;

    while(count < max_length){

        for(var i = 0;i < max_length ;i++){

            if(adjMat[node][i] == 1 && !vertexList[i].wasVisited){

                vertexList[i].wasVisited = true;
                var vertex = vertexList[i];
                drawGraph(vertex.point.x,vertex.point.y,vertex.label,2);
                 printLabel(vertex);
                count++;
                vertexQueue.Enqueue(i);
            }
        }

        node = vertexQueue.Dequeue();

    }

}







/**********测试函数******/


//        var g = new Graph(10);
//
//        //添加顶点
//
//        g.addVertex("A");
//        g.addVertex("B");
//        g.addVertex("C");
//        g.addVertex("D");
//        g.addVertex("E");
//        g.addVertex("F");
//        g.addVertex("G");
//        g.InsertVex("H");
//       //添加边
//
//        g.addSide(0,1);//AB
//        g.addSide(0,2);//AC
//        g.addSide(1,3);//BD
//        g.addSide(1,4);//BE
//        g.addSide(3,4);//DE
//        g.addSide(3,6);//
//        g.addSide(5,6);
//        g.addSide(0,7);
//
////        g.dfs(3,5);
//
////        g.dfs_Stack(3,5);
//
////       alert(g.GetVex(10));
//
////        g.PutVex("A","a");
//        g.DeleteArc("B","D");
//        g.DeleteArc("A","B");
//        g.DeleteArc("B","E");
////        g.InsertArc("B","F");
//        g.dfs_Queue(3);
////        alert(g.NextAdjVex("A","C"));
//
