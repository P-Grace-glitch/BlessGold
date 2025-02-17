let label = document.getElementById('label');
let Shoppingcart = document.getElementById('shopping-cart');
let basket = JSON.parse(localStorage.getItem("Data")) || [];
let calculation =()=>{ 
  let cartIcon = document.getElementById("cartAmount") 
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0) 
}
calculation();

let generateCartItems = ()=>{ 
  if(basket.length !==0){ 
    return (Shoppingcart.innerHTML = basket.map((x) =>{
      console.log(x);
      let { id, item } = x;
      let search = shopItemsData.find((y) => y.id === id) || [];
      return ` 
        <div class="cart-item"> 
          <img width="120" src=${search.img} alt="" /> 
          <div class="details"> 
            <div class="title-price-x"> 
              <h4 class="title-price"> 
                <p>${search.name}</p> 
                <p class="cart-item-price">N${search.price}</p> 
              </h4> 
              <i onclick="removeItem(${id})" class='bx bx-x' ></i> 
            </div> 
            <div class="button"> 
              <i onclick="decrement(${id})" class='bx bx-minus'></i> 
              <div id=${id} class="quantity">${item}</div> 
              <i onclick="increment(${id})" class='bx bx-plus'></i> 
            </div> 
            <h3>$${item * search.price}</h3> 
          </div> 
        </div> 
      `;
    }).join(""));
  } else{
    Shoppingcart.innerHTML = `` 
    label.innerHTML = ` 
      <h2>Cart is Empty</h2> 
      <a href="shopcart.html"> 
        <button class="HomeBtn">Back to Shop</button> 
      </a> 
    `;
  }
}; 
generateCartItems();

let increment = (id)=>{ 
  let selectedItem = id;
  let search = basket.find((x)=> x.id === selectedItem.id);
  if (search === undefined){
    basket.push({ id: selectedItem.id, item: 1, })
  } else { 
    search.item += 1; 
  }
  update(selectedItem.id);
  generateCartItems();
  localStorage.setItem("Data", JSON.stringify(basket));
};

let decrement = (id)=>{ 
  let selectedItem = id;
  let search = basket.find((x)=> x.id === selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else { 
    search.item -= 1; 
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("Data", JSON.stringify(basket));
};

let update = (id)=>{ 
  let search = basket.find((x)=> x.id === id);
  //console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id)=>{ 
  let selectedItem = id;
  /* console.log(selectedItem.id); */
  basket = basket.filter((x)=>x.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  calculation();
  localStorage.setItem("Data", JSON.stringify(basket));
}

let clearCart = () => { 
  basket = [] 
  generateCartItems();
  calculation();
  localStorage.setItem("Data", JSON.stringify(basket));
  TotalAmount();
}

let TotalAmount = () => { 
    if (basket.length !== 0) {
      let amount = basket.map((x) => { 
        let {item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      }).reduce((x, y) => x + y, 0);
      let products = basket.map((x) => { 
        let {item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `${search.name} x ${item}`;
      }).join(", ");
      let orderData = {
        totalAmount: amount,
        products: products
      };
      localStorage.setItem("orderData", JSON.stringify(orderData));
      label.innerHTML = `
        <h2>Total Price: N${amount}</h2> 
        <a href="index.html"><button class="checkout">Check Out</button></a>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `;
    } else return;
  }; 
  TotalAmount();
  
