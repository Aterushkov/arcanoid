let game = {
    ctx:null,
    background:null,
    ball:null,
    platform:null,
    //инициализация
    init:function() {
        this.ctx = document.getElementById("mycanvas").getContext("2d");
    },
    // загрузка спрайтов
    preload:function() {
        this.background = new Image();
        this.background.src = "img/background.png";

        this.ball = new Image();
        this.ball.src = "img/ball.png";

        this.platform = new Image();
        this.platform.src = "img/platform.png";
    },
    // запуск
    run:function() {
        window.requestAnimationFrame(() => {
          this.render();
        });
    },
    //отрисовка
    render: function (){
        this.ctx.drawImage(this.background, 0, 0);
        this.ctx.drawImage(this.ball, 0, 0);
        this.ctx.drawImage(this.platform, 100,100);
    },
    start: function() {
        this.init();
        this.preload();
        this.run();
    }
};

window.addEventListener("load", () => {
    game.start();
});
