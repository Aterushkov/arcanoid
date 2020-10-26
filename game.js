let game = {
    ctx:null,
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
        this.ctx.drawImage(this.sprites.ball, 0, 0);
        this.ctx.drawImage(this.sprites.platform, 100,100);
    },
    start: function() {
        this.init();
        this.preload(()=>{
            this.run();
        });
    }
};

window.addEventListener("load", () => {
    game.start();
});
