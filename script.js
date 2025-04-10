//criar múltiplos obstáculos comdistância variável entre eles
//deve colidir com qualquer um dos obstáculos
// destruir obstáculo quando chegar no final

const canvas = document.getElementById('JogoCanvas');
const ctx = canvas.getContext('2d');

document.addEventListener('keypress', (e) => { //função de pular ao pressionar espaço
    if(e.code=='Space'){
        personagi.saltar() //chama a função saltar já q não da pra mudar propriedade encapsulada
    }
})

class Entidade { // privar a propriedade y
    #x
    #y
    constructor(x, y, largura, altura, cor){
        this.#x = x;
        this.#y = y;
        this.largura = largura
        this.altura = altura
        this.cor = cor
    }
    desenhar(){
        ctx.fillStyle = this.cor
        ctx.fillRect(this.#x, this.#y, this.largura, this.altura)
    }
    get x (){
        return this.#x
    }
    set x (valor){
        //adicionar uma condição para verificar quem pode mexer
        this.#x = valor
    }
    get y (){
        return this.#y
    }
    set y (valor){
        //adicionar uma condição para verificar quem pode mexer
        this.#y = valor
    }
}

class Personagem extends Entidade{
    #velocidade_y //encapsulando(privando) a velocidade pro jogador não alterar a velocidade no console
    constructor(x, y, largura, altura, cor){
        super(x, y, largura, altura, cor)
        this.#velocidade_y = 0 //pulo do personagem
        this.pulando = false //personagem está parado
        this.imagem = new Image()
        this.imagem.src = '../mwalter.webp'
    }

    saltar(){
        if(this.pulando == false){
            this.#velocidade_y = 15
            this.pulando = true
        }
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
            obstacolo.x < personagi.x + personagi.largura &&
            obstacolo.largura + obstacolo.x > personagi.x &&
            personagi.y < obstacolo.y + obstacolo.altura &&
            personagi.y + personagi.altura > obstacolo.y
        ) {
            obstacolo.velocidade_x = 0;
            personagi.velocidade_y = 0;
            ctx.fillStyle = "black";
            ctx.font = '50px Arial';
            ctx.fillText('GAME OVER', 50, 100);
            Jogo.gameOver = true;
        }
    }
    desenhar(){
        ctx.drawImage(
            this.imagem,
            this.x,
            this.y,
            this.largura,
            this.altura,
        )
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
            this.#velocidade_x += 0.1 //e aumenta a velocidade
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
        if(Jogo.gameOver == false){
            ctx.clearRect(0,0, canvas.width, canvas.height)
        obstacolo.desenhar()
        personagi.desenhar()
        personagi.verificaColisao()
        obstacolo.atualizar()
        personagi.atualizar()
        requestAnimationFrame(this.loop)
        }
    }
}

const personagi = new Personagem(100, canvas.height - 50, 50, 50, 'white')
const obstacolo = new Obstaculo(canvas.width - 50, canvas.height - 100, 50, 100, 'red')
const jogo = new Jogo()
jogo.loop()