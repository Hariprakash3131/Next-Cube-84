let cart=[
    {id:1,name:"Phone"},
    {
        id:2,
        name:'laptop'
    }
]

function removeCart(id){
    cart=cart.filter((remove)=>
        remove.id!==id  )
        console.log(cart)
  
}

removeCart(2)