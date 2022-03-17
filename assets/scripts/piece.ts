import { DataManager } from "./dataManager"
import { GAME_ENUM, PIECE_STATE, PIECE_ID, PIECE_TYPE, PIECE_SCORE, PIECE_DIE_SCORE } from "./enum"

export  class   Piece
{
    private _dbID:number=-1
    private _id:number=-1
    private _type:number=-1
    private _img:string=""
    private _x:number=-1
    private _y:number=-1
    private _node:cc.Node=null
    private _state:number=PIECE_STATE.NORMAL

    public  init(dbID:number,id:number,type:number,img:string,x:number,y:number):void{
        this._dbID=dbID
        this._id=id
        this._type=type
        this._img=img
        this._x=x
        this._y=y
    }

    public  isCanWalk(p:cc.Vec2):boolean{
        if(p.x<0||p.y<0||p.x>GAME_ENUM.PIECE_MAX_X||p.y>GAME_ENUM.PIECE_MAX_Y)return false

        switch(this._id)
        {
            case PIECE_ID.ZU:
                return this.isCanWalkZu(p)
            case PIECE_ID.CHE:
                return this.isCanWalkChe(p)
            case PIECE_ID.PAO:
                return this.isCanWalkPao(p)
            case PIECE_ID.MA:
                return this.isCanWalkMa(p)
            case PIECE_ID.XIANG:
                return this.isCanWalkXiang(p)
            case PIECE_ID.SHI:
                return this.isCanWalkShi(p)
            case PIECE_ID.JIANG:
                return this.isCanWalkJiang(p)
            default:
                break;
            
        }
        return false
    }

    public  isShiAndJiangBorder(p:cc.Vec2):boolean{
        if(p.x<GAME_ENUM.PIECE_XHI_JIANG_MINX||p.x>GAME_ENUM.PIECE_XHI_JIANG_MAXX)
            return true

        if(PIECE_TYPE.OWN==this.getType())
        {
            if(p.y>GAME_ENUM.PIECE_SHI_JIANG_MAXY)return true
        }
        else{
            if(p.y<GAME_ENUM.PIECE_MAX_Y-GAME_ENUM.PIECE_SHI_JIANG_MAXY)return true
        }

        return false
    }

    public  isCanWalkJiang(p:cc.Vec2):boolean{
        if(this.isShiAndJiangBorder(p))
        {
            return false
        }

        let x=Math.abs(p.x-this.getX())
        let y=Math.abs(p.y-this.getY())
        let ret=10*x+y
        return 10==ret||1==ret
    }

    public  isCanWalkShi(p:cc.Vec2):boolean{
        if(this.isShiAndJiangBorder(p))
        {
            return false
        }

        let x=Math.abs(p.x-this.getX())
        let y=Math.abs(p.y-this.getY())
        let ret=10*x+y
        return 11==ret
    }

    public  isCanWalkXiang(p:cc.Vec2):boolean{
        //检查越界
        if(PIECE_TYPE.OWN==this.getType())
        {
            if(p.y>GAME_ENUM.PIECE_XIANG_MAXY)return false
        }
        else{
            if(p.y<=GAME_ENUM.PIECE_XIANG_MAXY)return false
        }

        let x=p.x-this.getX()
        let y=p.y-this.getY()
        let ret=Math.abs(x*100+y)
        if(198!=ret&&202!=ret)
        {
            return false
        }
        //蹩脚
        let targetX=(p.x+this.getX())/2
        let targetY=(p.y+this.getY())/2
        let target=DataManager.getInstance().getPointPiece(new cc.Vec2(targetX,targetY))
        return null==target
    }

    public  isCanWalkMa(p:cc.Vec2):boolean{
        let x=Math.abs(p.x-this.getX())
        let y=Math.abs(p.y-this.getY())
        let ret=x*10+y;
        if(21==ret)//x轴
        {
            //蹩脚
            let targetX=(p.x+this.getX())/2
            let targetY=this.getY()
            let target=DataManager.getInstance().getPointPiece(new cc.Vec2(targetX,targetY))
            return null==target
        }
        else if(12==ret)//y轴
        {
            //蹩脚
            let targetX=this.getX()
            let targetY=(p.y+this.getY())/2
            let target=DataManager.getInstance().getPointPiece(new cc.Vec2(targetX,targetY))
            return null==target
        }

        return false
    }

