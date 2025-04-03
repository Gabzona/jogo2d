const canvas = document.getElementById('JogoCanvas');
const ctx = canvas.getContext('2d');

document.addEventListener('keypress', (e) => { //função de pular ao pressionar espaço
    if(e.code=='Space'){
        personagi.saltar() //chama a função saltar já q não da pra mudar propriedade encapsulada
    }
})

class Entidade {
    constructor(x, y, largura, altura, cor){
        this.x = x;
        this.y = y;
        this.largura = largura
        this.altura = altura
        this.cor = cor
    }
    desenhar(){
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}

class Personagem extends Entidade{
    #velocidade_y //encapsulando(privando) a velocidade pro jogador não alterar a velocidade no console
    constructor(x, y, largura, altura, cor){
        super(x, y, largura, altura, cor)
        this.#velocidade_y = 0 //pulo do personagem
        this.pulando = false //personagem está parado
    }

    saltar(){
        this.#velocidade_y = 15
        this.pulando = true
    }
    atualizar(){
        if(this.pulando){
            this.y -= this.#velocidade_y
            this.#velocidade_y -= Jogo.gravidade
            if(this.y >= canvas.height - 50){
                this.#velocidade_y = 0
                this.y = canvas.height - 50
                this.pulando = false
            }
        }
    }
    verificaColisao() {
        if (
            Obstaculo.x < personagem.x + personagem.largura &&
            Obstaculo.largura + Obstaculo.x > personagem.x &&
            personagem.y < Obstaculo.y + Obstaculo.altura &&
            personagem.y + personagem.altura > Obstaculo.y
        ) {
            console.log('colidiu com obstáculo');
            Obstaculo.velocidade_x = 0;
            personagem.x = Obstaculo.x - 30;
            personagem.velocidade_y = -10;
            ctx.fillStyle = "black";
            ctx.font = '50px Arial';
            ctx.fillText('GAME OVER', 50, 100);
            gameOver = true;
        }
    
        // Verifica colisão com o objeto superior
        if (
            objetoSuperior.x < personagem.x + personagem.largura &&
            objetoSuperior.largura + objetoSuperior.x > personagem.x &&
            personagem.y < objetoSuperior.y + objetoSuperior.altura &&
            personagem.y + personagem.altura > objetoSuperior.y
        ) {
            console.log('colidiu com objeto superior');
            gameOver = true;
            ctx.fillStyle = "black";
            ctx.font = '50px Arial';
            ctx.fillText('GAME OVER', 50, 100);
        }
    
        // Verifica colisão com o objeto no meio
        if (
            obstacolo.x < this.x + this.largura &&
            obstacolo.largura + obstacolo.x > this.x &&
            this.y < obstacolo.y + obstacolo.altura &&
            this.y + this.altura > obstacolo.y
        ) {
            console.log('colidiu com obstáculo');
            gameOver = true;
            ctx.fillStyle = "black";
            ctx.font = '50px Arial';
            ctx.fillText('GAME OVER', 50, 100);
        }
    }
    desenhar(){
        
    }
}

class Obstaculo extends Entidade{
    #velocidade_x
    constructor(x, y, largura, altura, cor){
        super(x, y, largura, altura, cor)
        this.#velocidade_x = 3 //movimento do obstaculo
    }
    atualizar(){
        this.x -= this.#velocidade_x
        if(this.x <= 0 - this.largura){ //se chegou no final
            this.x = canvas.width //volta pro começo
            this.#velocidade_x += 1 //e aumenta a velocidade
            let nova_altura = Math.random() * (150 - 90) + 90 //calcula um nova altura de obstaculo
            this.altura = nova_altura // muda a altura
            this.y = canvas.height - nova_altura //muda a posição do personagem
        }
    }
}

class Jogo{
    static gravidade = 0.5
    static gameOver = false
    constructor(){
        this.loop = this.loop.bind(this)
    }
    loop () {
        ctx.clearRect(0,0, canvas.width, canvas.height)
        obstacolo.desenhar()
        personagi.desenhar()
        obstacolo.atualizar()
        personagi.atualizar()
        requestAnimationFrame(this.loop)
    }
}

const personagi = new Personagem(100, canvas.height - 50, 50, 50, 'white')
const obstacolo = new Obstaculo(canvas.width - 50, canvas.height - 100, 50, 100, 'red')
const jogo = new Jogo()
jogo.loop()