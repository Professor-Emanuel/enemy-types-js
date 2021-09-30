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
            this.enemyTypes = ['worm', 'ghost'];
        }
    
        update(deltaTime){
            //only take objects that are not market for deletion
            this.enemies = this.enemies.filter(object => !object.markedForDeletion);
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
            const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
            if(randomEnemy == 'worm'){
                this.enemies.push(new Worm(this));
            }
            if(randomEnemy == 'ghost'){
                this.enemies.push(new Ghost(this));
            }
            /*this.enemies.sort(function(a, b){
                return a.y - b.y;
            });*/
        }
    }
    
    class Enemy{
        constructor(game){
            this.game = game;
            //console.log(game);  
            this.markedForDeletion = false;
        }
    
        update(deltaTime){
            this.x -= this.vx; //* deltaTime;
            //console.log(deltaTime);// -> UNDEFINED for some reason
            //console.log(this.vx);
            if(this.x < 0 - this.width){
                this.markedForDeletion = true;
            }
        }
    
        draw(ctx){
            //ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, 0 , 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        }
    }

    class Worm extends Enemy{
        constructor(game){
            //take the parent constructor properties
            super(game);
            //additional, specific child class properties
            this.spriteWidth = 229; //see image
            this.spriteHeight = 171; //see image
            this.width = this.spriteWidth/2;
            this.height = this.spriteHeight/2;
            this.x = this.game.width;
            this.y = this.game.height - this.height;
            this.image = worm; // worm is the id of one of the image in index.html
            this.vx = Math.random() * 0.2 + 0.1;
        }
    }

    class Ghost extends Enemy{
        constructor(game){
            //take the parent constructor properties
            super(game);
            //additional, specific child class properties
            this.spriteWidth = 229; //see image
            this.spriteHeight = 171; //see image
            this.width = this.spriteWidth/2;
            this.height = this.spriteHeight/2;
            this.x = this.game.width;
            this.y = Math.random() * this.game.height * 0.6;
            this.image = ghost; // worm is the id of one of the image in index.html
            this.vx = Math.random() *  0.2 + 0.1;
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