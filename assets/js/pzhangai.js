cc.Class({
    extends: cc.Component,

    properties: {
        hp: 0,
    },
    onLoad() {
        this.num = 0;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;    //碰撞框
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;

    },

    sendpnode: function (node) {
        this.pnode = node;
    },

    onCollisionEnter: function (other, self) {
        if (other.node.group == "pbottle") {
            if (this.pnode.name == self.node.name) {
                self.node.getChildByName("ProgressBar").active = true;
                other.node.destroy();
                this.num++;
                //         console.log(this.num);
                var p = this.node.getChildByName("ProgressBar").getComponent(cc.ProgressBar);
                p.progress = 1 - this.num / this.hp;
                if (this.num >= this.hp) {
                    self.node.destroy();
                    this.num = 0;
                }
            }
        }
    },

    onCollisionStay: function (other, self) {
    },

    onCollisionStay: function (other, self) {
    },

    start() {

    },

    update(dt) {

    },
});
