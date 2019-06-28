cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.node_;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;    //碰撞框
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    },

    setnode: function (node) {
        this.node_ = node;
        // console.log(this.node_);
    },


    onCollisionEnter: function (other, self) {
        if (other.node.group == "monster") {
            other.node.getComponent("Monster").sendpnode(this.node_);
            // if (this.node_.tag == other.node.tag) {
            //     other.node.getChildByName("ProgressBar").active = true;
            //     self.node.destroy();
            //     this.monster_hp=other.node.getComponent("Monster").hp;
            //     this.monster_hp--;
            //     console.log(this.monster_hp);
            // }
        }
        else if (other.node.group == "zhangai") {
            other.node.getComponent("pzhangai").sendpnode(this.node_);
            // if (this.node_.name == other.node.name) {
            //     other.node.getChildByName("ProgressBar").active = true;
            //     self.node.destroy();
            // }
        }
    },

    onCollisionStay: function (other, self) {

    },

    onCollisionExit: function (other, self) {

    },

    start() {
        // console.log(this.node_.tag);
        var pos1 = this.node_.convertToWorldSpaceAR(cc.Vec2(this.node_.x, this.node_.y));
        this.pos = this.node.parent.convertToNodeSpaceAR(cc.v2(pos1.x, pos1.y));
        var aaa = cc.moveTo(0.2, cc.p(this.pos.x, this.pos.y));
        this.node.runAction(aaa);
    },

    update() {

    },

});



/*子弹碰撞
1.子弹和怪物发生碰撞，子弹消失，怪物掉血
2.子弹从炮塔上出发，移动到怪物上
炮塔位置：
怪物位置（怪物会移动）：
两个位置所在坐标不同
*/