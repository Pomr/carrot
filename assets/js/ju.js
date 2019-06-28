
cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    jump:function(even,CustomEventDate){
        var anim=this.getComponent(cc.Animation);
        anim.play();
        // anim.setCurrentTime(5);
        console.log(CustomEventDate);
    },

    start () {

    },

});
