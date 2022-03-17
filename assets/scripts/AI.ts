import { DataManager } from "./dataManager";
import { GAME_ENUM } from "./enum";
import { Step } from "./step";

export  class   AI
{
    //遍历棋子所有步骤
    private static   getAllPieceStep():Array<Step>{
        let arr:Array<Step>=[];

        for(let dbID=GAME_ENUM.PIECE_ENEMY_MIN_DBID;dbID<=GAME_ENUM.PIECE_ENEMY_MAX_DBID;dbID++)
        {
            let piece=DataManager.getInstance().getPieceByID(dbID)
            if(piece.isActive())
            {
                for(let x=0;x<=GAME_ENUM.PIECE_MAX_X;x++)
                {
                    for(let y=0;y<=GAME_ENUM.PIECE_MAX_Y;y++)
                    {
                        if(!piece.isCanWalk(new cc.Vec2(x,y)))
                            continue//无法行走

                        let killedPiece=DataManager.getInstance().getPointPiece(new cc.Vec2(x,y))

                        let step:Step=null
                        if(killedPiece)
                        {
                            if(killedPiece.getType()==piece.getType())
                                continue//不可杀自己人
                            step=new Step(piece.getDbID(),killedPiece.getDbID(),piece.getX(),piece.getY(),x,y)
                        }
                        else{
                            step=new Step(piece.getDbID(),0,piece.getX(),piece.getY(),x,y)
                        }
                        
                        arr.push(step)
                    }
                }
            }
        }
        return arr
    }
    //最佳步骤
    public  static  getStep():Step{
        let arr:Array<Step>=this.getAllPieceStep()

        let maxScore=-10000
        let curStep=null
        for(let i=0;i<arr.length;i++)
        {
            let step=arr[i]
            AI.fakeMove(step)
            let score=AI.getScore()
            if(score>maxScore)
            {
                maxScore=score
                curStep=step
            }
            AI.unFakeMove(step)
        }

        return curStep
    }
    //获取得分
    public  static  getScore():number{
        let ownScore=0
        let enemyScore=0
        for(let dbID=GAME_ENUM.PIECE_OWN_MIN_DBID;dbID<=GAME_ENUM.PIECE_OWN_MAX_DBID;dbID++)
        {
            let piece=DataManager.getInstance().getPieceByID(dbID)
            if(piece.isActive())
            {
                ownScore=ownScore+piece.getScore()
            }
        }

        for(let dbID=GAME_ENUM.PIECE_ENEMY_MIN_DBID;dbID<=GAME_ENUM.PIECE_ENEMY_MAX_DBID;dbID++)
        {
            let piece=DataManager.getInstance().getPieceByID(dbID)
            if(piece.isActive())
            {
                enemyScore=enemyScore+piece.getScore()
            }
        }

        return enemyScore-ownScore
    }
    //模拟移动
    public  static  fakeMove(step:Step):void{
        let dbID=step.getDbID()
        let killId=step.getKillId()
        let fromX=step.getFromX()
        let fromY=step.getFromY()
        let toX=step.getToX()
        let toY=step.getToY()

        let piece=DataManager.getInstance().getPieceByID(dbID)
        let killPiece=DataManager.getInstance().getPieceByID(killId)
        if(piece)
        {
            piece.setX(toX)
            piece.setY(toY)
        }
        if(killPiece)
        {
            killPiece.die()
        }
    }
    //回退模拟
    public  static  unFakeMove(step:Step):void{
        let killId=step.getKillId()
        let dbID=step.getDbID()
        let fromX=step.getFromX()
        let fromY=step.getFromY()
        let toX=step.getToX()
        let toY=step.getToY()

        let piece=DataManager.getInstance().getPieceByID(dbID)
        let killPiece=DataManager.getInstance().getPieceByID(killId)
        if(piece)
        {
            piece.setX(fromX)
            piece.setY(fromY)
        }
        if(killPiece)
        {
            killPiece.revive()
        }
    }
}