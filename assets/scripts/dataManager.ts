import { GAME_ENUM } from "./enum"
import { Piece } from "./piece"

export  class   DataManager
{
    private _pieceArray:Array<Piece>=[]
    private static  _instance:DataManager=null
    public  static  getInstance():DataManager{
        if(null==this._instance)
        {
            this._instance=new DataManager()
        }
        return this._instance
    }

    public  pointTransform(p:cc.Vec2):cc.Vec2{
        let x=Math.floor(p.x/GAME_ENUM.PIECE_DISTANCE)
        let y=Math.floor(p.y/GAME_ENUM.PIECE_DISTANCE)
        let diffX=p.x-x*GAME_ENUM.PIECE_DISTANCE
        let diffY=p.y-y*GAME_ENUM.PIECE_DISTANCE
        //偏移量
        if(diffX>GAME_ENUM.PIECE_DISTANCE/2){
            x=x+1
        }
        if(diffY>GAME_ENUM.PIECE_DISTANCE/2){
            y=y+1
        }

        return new cc.Vec2(x,y)
    }
    
    public  getPointPiece(p:cc.Vec2):Piece{
        for(let i=0;i<this._pieceArray.length;i++)
        {
            if(this._pieceArray[i].isPoint(p))
            {
                return this._pieceArray[i]
            }
        }

        return null
    }

    public  getP2PNumber(p1:cc.Vec2,p2:cc.Vec2):number{
        if(p1.x==p2.x&&p1.y==p2.y)return -1;
        if(p1.x!=p2.x&&p1.y!=p2.y)return -1;
        
        let ret=0;
        if(p1.x==p2.x)
        {
            let min=Math.min(p1.y,p2.y)
            let max=Math.max(p1.y,p2.y)
            for(let i=min+1;i<max;i++)
            {
                if(this.getPointPiece(new cc.Vec2(p1.x,i)))
                    ret++;
            }
        }
        else if(p1.y==p2.y)
        {
            let min=Math.min(p1.x,p2.x)
            let max=Math.max(p1.x,p2.x)
            for(let i=min+1;i<max;i++)
            {
                if(this.getPointPiece(new cc.Vec2(i,p1.y)))
                    ret++;
            }
        }

        return ret;
    }

    public  loadJsonData(jsonData:cc.JsonAsset):void{
        let data:Array<Object>=jsonData.json
        for(let i=0;i<data.length;i++)
        {
            let id=data[i]["id"]
            let type=data[i]["type"]
            let img=data[i]["img"]
            let x=data[i]["x"]
            let y=data[i]["y"]

            let piece=new Piece()
            piece.init(id,type,img,x,y)
            this._pieceArray.push(piece)
        }
    }

    public  getPieceArrayLength():number{
        return this._pieceArray.length
    }

    public  getPieceByIndex(index:number):Piece{
        return this._pieceArray[index]
    }
}