    public  isCanWalkPao(p:cc.Vec2):boolean{
        let target=DataManager.getInstance().getPointPiece(p);

        let ret=DataManager.getInstance().getP2PNumber(p,new cc.Vec2(this.getX(),this.getY()))

        if(target)
        {
            return 1==ret//架炮
        }
        else
        {
            return 0==ret
        }
    }

    public  isCanWalkChe(p:cc.Vec2):boolean{
        return DataManager.getInstance().getP2PNumber(p,new cc.Vec2(this.getX(),this.getY()))==0;
    }

    public  isCanWalkZu(p:cc.Vec2):boolean{
        if(p.x==this.getX())
        {
            return p.y==this.getY()+1
        }
        else if(p.y==this.getY()){
            if(PIECE_TYPE.OWN==this.getType())
            {
                if(this.getY()<GAME_ENUM.PIECE_OWN_ZU)
                {
                    return false;
                }
            }
            else if(PIECE_TYPE.ENEMY==this.getType())
            {
                if(this.getY()<GAME_ENUM.PIECE_ENEMY_ZU)
                {
                    return false;
                }
            }

            return (p.x==this.getX()+1||p.x==this.getX()-1)
        }
    }

    public  isPieceByDbID(dbID:number):boolean{
        return this._dbID==dbID
    }
    //行走得分
    public  getScore():number{
        switch(this.getId())
        {
            case PIECE_ID.CHE:
                return  PIECE_SCORE.CHE
            case PIECE_ID.JIANG:
                return  PIECE_SCORE.JIANG
            case PIECE_ID.MA:
                return  PIECE_SCORE.MA
            case PIECE_ID.PAO:
                return  PIECE_SCORE.PAO
            case PIECE_ID.SHI:
                return  PIECE_SCORE.SHI
            case PIECE_ID.XIANG:
                return  PIECE_SCORE.XIANG
            case PIECE_ID.ZU:
                return  PIECE_SCORE.ZU
            default:
                return 0
        }
    }
    //死亡得分
    public  getDieScore():number{
        switch(this.getId())
        {
            case PIECE_ID.CHE:
                return  PIECE_DIE_SCORE.CHE
            case PIECE_ID.JIANG:
                return  PIECE_DIE_SCORE.JIANG
            case PIECE_ID.MA:
                return  PIECE_DIE_SCORE.MA
            case PIECE_ID.PAO:
                return  PIECE_DIE_SCORE.PAO
            case PIECE_ID.SHI:
                return  PIECE_DIE_SCORE.SHI
            case PIECE_ID.XIANG:
                return  PIECE_DIE_SCORE.XIANG
            case PIECE_ID.ZU:
                return  PIECE_DIE_SCORE.ZU
            default:
                return 0
        }
    }

    public  isActive():boolean{
        return  PIECE_STATE.NORMAL==this.getState()
    }
    public  revive():void{
        this.setState(PIECE_STATE.NORMAL)
        this._node.active=true
    }

    public  die():number{
        this.setState(PIECE_STATE.DIE)
        this._node.active=false
        return  this._dbID
    }

    public  setNode(node:cc.Node):void{
        this._node=node
    }

    public  isPoint(p:cc.Vec2):boolean
    {
        return  PIECE_STATE.NORMAL==this.getState()&&p.x==this._x&&p.y==this._y
    }

    public  getState():number{
        return this._state
    }

    public  setState(state:number):void{
        this._state=state
    }

    public  setX(x:number):void{
        this._x=x
        this._node.x=x*GAME_ENUM.PIECE_DISTANCE
    }

    public  setY(y:number):void{
        this._y=y
        this._node.y=y*GAME_ENUM.PIECE_DISTANCE
    }

    public  getX():number{
        return this._x
    }
    public  getY():number{
        return this._y
    }
    public  getImg():string{
        return this._img
    }
    public  getType():number{
        return this._type
    }
    public  getId():number{
        return this._id
    }

    public  getDbID():number{
        return this._dbID
    }
}