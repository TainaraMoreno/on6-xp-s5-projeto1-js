console.log('--------------------------------------')
console.log('     Projeto Carrinho de Compras     ')
console.log('--------------------------------------')

const db = require('./database')
const readline = require('readline-sync')

const {produtos} = db
produtos.sort((a, b) => a.preco - b.preco)
console.table(produtos)

const array = new Array () 
class Pedido {
  constructor(array){
    this.products = array 
    this.data = new Date()
    this.subtotal = 0 
  }
  calcularSubtotal() { 
    this.subtotal = this.products.reduce((acumulador, item) => acumulador + (item.preco * item.quantidade), 0)
  }
}

do {
  const entradaId = parseInt(readline.question('Digite o ID do produto desejado: ')) 
  const entradaQuantidade = parseInt(readline.question('Digite a quantidade: ')) 
  function procurar(produto){ 
    return produto.id === entradaId 
  }
  const produtoEncontrado = produtos.find(procurar)
  if(!produtoEncontrado){ 
    console.log('Produto não encontrado! Digite outro ID')
  }else{
    const produtoPedido= { ...produtoEncontrado, quantidade: entradaQuantidade} 
    array.push(produtoPedido) 
  }

  confirmar = readline.question('Você deseja comprar mais algum produto? (S/N) ')
}while (confirmar.toUpperCase() === 'S')

const pedido = new Pedido (array)
console.table(pedido.products) 

pedido.calcularSubtotal() 
console.log(pedido.subtotal) 


const cupom = parseInt(readline.question("´Possui cupom de desconto? Digite o valor: ")) 

const desconto = (cupom > 0 && cupom <= 15) ? pedido.subtotal * (cupom / 100) : 0
console.log(`Valor do desconto: R$ ${desconto}`)


const valorTotal = pedido.subtotal - desconto + tax
console.log(`Valor total: R$ ${valorTotal}`)