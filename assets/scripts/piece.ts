import { GAME_ENUM } from "./enum"

export  class   Piece
{
    private _id:number=-1
    private _type:number=-1
    private _img:string=""
    private _x:number=-1
    private _y:number=-1
    private _node:cc.Node=null

    public  init(id:number,type:number,img:string,x:number,y:number):void{
        this._id=id
        this._type=type
        this._img=img
        this._x=x
        this._y=y
    }

    public  setNode(node:cc.Node):void{
        this._node=node
    }

    public  isPoint(p:cc.Vec2):boolean
    {
        return  p.x==this._x&&p.y==this._y
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
}