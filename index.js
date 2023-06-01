// Write your code here...
function init () {
    const URL = 'http://localhost:3000/menu'
    fetch (URL)
    .then (response => response.json())
    .then (menuItems => menuItems.forEach(food => createMenu (food)))
}

function createMenu (food) {
    const menuDiv = document.querySelector('div#menu-items');
    const currentFood = document.createElement('span');
    //currentFood.setAttribute ('name',food.name);
    currentFood.textContent = food.name;
    menuDiv.appendChild(currentFood);

    if (food.id === 1) {
        displayFood(event,food);
    }

    currentFood.addEventListener ('click', (event) => displayFood(event,food));
}

let selectedFood = 1;

function displayFood(event,food) {
    const foodImg = document.querySelector ("img#dish-image");
    foodImg.src = food.image;
    const showFoodName = document.querySelector ("h3#dish-name");
    showFoodName.textContent = food.name;
    const foodDescription = document.querySelector('p#dish-description');
    foodDescription.textContent = food.description;
    const foodPrice = document.querySelector('h3#dish-price');
    foodPrice.textContent = '$'+food.price;
    const inCart = document.querySelector('span#number-in-cart');
    //inCart.textContent = food.number_in_bag;
    
    selectedFood = food.id;

    const URL = `http://localhost:3000/menu/${food.id}`
    fetch (URL)
    .then (response => response.json())
    .then (data => inCart.textContent = data.number_in_bag)
    .catch (error => alert(error.massage))
}

const addCartForm = document.querySelector("form#cart-form");
addCartForm.addEventListener('submit', (event) => addInCart(event,selectedFood));

function addInCart (event,foodId) {
    event.preventDefault();
    //console.log(event.target)
    //console.log(event.target['cart-amount'].value);
    const URL = `http://localhost:3000/menu/${foodId}`
    
    const inCartNow = +document.querySelector('span#number-in-cart').textContent;
    const addInCartAmount = +event.target['cart-amount'].value;

    const updatedCart = {"number_in_bag":inCartNow + addInCartAmount}

    if (addInCartAmount > 0 ) {
        fetch (URL, {
            method:"PATCH",
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(updatedCart)
        })
        .then (response => response.json())
        .then (data => {
            document.querySelector('span#number-in-cart').textContent = inCartNow + addInCartAmount;
            event.target['cart-amount'].value = '';
        })
        .catch (error => alert(error.massage))
    } else {
        event.target['cart-amount'].value = '';
        alert('You can\'t add negative number')
    }
}

init ();

