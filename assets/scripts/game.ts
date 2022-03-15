// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { DataManager } from "./dataManager"
import { GAME_ENUM } from "./enum"

const {ccclass, property} = cc._decorator

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    bg:cc.Node=null
    @property(cc.JsonAsset)
    data:cc.JsonAsset=null
    @property(cc.SpriteAtlas)
    chessSpriteAtlas:cc.SpriteAtlas=null
    @property(cc.Node)
    selectedNode:cc.Node=null
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //是否需要单独抽象一个点击事件管理？
        this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this)
        this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.touchCancel,this)

        this.hideSelectedNode()
        DataManager.getInstance().loadJsonData(this.data)
        this.loadPieceToBg()
    }

    touchStart(event:cc.Event.EventTouch):boolean{
        let p=event.getLocation()

        return true
    }
    touchMove(event:cc.Event.EventTouch):void{

    }
    touchEnd(event:cc.Event.EventTouch):void{
        let p=event.getLocation()
        let nodePos=this.bg.convertToNodeSpaceAR(p)

        let transformPos=DataManager.getInstance().pointTransform(nodePos)
        let selectedPos=DataManager.getInstance().pointTransform(new cc.Vec2(this.selectedNode.x,this.selectedNode.y))

        let prePiece=DataManager.getInstance().getPointPiece(selectedPos)
        let curPiece=DataManager.getInstance().getPointPiece(transformPos)
        if(prePiece&&this.selectedNode.active)//上一步选中棋子
        {
            if(curPiece)
            {
                if(prePiece.getType()!=curPiece.getType()&&prePiece.isCanWalk(transformPos))//吃对方棋子
                {
                    curPiece.die()
                    prePiece.setX(transformPos.x)
                    prePiece.setY(transformPos.y)
                    this.hideSelectedNode()
                }
                else
                {
                    this.showSelectedNode(transformPos)
                }
            }
            else if(prePiece.isCanWalk(transformPos))//前进
            {
                prePiece.setX(transformPos.x)
                prePiece.setY(transformPos.y)
                this.hideSelectedNode()
            }
        }
        else{
            this.showSelectedNode(transformPos)
        }
    }
    touchCancel(event:cc.Event.EventTouch):void{

    }

    showSelectedNode(p:cc.Vec2):void{
        this.selectedNode.active=true
        this.selectedNode.x=p.x*GAME_ENUM.PIECE_DISTANCE
        this.selectedNode.y=p.y*GAME_ENUM.PIECE_DISTANCE
    }

    hideSelectedNode():void{
        this.selectedNode.active=false
    }

    loadPieceToBg():void{
        let pieceTotal=DataManager.getInstance().getPieceArrayLength()
        for(let i=0;i<pieceTotal;i++)
        {
            let piece=DataManager.getInstance().getPieceByIndex(i)

            let node=new cc.Node()
            node.parent=this.bg
            node.x=piece.getX()*GAME_ENUM.PIECE_DISTANCE
            node.y=piece.getY()*GAME_ENUM.PIECE_DISTANCE
            piece.setNode(node)

            let sprite=node.addComponent(cc.Sprite)
            let spriteFrame=this.chessSpriteAtlas.getSpriteFrame(piece.getImg())
            sprite.spriteFrame=spriteFrame
        }
    }

    start () {

    }

    // update (dt) {}
}
