const canvas = document.getElementById('JogoCanvas');
const ctx = canvas.getContext('2d');

class Entidade {
    constructor(x, y, largura, altura, cor){
        this.x = x;
        this.y = y;
        this.largura = largura
        this.altura = altura
        this.cor = cor
    }
    desenhar (){
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}

class Jogo{
    constructor(){
        this.loop = this.loop.bind(this)
    }
    loop (personagi) {
        personagi.desenhar()
        console.log("O jogo está funcionando")
        requestAnimationFrame(this.loop)
    }
}

const personagi = new Entidade(100, 100, 50, 50, 'white')
const jogo = new Jogo()
jogo.loop(personagi)