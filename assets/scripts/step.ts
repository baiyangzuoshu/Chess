import { DataManager } from "./dataManager"

export  class   Step
{
    private _dbID:number=-1
    private _killId:number=-1
    private _fromX:number=-1
    private _fromY:number=-1
    private _toX:number=-1
    private _toY:number=-1
    constructor(dbID:number,killId:number,fromX:number,fromY:number,toX:number,toY:number)
    {
        this._dbID=dbID
        this._killId=killId
        this._fromX=fromX
        this._fromY=fromY
        this._toX=toX
        this._toY=toY
    }

    public  getDbID():number
    {
        return this._dbID
    }

    public  getKillId():number{
        return this._killId
    }

    public  getFromX():number{
        return this._fromX
    }

    public  getFromY():number{
        return this._fromY
    }

    public  getToX():number{
        return this._toX
    }

    public  getToY():number{
        return this._toY
    }
}