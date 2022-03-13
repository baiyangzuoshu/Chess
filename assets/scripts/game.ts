// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { DataManager } from "./dataManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    bg:cc.Node=null;
    @property(cc.JsonAsset)
    data:cc.JsonAsset=null;
    @property(cc.SpriteAtlas)
    chessSpriteAtlas:cc.SpriteAtlas=null;
    @property(cc.Node)
    selectedNode:cc.Node=null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this)
        this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.touchCancel,this)

        this.selectedNode.active=false;
        DataManager.getInstance().loadJsonData(this.data);
        this.loadPieceToBg();
    }

    touchStart(event:cc.Event.EventTouch):boolean{
        let p=event.getLocation();

        return true;
    }
    touchMove(event:cc.Event.EventTouch):void{

    }
    touchEnd(event:cc.Event.EventTouch):void{
        let p=event.getLocation();
        let nodePos=this.bg.convertToNodeSpaceAR(p);

        let x=Math.floor(nodePos.x/110)
        let y=Math.floor(nodePos.y/110)
        let diffX=nodePos.x-x*110
        let diffY=nodePos.y-y*110
        //偏移量
        if(diffX>110/2){
            x=x+1
        }
        if(diffY>110/2){
            y=y+1
        }

        this.selectedNode.active=true;
        this.selectedNode.x=x*110;
        this.selectedNode.y=y*110;
    }
    touchCancel(event:cc.Event.EventTouch):void{

    }

    loadPieceToBg():void{
        let pieceTotal=DataManager.getInstance().getPieceArrayLength();
        for(let i=0;i<pieceTotal;i++)
        {
            let piece=DataManager.getInstance().getPieceByIndex(i);

            let node=new cc.Node();
            node.parent=this.bg;
            node.x=piece.getX()*110;
            node.y=piece.getY()*110;

            let sprite=node.addComponent(cc.Sprite);
            let spriteFrame=this.chessSpriteAtlas.getSpriteFrame(piece.getImg());
            sprite.spriteFrame=spriteFrame;

        }
    }

    start () {

    }

    // update (dt) {}
}
