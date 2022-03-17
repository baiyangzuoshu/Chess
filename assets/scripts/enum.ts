export  enum    GAME_ENUM
{
    PIECE_DISTANCE=110,
    PIECE_OWN_ZU=5,
    PIECE_ENEMY_ZU=4,
    PIECE_MAX_X=8,
    PIECE_MAX_Y=9,
    PIECE_XIANG_MAXY=4,
    PIECE_XHI_JIANG_MINX=3,
    PIECE_XHI_JIANG_MAXX=5,
    PIECE_SHI_JIANG_MAXY=2,
    PIECE_ENEMY_MIN_DBID=17,
    PIECE_ENEMY_MAX_DBID=32
}

export  enum    PIECE_SCORE
{
    CHE=10,
    PAO=9,
    MA=8,
    ZU=7,
    XIANG=6,
    SHI=5,
    JIANG=4
}

export  enum    PIECE_DIE_SCORE
{
    CHE=100,
    PAO=90,
    MA=80,
    ZU=70,
    XIANG=60,
    SHI=50,
    JIANG=1000
}

export  enum    PIECE_TYPE
{
    NORMAL,
    OWN,
    ENEMY
}

export  enum    PIECE_STATE
{
    NORMAL,
    DIE
}

export  enum    PIECE_ID
{
    NORMAL,
    CHE,
    MA,
    XIANG,
    SHI,
    JIANG,
    PAO,
    ZU,
    MAX
}