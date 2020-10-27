const KEYS ={
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
}
let game = {
    ctx:null,
    platform:null,
    ball:null,
    block:null,
    blocks:[],
    rows: 4,
    cols: 8,
    width: 640,
    heigth: 360,
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
            if(e.keyCode === KEYS.SPACE){
                this.platform.fire();
            }else if(e.keyCode === KEYS.LEFT || e.keyCode === KEYS.RIGHT){
                this.platform.start(e.keyCode);
            }
        });
        window.addEventListener("keyup", e=>{
            this.platform.stop();
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
                    w: this.ball.w,
                    h: this.ball.h,
                    x: 72 * col +25,
                    y: 27 * row +10,
                });

            }
        }
    },
    update:function (){
        this.platform.move();
        this.ball.move();
        this.collideBlocks();
        this.collidePlatform();

    },collideBlocks(){
        for(let block of this.blocks){
            if(this.ball.collide(block)){
                this.ball.bumpBlock(block);
            }
        }
    }, collidePlatform(){
        if(this.ball.collide(this.platform)){
            this.ball.bumpPlatform(this.platform);
        }
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
        this.ctx.clearRect(0,0,this.width,this.heigth);
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
    },
    random:function (min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    },
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
    dy:0,
    dx:0,
    velocity:3,
    start(){
        this.dy = -this.velocity;
        this.dx = game.random(-this.velocity,this.velocity);
    },
    move(){
        if(this.dy){
            this.y += this.dy;
        }
        if(this.dx){
            this.x += this.dx;
        }
    },
    collide: function (element) {
        let x = this.x + this.dx;
        let y = this.y + this.dy;
         if(x + this.w > element.x &&
            x < element.x + element.w &&
            y + this.h > element.y&&
            y < element.y + element.h){
            return true;
        }
        return false;
    },
    bumpBlock: function (block){
        this.dy *= -1;
    },
    bumpPlatform: function (platform){
        this.dy *= -1;
        let touchX = this.x + this.w / 2;
        this.dx =  this.velocity * platform.getTouchOffset(touchX);
    }
};
game.platform ={
    velocity:6,
    dx:0,
    x:220,
    y:300,
    w:150, //Длинна
    h:30,  //Высота
    ball:game.ball,
    fire(){
        if(this.ball){
            this.ball.start();
            this.ball = null;
        }
    },
    move(){
        if(this.dx){
            this.x += this.dx;
            if(this.ball){
                this.ball.x +=this.dx;
            }
        }
    },
    stop(){
        this.dx = 0;
    },
    start(direction){
        if(direction === KEYS.LEFT){
            this.dx = -this.velocity;
        } else if(direction === KEYS.RIGHT){
            this.dx = this.velocity;
        }
    },
    getTouchOffset: function (x){
        let diff = (this.x + this.w) - x;
        let offset = this.w - diff;
        let result = 2 * offset / this.w;
        return result -1;
    }
};
window.addEventListener("load", () => {
    game.start();
});
