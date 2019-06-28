cc.Class({
    extends: cc.Component,

    properties: {
        // hp:10,
    },

    onload() {
        this.num = 0;
        this.hp=10;
    },

    click_zhangai: function (event) {
        if (event.target.getChildByName("tag").active == true) {
            event.target.getChildByName("tag").active = false;
            return;
        }
        for (var i = 0; i < this.node.childrenCount; i++) {
            this.node.children[i].getChildByName("tag").active = false;
        }
        for (var i = 0; i < this.node.parent.getChildByName("monster").childrenCount; i++) {
            this.node.parent.getChildByName("monster").children[i].getChildByName("tag").active = false;
        }
        event.target.getChildByName("tag").active = true;
    },
    
    start() {

    },

});
