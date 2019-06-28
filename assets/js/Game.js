cc.Class({
    extends: cc.Component,

    properties: {
        target: cc.Prefab,
        node_monster: cc.Node,
        pre_tower: cc.Prefab,
    },

    click_createtower: function (event, customEvenDate) {
        var t = cc.instantiate(this.pre_tower);
        event.target.addChild(t); //点击发生的事件所在的button的节点
        // t.getComponent("Tower").setParent(node);
        // console.log("aaa");
    },

    onLoad() {
        //tag的赋值
        this.no = 1;
        // 以秒为单位的时间间隔
        var interval = 1.5;
        // 重复次数
        var repeat = 10;
        // 开始延时
        var delay = 0;
        this.schedule(function () {
            var node = cc.instantiate(this.target);  //设置一个预制（Prefab）并通过 cc.instantiate 生成节点
            this.node_monster.addChild(node);            //添加一个孩子节点
            var anim = node.getComponent(cc.Animation);
            anim.play();
            node.tag = this.no;
            this.no++;
        }.bind(this), interval, repeat, delay);
    },

    start() {

    },

    // update (dt) {},
});
