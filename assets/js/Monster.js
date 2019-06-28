cc.Class({
    extends: cc.Component,

    properties: {
        prefab_Pbottle: cc.Prefab,
        hp: 0,
    },

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;    //碰撞框
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        this.num = 0;
        // this.hp = 6;
    },

    sendpnode: function (node) {
        this.pnode = node;
    },

    onCollisionEnter: function (other, self) {

    },

    onCollisionStay: function (other, self) {
        //打怪物 
        if (other.node.group == "pbottle") {
            if (this.pnode.tag == self.node.tag) {
                self.node.getChildByName("ProgressBar").active = true;
                other.node.destroy();
                this.num++;
                var p = self.node.getChildByName("ProgressBar").getComponent(cc.ProgressBar);
                p.progress = 1 - this.num / this.hp;
                if (this.num >= this.hp) {
                    self.node.destroy();
                    this.num = 0;
                }
            }
        }
    },

    onCollisionExit: function (other, self) {

    },

    click_monster: function (event) {
        if (event.target.getChildByName("tag").active == true) {
            event.target.getChildByName("tag").active = false;
            return;
        }
        else {
            for (var i = 0; i < this.node.parent.childrenCount; i++) {
                this.node.parent.children[i].getChildByName("tag").active = false;
            }
            for (var i = 0; i < this.node.parent.parent.getChildByName("zhangai").childrenCount; i++) {
                this.node.parent.parent.getChildByName("zhangai").children[i].getChildByName("tag").active = false;
            }
            event.target.getChildByName("tag").active = true;
        }
    },

    update() {

    },

    start() {

    },

});



/*
1.坐标系转换 
2.子弹生成在怪物身上，即子弹为怪物子节点 moveto最终坐标为父节点（0.0）
3.子弹一次只打一只怪物
4.对碰撞内的怪物排队列 先进先出 始终打队列第一个怪物 

*/