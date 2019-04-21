import sound from './sound';
// const sound = require('./sound').sound;
// function sound() {
//     sound = document.createElement("audio");
//     sound.src = './music/crunch.wav';
//     sound.setAttribute("preload", "auto");
//     sound.setAttribute("controls", "none");
//     sound.style.display = "none";
//     document.body.appendChild(sound);
//     this.play = () => {
//         sound.play();
//     }
//     this.stop = () => {
//         sound.pause();
//     }
// }

class Game {
    //Movimiento y composición del espacio
    Snake = [];
    director = null;
    direction = 2;
    sizeSquare = 10;
    canvas = null;
    food = null;

    //Partes del juego
    head = new Image();
    tail = new Image();
    apple = new Image();
    //scream = sound();

    lose = new Image();

    IsLost = false;

    constructor(txtButton, txtState, canvas) {
        this.txtButton = txtButton;
        this.txtState = txtState;
        this.canvas = canvas;

        this.ctx = this.canvas.getContext("2d");

        this.head.src = "./img/face.png";
        this.apple.src = "./img/apple.png";
        //this.tail.src = "asja";
        this.lose.src = "./img/perdiste.jpg";
    }

    Init() {
        this.PrintState("Inicia");

        let square = new Object();
        square.X = 15;
        square.Y = 15;
        square.X_old = 15;
        square.Y_old = 15;
        this.Snake.push(square);

        document.addEventListener("keypress", e => {
            oGame.Printkey(e.key + " " + e.keyCode);

            switch (e.keyCode) {
                case 119:
                    if (oGame.direction != 3)
                        oGame.direction = 1;
                    break;
                case 100:
                    if (oGame.direction != 4)
                        oGame.direction = 2;
                    break;
                case 115:
                    if (oGame.direction != 1)
                        oGame.direction = 3;
                    break;
                case 97:
                    if (oGame.direction != 2)
                        oGame.direction = 4;
                    break;
            }
        })

        this.director = setInterval(() => {
            this.Rules();
            if (!this.IsLost) {
                this.Next();
                this.Show();
            } else {
                // clearInterval(this.director);
                // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                // ctx.font = "20px Tahoma";
                // ctx.textAlign = "center";
                // ctx.textBaseline = "middle";
                // ctx.fillStyle = "White";
                // ctx.fillText("GAME OVER", canvas.width, canvas.height);
                clearInterval(this.director);
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.lose, 0, 0);
            }
        }, 100);
    }
    Rules() {
        //regla 1, colición
        for (let j = 0; j < this.Snake.length; j++) {
            for (let i = 0; i < this.Snake.length; i++) {
                if (j != i) {
                    if (this.Snake[j].X == this.Snake[i].X &&
                        this.Snake[j].Y == this.Snake[i].Y
                    )
                        this.IsLost = true;
                }
            }
        }

        //regla 2, salir de pantalla
        if (this.Snake[0].X >= 30 || this.Snake[0].X < 0 ||
            this.Snake[0].Y >= 30 || this.Snake[0].Y < 0
        )
            this.IsLost = true;
    }
    Next() {
        this.PrintState("Mueve: " + this.direction);
        if (this.food == null)
            this.getFood();

        this.Snake.map(square => {
            square.X_old = square.X;
            square.Y_old = square.Y;
        })


        switch (this.direction) {
            case 1:
                this.Snake[0].Y--;
                break;
            case 2:
                this.Snake[0].X++;
                break;
            case 3:
                this.Snake[0].Y++;
                break;
            case 4:
                this.Snake[0].X--;
                break;
        }

        this.Snake.map((square, index, Snake) => {
            if (index != 0) {
                square.X = Snake[index - 1].X_old;
                square.Y = Snake[index - 1].Y_old;
            }
        })

        if (this.food != null)
            this.IsEating();


    }

    Show() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.Snake.map((square, index) => {
            if (index == 0)
                this.ctx.drawImage(this.head,
                    square.X * this.sizeSquare,
                    square.Y * this.sizeSquare);
            else {
                this.ctx.fillStyle = "pink";
                this.ctx.fillRect(
                    square.X * this.sizeSquare,
                    square.Y * this.sizeSquare,
                    this.sizeSquare,
                    this.sizeSquare);
            }
        });

        if (this.food != null)
            this.ctx.drawImage(this.apple, this.food.X * this.sizeSquare,
                this.food.Y * this.sizeSquare);
    }

    getFood() {
        let square = new Object();
        square.X = Math.floor(Math.random() * 30);
        square.Y = Math.floor(Math.random() * 30);
        this.food = square;
    }

    IsEating() {
        if (this.Snake[0].X == this.food.X && this.Snake[0].Y == this.food.Y) {
            this.food = null;
            //this.scream.play();
            this.sound.play();

            let square = new Object();
            square.X = this.Snake[this.Snake.length - 1].X_old;
            square.Y = this.Snake[this.Snake.length - 1].Y_old;
            this.Snake.push(square);

        }
    }

    PrintState(text) {
        this.txtState.value = text;
    }

    Printkey(text) {
        this.txtButton.value = text;
    }


}

var oGame = new Game(txtButton, txtState, canvas);
oGame.Init();