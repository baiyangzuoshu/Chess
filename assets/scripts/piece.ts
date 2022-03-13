export  class   Piece
{
    private _id:number=-1;
    private _type:number=-1;
    private _img:string="";
    private _x:number=-1;
    private _y:number=-1;

    public  init(id:number,type:number,img:string,x:number,y:number):void{
        this._id=id;
        this._type=type;
        this._img=img;
        this._x=x;
        this._y=y;
    }

    public  getX():number{
        return this._x;
    }
    public  getY():number{
        return this._y;
    }
    public  getImg():string{
        return this._img;
    }
    public  getType():number{
        return this._type;
    }
    public  getId():number{
        return this._id;
    }
}