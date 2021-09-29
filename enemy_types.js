// when everything is loaded than create canvas and everything related
document.addEventListener('DOMContentLoaded', function(){
    
    const canvas = document.getElementById('main-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 800;
    
    class Game{
        constructor(ctx, width, height){
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.enemies = [];
            this.enemyInterval = 1000; // 1000 milliseconds
            this.enemyTimer = 0;
            this.#addNewEnemy();
        }
    
        update(deltaTime){
            if(this.enemyTimer > this.enemyInterval){
                this.#addNewEnemy();
                this.enemyTimer = 0;
                console.log(this.enemies);
            } else{
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(object => object.update());
        }
    
        draw(){
            this.enemies.forEach(object => object.draw(this.ctx));
        }
    
        // # = private method
        // meaning we can call it only inside the class
        #addNewEnemy(){
            this.enemies.push(new Enemy(this));
        }
    }
    
    class Enemy{
        constructor(game){
            this.game = game;
            console.log(game);
            this.x = this.game.width;
            this.y = Math.random() * this.game.height;
            this.width = 100;
            this.height = 100;
        }
    
        update(){
            this.x--;
        }
    
        draw(ctx){
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    const game = new Game(ctx, canvas.width, canvas.height);
    let lastTime = 1;
    function animate(timeStamp){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        game.draw();
        //console.log(deltaTime);
        requestAnimationFrame(animate);
    };
    //call function
    animate(0);
    
});