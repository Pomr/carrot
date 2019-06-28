cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    click_btn:function(){
        //event.target
       cc.director.loadScene("Game");  //按钮转换界面->Game
    },
    start () {

    },

    // update (dt) {},
});
