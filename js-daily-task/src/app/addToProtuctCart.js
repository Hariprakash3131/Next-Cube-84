let cart = []

function addCart(name, price, color) {
    let product = {
        ProductName: name,
        ProductPrice: price,
        ProductColor: color
    }
    cart.push(product)
    console.log(cart)
}

addCart('Shirt', 500, 'pink')
addCart('Shoes', 8900, 'black')
addCart('Watch', 600, 'White')

console.log(cart[1].ProductColor)

console.log(cart.length)

