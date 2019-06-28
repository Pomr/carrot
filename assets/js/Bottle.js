cc.Class({
    extends: cc.Component,

    properties: {
        sprite_bottlem: cc.SpriteFrame,
        sprite_bottlel: cc.SpriteFrame,
        prefab_pbottle: cc.Prefab,
    },

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;    //碰撞框
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        this.state = 0;
        this.most = [];
        this.zh = []
        this.schedule(function () {    //每隔   执行一次。
            this.isFire = true;
        }, 1);
        this.kaiguan = true;
    },

    click_bottle: function (event) {  //按炮塔时的操作
        //将炮台位置移动到 updown节点下 该坐标为bottle_updown所在位置 
        var c = this.node.getChildByName("Bottle01");
        var d = this.node.getChildByName("Bottle00");
        // console.log(this.state);
        if (this.state == 2) {
            c.active = false;
            d.active = true;
            this.state++;

        }
        else if (this.state == 3) {
            c.active = false;
            d.active = false;
            this.state--;
        }
        else {
            c.active = true;
            d.active = true;
        }
    },

    click_up: function () {
        var c = this.node.getChildByName("Bottle01");
        var d = this.node.getChildByName("Bottle00");
        // c.active = true;
        // d.active = true;
        var b = this.node.getChildByName("Bottle11");
        var m = b.getComponent(cc.Sprite);
        // console.log(this.state);
        if (this.state == 0) {
            // console.log(this.state);
            m.spriteFrame = this.sprite_bottlem;
            this.node.getComponent(cc.CircleCollider).radius = 120;
            c.active = false;
            d.active = false;
        }
        else if (this.state == 1) {
            m.spriteFrame = this.sprite_bottlel;
            this.node.getComponent(cc.CircleCollider).radius = 140;
            c.active = false;
            d.active = false;
            // console.log(this.state);
        }
        // else if (this.state == 2) {
        //     c.active = false;
        //     d.active = false;
        //     // console.log(this.state);
        // }
        this.state++;
        // console.log(this.state);        
    },

    click_down: function (event) {
        this.node.destroy();
    },

    //碰撞
    onCollisionEnter: function (other, self) {
        //怪物队列 添加
        if (other.node.group == "monster") {
            this.most.push(other.node.tag);
            // console.log("初始most："+this.most);
        }
        if (other.node.group == "zhangai") {
            this.zh.push(other.node);
            // console.log("初始zhangai："+this.zh);
        }
    },

    getmonster: function () {
        var monster = cc.director.getScene().getChildByName("Canvas").getChildByName("monster");
        for (var i = 0; i < monster.childrenCount; i++) {
            if (monster.children[i].getChildByName("tag").active == true) {
                for (var j = 0; j < this.most.length; j++) {
                    if (monster.children[i].tag == this.most[j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    },

    getzhangai: function () {
        var zhangai = cc.director.getScene().getChildByName("Canvas").getChildByName("zhangai");
        for (var i = 0; i < zhangai.childrenCount; i++) {
            if (zhangai.children[i].getChildByName("tag").active == true) {
                for (var j = 0; j < this.zh.length; j++) {
                    if (zhangai.children[i] == this.zh[j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    },

    //引进预置资源 炮弹 
    onCollisionStay: function (other, self) {
        var node_Bottle11 = self.node.getChildByName("Bottle11");
        var node_pbottle = other.node.parent.parent.getChildByName("pbottle");
        if (other.node.group == "zhangai") {
            if (this.getzhangai() == true && this.isFire == true) {
                if (other.node.getChildByName("tag").active == true) {
                    //炮台转向
                    var zhangai1 = other.node.convertToWorldSpaceAR(cc.Vec2(other.node.x, other.node.y));
                    var zhangai2 = this.node.convertToNodeSpaceAR(cc.v2(zhangai1.x, zhangai1.y));
                    this.jiaodu;
                    if (zhangai2.x > 0) {
                        if (zhangai2.y > 0) {
                            this.jiaodu = -Math.atan(zhangai2.y / zhangai2.x) * 180 / Math.PI;
                            var rotateTo = cc.rotateTo(0.3, this.jiaodu);
                            node_Bottle11.runAction(rotateTo);
                            //炮弹初始位置
                        }
                        else if (zhangai2.y < 0) {
                            this.jiaodu = Math.atan(Math.abs(zhangai2.y) / zhangai2.x) * 180 / Math.PI;
                            var rotateTo = cc.rotateTo(0.3, this.jiaodu);
                            node_Bottle11.runAction(rotateTo);
                            // node_Bottle11.rotation = jiaodu;
                        }
                    }
                    else if (zhangai2.x < 0) {
                        if (zhangai2.y > 0) {
                            this.jiaodu = -180 + Math.atan(zhangai2.y / Math.abs(zhangai2.x)) * 180 / Math.PI;
                            var rotateTo = cc.rotateTo(0.3, this.jiaodu);
                            node_Bottle11.runAction(rotateTo);
                            // node_Bottle11.rotation = this.jiaodu;
                        }
                        else if (zhangai2.y < 0) {
                            this.jiaodu = 180 - Math.atan(zhangai2.y / zhangai2.x) * 180 / Math.PI;
                            var rotateTo = cc.rotateTo(0.3, this.jiaodu);
                            node_Bottle11.runAction(rotateTo);
                            // node_Bottle11.rotation = this.jiaodu;
                        }
                    }
                    else {//x=0
                        if (zhangai2.y > 0) {
                            var rotateTo = cc.rotateTo(0.3, -90);
                            node_Bottle11.runAction(rotateTo);
                        }
                        if (zhangai2.y < 0) {
                            var rotateTo = cc.rotateTo(0.3, 90);
                            node_Bottle11.runAction(rotateTo);
                        }
                    }
                    if (zhangai2.y == 0) {
                        if (zhangai2.x > 0) {
                            var rotateTo = cc.rotateTo(0.3, 0);
                            node_Bottle11.runAction(rotateTo);
                        }
                        else if (zhangai2.x < 0) {
                            var rotateTo = cc.rotateTo(0.3, 180);
                            node_Bottle11.runAction(rotateTo);
                        }
                    }
                    // if (node_Bottle11.rotation == this.sumjiaodu) {
                    var item = cc.instantiate(this.prefab_pbottle);
                    item.getComponent("pbottle").setnode(other.node);
                    node_pbottle.addChild(item);
                    var pos = self.node.convertToWorldSpaceAR(cc.Vec2(self.node.x, self.node.y));
                    //将 self.node.parent 的 self.node.parent.x,self.node.parent.y 转为世界坐标  世界坐标--canva兄弟     
                    var pos1 = node_pbottle.convertToNodeSpaceAR(cc.v2(pos.x, pos.y));
                    if (zhangai2.x > 0) {
                        if (zhangai2.y > 0) {
                            item.setPosition(pos1.x + this.node.width / 2 * Math.cos(Math.atan(zhangai2.y / zhangai2.x)), 
                            pos1.y + this.node.width / 2 * Math.sin(Math.atan(zhangai2.y / zhangai2.x)));
                        }
                        else if (zhangai2.y < 0) {
                            item.setPosition(pos1.x + this.node.width / 2 * Math.cos(Math.atan(-zhangai2.y / zhangai2.x)), 
                            pos1.y - this.node.width / 2 * Math.cos(Math.atan(-zhangai2.y / zhangai2.x)));
                        }
                    }
                    else if (zhangai2.x < 0) {
                        if (zhangai2.y > 0) {
                            item.setPosition(pos1.x - this.node.width / 2 * Math.cos(Math.atan(zhangai2.y / -zhangai2.x)), 
                            pos1.y + this.node.width / 2 * Math.cos(Math.atan(zhangai2.y / -zhangai2.x)));
                        }
                        else if (zhangai2.y < 0) {
                            item.setPosition(pos1.x - this.node.width / 2 * Math.cos(Math.atan(-zhangai2.y / zhangai2.x)), 
                            pos1.y - this.node.width / 2 * Math.cos(Math.atan(-zhangai2.y / zhangai2.x)));
                        }
                    }
                    else {//x=0
                        if (zhangai2.y > 0) {
                            item.setPosition(pos1.x, pos1.y + this.node.width / 2);
                        }
                        if (zhangai2.y < 0) {
                            item.setPosition(pos1.x, pos1.y - this.node.width / 2);
                        }
                    }
                    if (zhangai2.y == 0) {
                        if (zhangai2.x > 0) {
                            item.setPosition(pos1.x + this.node.width / 2, pos1.y);
                        }
                        else if (zhangai2.x < 0) {
                            item.setPosition(pos1.x - this.node.width / 2, pos1.y);
                        }
                    }
                    //炮塔开始播放打怪动画
                    var anim = node_Bottle11.getComponent(cc.Animation);
                    anim.play(this.state.toString());
                    //炮弹动画
                    var a = 10 + this.state;
                    var anim = item.getComponent(cc.Animation);
                    anim.play(a.toString);
                    this.isFire = false;
                }
                // }
            }
        }
        else if (other.node.group == "monster") {
            if (this.getzhangai() == false) {
                if (this.getmonster() == true) {
                    if (other.node.getChildByName("tag").active == true && this.isFire == true) {
                        // console.log(other.node.position);
                        var item = cc.instantiate(this.prefab_pbottle);
                        item.getComponent("pbottle").setnode(other.node);
                        node_pbottle.addChild(item);
                        var pos = self.node.convertToWorldSpaceAR(cc.Vec2(self.node.x, self.node.y));
                        var pos1 = node_pbottle.convertToNodeSpaceAR(cc.v2(pos.x, pos.y));
                        item.setPosition(pos1.x + node_Bottle11.width / 2, pos1.y);     //炮弹初始位置
                        //炮弹转向     Math.atan(y/x)弧度*180/pai Math.PI 
                        var mos1 = other.node.convertToWorldSpaceAR(cc.Vec2(other.node.x, other.node.y));
                        var mos2 = this.node.convertToNodeSpaceAR(cc.v2(mos1.x, mos1.y));
                        this.jiaodu;
                        if (mos2.x > 0) {
                            if (mos2.y > 0) {
                                this.jiaodu = -Math.atan(mos2.y / mos2.x) * 180 / Math.PI;
                                var rotateTo = cc.rotateTo(0.3, this.jiaodu);
                                node_Bottle11.runAction(rotateTo);
                                item.setPosition(pos1.x + this.node.width / 2 * Math.cos(Math.atan(mos2.y / mos2.x)),
                                pos1.y + this.node.width / 2 * Math.sin(Math.atan(mos2.y / mos2.x)));
                            }
                            else if (mos2.y < 0) {
                                this.jiaodu = Math.atan(Math.abs(mos2.y) / mos2.x) * 180 / Math.PI;
                                var rotateTo = cc.rotateTo(0.3, this.jiaodu);
                                node_Bottle11.runAction(rotateTo);
                                item.setPosition(pos1.x + this.node.width / 2 * Math.cos(Math.atan(-mos2.y / mos2.x)), 
                                pos1.y - this.node.width / 2 * Math.cos(Math.atan(-mos2.y / mos2.x)));
                            }
                        }
                        else if (mos2.x < 0) {
                            if (mos2.y > 0) {
                                this.jiaodu = -180 + Math.atan(mos2.y / Math.abs(mos2.x)) * 180 / Math.PI;
                                var rotateTo = cc.rotateTo(0.3, this.jiaodu);
                                node_Bottle11.runAction(rotateTo);
                                item.setPosition(pos1.x - this.node.width / 2 * Math.cos(Math.atan(mos2.y / -mos2.x)), 
                                pos1.y + this.node.width / 2 * Math.cos(Math.atan(mos2.y / -mos2.x)));
                                // node_Bottle11.rotation = this.jiaodu;
                            }
                            else if (mos2.y < 0) {
                                this.jiaodu = 180 - Math.atan(mos2.y / mos2.x) * 180 / Math.PI;
                                var rotateTo = cc.rotateTo(0.3, this.jiaodu);
                                node_Bottle11.runAction(rotateTo);
                                item.setPosition(pos1.x - this.node.width / 2 * Math.cos(Math.atan(-mos2.y / mos2.x)), 
                                pos1.y - this.node.width / 2 * Math.cos(Math.atan(-mos2.y / mos2.x)));
                                // node_Bottle11.rotation = this.jiaodu;
                            }
                        }
                        else {//x=0
                            if (mos2.y > 0) {
                                var rotateTo = cc.rotateTo(0.3, -90);
                                node_Bottle11.runAction(rotateTo);
                                item.setPosition(pos1.x, pos1.y + this.node.width / 2);     //炮弹初始位置
                            }
                            if (mos2.y < 0) {
                                var rotateTo = cc.rotateTo(0.3, 90);
                                node_Bottle11.runAction(rotateTo);
                                item.setPosition(pos1.x, pos1.y - this.node.width / 2);     
                            }
                        }
                        if (mos2.y == 0) {
                            if (zhangai2.x > 0) {
                                var rotateTo = cc.rotateTo(0.3, 0);
                                node_Bottle11.runAction(rotateTo);
                                item.setPosition(pos1.x + this.node.width / 2, pos1.y);    
                            }
                            else if (mos2.x < 0) {
                                var rotateTo = cc.rotateTo(0.3, 180);
                                node_Bottle11.runAction(rotateTo);
                                item.setPosition(pos1.x - this.node.width / 2, pos1.y);    
                            }
                        }
                        //炮塔开始播放打怪动画
                        var anim = node_Bottle11.getComponent(cc.Animation);
                        anim.play(this.state.toString());
                        //炮弹动画
                        var a = 10 + this.state;
                        var anim = item.getComponent(cc.Animation);
                        anim.play(a.toString);
                        this.isFire = false;
                    }
                }
                else {
                    if (other.node.tag == this.most[0]) {
                        if (this.isFire == true) {
                            //生成炮弹
                            var item = cc.instantiate(this.prefab_pbottle);
                            item.getComponent("pbottle").setnode(other.node);
                            node_pbottle.addChild(item);
                            var pos = self.node.convertToWorldSpaceAR(cc.Vec2(self.node.x, self.node.y));
                            var pos1 = node_pbottle.convertToNodeSpaceAR(cc.v2(pos.x, pos.y));
                            //炮弹转向     Math.atan(y/x)弧度*180/pai Math.PI 
                            var mos1 = other.node.convertToWorldSpaceAR(cc.Vec2(other.node.x, other.node.y));
                            var mos2 = this.node.convertToNodeSpaceAR(cc.v2(mos1.x, mos1.y));
                            this.jiaodu;
                            if (mos2.x > 0) {
                                if (mos2.y > 0) {
                                    this.jiaodu = -Math.atan(mos2.y / mos2.x) * 180 / Math.PI;
                                    var rotateTo = cc.rotateTo(0.3, this.jiaodu);
                                    node_Bottle11.runAction(rotateTo);
                                    item.setPosition(pos1.x + this.node.width / 2 * Math.cos(Math.atan(mos2.y / mos2.x)), pos1.y + this.node.width / 2 * Math.sin(Math.atan(mos2.y / mos2.x)));
                                }
                                else if (mos2.y < 0) {
                                    this.jiaodu = Math.atan(Math.abs(mos2.y) / mos2.x) * 180 / Math.PI;
                                    var rotateTo = cc.rotateTo(0.3, this.jiaodu);
                                    node_Bottle11.runAction(rotateTo);
                                    item.setPosition(pos1.x + this.node.width / 2 * Math.cos(Math.atan(-mos2.y / mos2.x)), pos1.y - this.node.width / 2 * Math.cos(Math.atan(-mos2.y / mos2.x)));
                                }
                            }
                            else if (mos2.x < 0) {
                                if (mos2.y > 0) {
                                    this.jiaodu = -180 + Math.atan(mos2.y / Math.abs(mos2.x)) * 180 / Math.PI;
                                    var rotateTo = cc.rotateTo(0.3, this.jiaodu);
                                    node_Bottle11.runAction(rotateTo);
                                    item.setPosition(pos1.x - this.node.width / 2 * Math.cos(Math.atan(mos2.y / -mos2.x)), pos1.y + this.node.width / 2 * Math.cos(Math.atan(mos2.y / -mos2.x)));
                                }
                                else if (mos2.y < 0) {
                                    this.jiaodu = 180 - Math.atan(mos2.y / mos2.x) * 180 / Math.PI;
                                    var rotateTo = cc.rotateTo(0.3, this.jiaodu);
                                    node_Bottle11.runAction(rotateTo);
                                    item.setPosition(pos1.x - this.node.width / 2 * Math.cos(Math.atan(-mos2.y / mos2.x)), pos1.y - this.node.width / 2 * Math.cos(Math.atan(-mos2.y / mos2.x)));
                                    // node_Bottle11.rotation = this.jiaodu;
                                }
                            }
                            else {//x=0
                                if (mos2.y > 0) {
                                    var rotateTo = cc.rotateTo(0.3, -90);
                                    node_Bottle11.runAction(rotateTo);
                                    item.setPosition(pos1.x, pos1.y + this.node.width / 2);     //炮弹初始位置
                                }
                                if (mos2.y < 0) {
                                    var rotateTo = cc.rotateTo(0.3, 90);
                                    node_Bottle11.runAction(rotateTo);
                                    item.setPosition(pos1.x, pos1.y - this.node.width / 2);     //炮弹初始位置
                                }
                            }
                            if (mos2.y == 0) {
                                if (mos2.x > 0) {
                                    var rotateTo = cc.rotateTo(0.3, 0);
                                    node_Bottle11.runAction(rotateTo);
                                    item.setPosition(pos1.x + this.node.width / 2, pos1.y);     //炮弹初始位置
                                }
                                else if (mos2.x < 0) {
                                    var rotateTo = cc.rotateTo(0.3, 180);
                                    node_Bottle11.runAction(rotateTo);
                                    item.setPosition(pos1.x - this.node.width / 2, pos1.y);     //炮弹初始位置
                                }
                            }
                            //炮塔开始播放打怪动画
                            var anim = node_Bottle11.getComponent(cc.Animation);
                            anim.play(this.state.toString());
                            //炮弹动画
                            var a = 10 + this.state;
                            var anim = item.getComponent(cc.Animation);
                            anim.play(a.toString);
                            this.isFire = false;
                        }
                    }
                }
            }
        }
        // if ()//如果障碍物没血，从障碍物队列中删除。   障碍物血条....
    },

    onCollisionExit: function (other, self) {
        //炮塔停止播放打怪动画
        var a = self.node.getChildByName("Bottle11");
        var anim = a.getComponent(cc.Animation);
        anim.pause();
        //怪物队列 删除第一个
        if (other.node.group == "monster") {
            this.most.shift();
        }
    },

    //发生碰撞 如果是怪物 for循环给怪物赋值并push（加入队列最后）加入队列     碰撞前 
    //每一个炮塔一个队列，出碰撞时用shift移除队列第一个                      碰撞后
    //炮弹每次都只攻击队列中的第一个                                        碰撞中
    //动作一般使用cc.p
    start() {

    },

});



//炮弹移出来 自己做一个代码 碰撞、动画
//炮台的角度转向 炮弹发射的位置、方向
//炮台的升级销毁 另外预制  生成在canvas 最下层 （不会因此点到别的地方）



//炮塔角度 tan （炮塔位置为0,0）    炮台位置向上更方便    怪物坐标转炮台坐标
//全屏buttom  升级、销毁所在的攻击范围的圆  点击除升级、销毁的地方会将升级、销毁按钮active=false
//越靠显示界面上面的点 在canva底下的节点下越靠上  防止建炮台的时候被上面的炮台覆盖，无法建炮台
//如何确定升级哪个炮台  在炮台和升级、销毁各设一个值 两个相比较 相同的升级