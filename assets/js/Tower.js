cc.Class({
    extends: cc.Component,

    properties: {
        pre_bottle: cc.Prefab,
    },

    click_destroy: function () {
        this.node.destroy();
    },

    clicl_build: function () {
        var Tower = cc.instantiate(this.pre_bottle);
        this.node.parent.addChild(Tower);
        // this.parentNode.addChild(Tower)
        this.node.destroy();
    },
    setParent: function (parentNode) {
        this.parentNode = parentNode
    },

    start() {

    },

});
