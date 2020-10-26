let game = {
    ctx:null,
    platform:null,
    ball:null,
    block:null,
    blocks:[],
    rows: 4,
    cols: 8,
    sprites:{
        background:null,
        ball:null,
        platform:null,
        block:null
    },
    //инициализация
    init:function() {
        this.ctx = document.getElementById("mycanvas").getContext("2d");
        this.setEvents();
    },
    //Нажатие на клавиши
    setEvents: function(){
        window.addEventListener("keydown", e=>{
            //37 влево 39 вправо
            if(e.keyCode === 37){
                this.platform.dx = -this.platform.velocity;
            } else if(e.keyCode === 39){
                this.platform.dx = this.platform.velocity;
            }
        });
        window.addEventListener("keyup", e=>{
            this.platform.dx = 0;
        });
    },
    // загрузка спрайтов
    preload:function(callback) {
        let loaded = 0;
        let required = Object.keys(this.sprites).length;
        let onImageLoad = () => {
            ++loaded;
            if(loaded >= required){
                callback();
            }
        };

        for(let key in this.sprites){
            this.sprites[key] = new Image();
            this.sprites[key].src = "img/"+ key + ".png";
            this.sprites[key].addEventListener("load",onImageLoad);
        }
    },
    //Создание блоков
    create: function (){
        for (let row = 0 ; row < this.rows; row++){
            for (let col = 0; col < this.cols; col++){
                this.blocks.push({
                    x: 72 * col +25,
                    y: 27 * row +10,
                });

            }
        }
    },
    update:function (){
        this.platform.move();
    },
    // запуск
    run:function() {
        window.requestAnimationFrame(() => {
            this.update();
            this.render();
            this.run();
        });
    },
    //отрисовка
    render: function (){
        this.ctx.drawImage(this.sprites.background, 0, 0);
        this.ctx.drawImage(this.sprites.ball, this.ball.x, this.ball.y,this.ball.w,this.ball.h);
        this.ctx.drawImage(this.sprites.platform, this.platform.x,this.platform.y,this.platform.w,this.platform.h);
        this.renderBlocks();
    },
    renderBlocks:function (){
        for( let block of this.blocks){
            this.ctx.drawImage(this.sprites.block, block.x,block.y,this.block.w,this.block.h);
        }
    },
    start: function() {
        this.init();
        this.preload(()=>{
            this.create();
            this.run();
        });
    }
};
//Объекты
game.block ={
    x:0,
    y:0,
    w:70, //Длинна
    h:25, //Высота
};
game.ball ={
    x:280,
    y:270,
    w:30, //Длинна
    h:30, //Высота
};
game.platform ={
    velocity:6,
    dx:0,
    x:220,
    y:300,
    w:150, //Длинна
    h:30,  //Высота
    move(){
        if(this.dx){
            this.x += this.dx;
        }
    }
};
window.addEventListener("load", () => {
    game.start();
});
