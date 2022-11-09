//Recuperer touts les bouttons remove dans une variable de type tableau
let removeCartItem = document.getElementsByClassName('remove-button');
//console.log(removeCartItem);
//Parcourir les bouttons du tableau 
for (let i = 0; i<removeCartItem.length; i++) {
    let button = removeCartItem[i];
    //Ajouter un event au boutton remove
    button.addEventListener('click', function(event){
        //Le boutton remove est le petit fils de la div principale a supprimer, donc il faut mettre deux fois parentElement
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        // Mettre a jour le prix total
        updatePrice();
    })
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
        console.log(totalPrice);
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = totalPrice + '$';
}

