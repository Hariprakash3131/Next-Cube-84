// let cart=[
//     {id:1,name:"Phone"},
//     {
//         id:2,
//         name:'laptop'
//     }
// ]

// function removeCart(ids){
//     cart=cart.filter((remove)=>
//         remove.id!==ids)
//         console.log(cart)
// }

// removeCart(2)



let product=[
    {
        id:1,
        name:"Tab",
        price:90000
    }
    ,{
        id:2,
        name:"Laptop",
        price:60000
    },
    {
        id:3,
        name:"Shoes",
        price:800
    }
]


function removeProduct(name){
    productz=product.filter((removeP)=>removeP.name!==name)
    console.log(productz)
}

removeProduct("Laptop")