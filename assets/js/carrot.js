cc.Class({
    extends: cc.Component,

    properties: {
        carrothp: 0,
        p9: cc.SpriteFrame,
        p87: cc.SpriteFrame,
        p64: cc.SpriteFrame,
        p32: cc.SpriteFrame,
        p1: cc.SpriteFrame,
    },

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;    //碰撞框
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    },

    onCollisionEnter: function (other, self) {  //产生碰撞时
        other.node.destroy();
        var anim = self.node.getComponent(cc.Sprite);     //获取主键
        this.carrothp--;
        if (this.carrothp == 9) {
            anim.spriteFrame = this.p9;
        }
        else if (this.carrothp < 9 && this.carrothp > 6) {
            anim.spriteFrame = this.p87;
        }
        else if (this.carrothp < 7 && this.carrothp > 3) {
            anim.spriteFrame = this.p64;
        }
        else if (this.carrothp < 4 && this.carrothp > 1) {
            anim.spriteFrame = this.p32;
        }
        else if (this.carrothp == 1) {
            anim.spriteFrame = this.p1;
        }
        else if (this.carrothp <= 0) {
            //游戏结束
        }
        // console.log(carrothp);
    },
    onCollisionStay: function (other, self) { //产生碰撞后

    },

    btn_shake: function () {
        if (this.carrothp == 10) {
            var anim = this.getComponent(cc.Animation);
            anim.play();
        }
    },

    start() {

    },
    update() {
        this.node.getChildByName("blood").getComponent(cc.Label).string = this.carrothp;
    }

});
