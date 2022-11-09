//Recuperer touts les bouttons remove dans une variable de type tableau
let removeCartItem = document.getElementsByClassName('remove-button');
//console.log(removeCartItem);
//Parcourir les bouttons du tableau 
for (let i = 0; i<removeCartItem.length; i++) {
    let button = removeCartItem[i];
    //Ajouter un event au boutton remove
    button.addEventListener('click', removeItem)
}
function removeItem(event){
        //Le boutton remove est le petit fils de la div principale a supprimer, donc il faut mettre deux fois parentElement
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        // Mettre a jour le prix total
        updatePrice();
}
//Fonction qui met a jour le prix total
function updatePrice() {
//Recuperer la premiere classe du parent du prix
    let items = document.getElementsByClassName('cart-items')[0];
    console.log(items);
    let Rows = items.getElementsByClassName('cart-rows');
    let totalPrice = 0;
    for (let i =0; i<Rows.length;i++){
        let Row = Rows[i];
        let priceElement = Row.getElementsByClassName('cart-price')[0];
        let quantityElement = Row.getElementsByClassName('cart-button')[0];
        let price = parseFloat(priceElement.innerText.replace('$',''));
        console.log(price);
        var quantity = quantityElement.value;
        console.log(quantity);
        totalPrice += (price*quantity);
        totalPrice = Math.round(totalPrice * 100)/100;
        console.log(totalPrice);
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = totalPrice + '$';
}

// fonction qui met a jour le prix total au changement de la quantité dans le champ input

let inputQuantity = document.getElementsByClassName('cart-button');
for(let i =0; i <inputQuantity.length; i++ ){
    let input = inputQuantity[i];
    input.addEventListener('change', quantityChange)
}

function quantityChange(event){
    let button = event.target;
    if(isNaN(button.value) || button.value <=0){
        button.value = 1;
    }
    updatePrice();
}
// fonction pour ajouter un item au panier

let AddItem = document.getElementsByClassName('shop-item-button');
for (let i =0; i<AddItem.length; i++){
    let Add = AddItem[i];
    Add.addEventListener('click', function(event){
        let Item = event.target;
        let ShopItem = Item.parentElement.parentElement;
        let title = ShopItem.getElementsByClassName('shop-item-title')[0].innerText
        let price = ShopItem.getElementsByClassName('shop-item-price')[0].innerText;
        let image = ShopItem.getElementsByClassName('shop-item-image')[0].src;
        console.log(title, price, image);
        AddItemFinal(title, price, image);
        updatePrice();

    })
}

function AddItemFinal(title, price, image) {
    let cartRows = document.createElement('div');
    cartRows.classList.add('cart-rows');
    let CartItems = document.getElementsByClassName('cart-items')[0];
    let cartItemsTitles  = CartItems.getElementsByClassName('cart-item-title');
    let checkDouble = 0;
    for (let i =0; i<cartItemsTitles.length; i++){
        if (title == cartItemsTitles[i].innerText){
            alert("The Item is already in the cart");
            checkDouble = 1;
        }
    }
    if (checkDouble != 1){
        let cartRowContent = `
        <div class="cart-item">
                        <img src="${image}" alt="Levi" width="100" height="100">
                        <div class="cart-item-title">${title}</div>
                    </div>
                    <div class="cart-price">${price}</div>
                    <div class="cart-quantity">
                        <input class="cart-button" type="number" value="1"></input>
                        <button type="button" class="remove-button">REMOVE</button>
                    </div>
        ` ;
        cartRows.innerHTML = cartRowContent;
        CartItems.appendChild(cartRows);
        cartRows.getElementsByClassName('remove-button')[0].addEventListener('click',removeItem);
        cartRows.getElementsByClassName('cart-button')[0].addEventListener('change',quantityChange);
    }
}

//Purchase button

let purchase = document.getElementsByClassName('cart-purchase')[0];
purchase.addEventListener('click', purchaseFunction);

function purchaseFunction(event){
    alert("Thanks for your purchase, you will receive a confirmation soon");
    let cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updatePrice();
}