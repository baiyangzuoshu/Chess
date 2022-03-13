import { Piece } from "./piece";

export  class   DataManager
{
    private _pieceArray:Array<Piece>=[];
    private static  _instance:DataManager=null;
    public  static  getInstance():DataManager{
        if(null==this._instance)
        {
            this._instance=new DataManager();
        }
        return this._instance;
    }

    public  loadJsonData(jsonData:cc.JsonAsset):void{
        let data:Array<Object>=jsonData.json;
        for(let i=0;i<data.length;i++)
        {
            let id=data[i]["id"];
            let type=data[i]["type"];
            let img=data[i]["img"];
            let x=data[i]["x"];
            let y=data[i]["y"];

            let piece=new Piece();
            piece.init(id,type,img,x,y);
            this._pieceArray.push(piece);
        }
    }

    public  getPieceArrayLength():number{
        return this._pieceArray.length;
    }

    public  getPieceByIndex(index:number):Piece{
        return this._pieceArray[index];
    }
}