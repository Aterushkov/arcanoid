let game = {
    ctx:null,
    platform:null,
    ball:null,
    sprites:{
        background:null,
        ball:null,
        platform:null,
    },
    //инициализация
    init:function() {
        this.ctx = document.getElementById("mycanvas").getContext("2d");
    },
    // загрузка спрайтов
    preload:function(callback) {
        let loaded = 0;
        let required = Object.keys(this.sprites).length;
        for(let key in this.sprites){
            this.sprites[key] = new Image();
            this.sprites[key].src = "img/"+ key + ".png";
            this.sprites[key].addEventListener("load", () => {
                ++loaded;
                if(loaded >= required){
                    callback();
                }
            });
        }
    },
    // запуск
    run:function() {
        window.requestAnimationFrame(() => {
          this.render();
        });
    },
    //отрисовка
    render: function (){
        this.ctx.drawImage(this.sprites.background, 0, 0);
        this.ctx.drawImage(this.sprites.ball, this.ball.x, this.ball.y,this.ball.w,this.ball.h);
        this.ctx.drawImage(this.sprites.platform, this.platform.x,this.platform.y,this.platform.w,this.platform.h);
    },
    start: function() {
        this.init();
        this.preload(()=>{
            this.run();
        });
    }
};
game.ball ={
    x:280,
    y:270,
    w:30,
    h:30,
};
game.platform ={
   x:220,
   y:300,
   w:150,
   h:30,
};
window.addEventListener("load", () => {
    game.start();
});
