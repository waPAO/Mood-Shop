import data from './data.js'
const itemsContainer = document.querySelector('#items')
const itemList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')
console.log(itemList)
// the length of our data determines how many times this loop goes around
for (let i = 0; i < data.length; i += 1) {
	// create a new div element and give it a class name
	const newDiv = document.createElement('div');
	newDiv.className = 'item'

	// create an image element
	const img = document.createElement('img');
	img.src = data[i].image
	img.width = 300
	img.height = 300
	// Add the image to the div
	newDiv.appendChild(img)

    // create a paragraph element for a description
    const desc = document.createElement('P')
    desc.innerText = data[i].desc
    newDiv.appendChild(desc)

    // create a paragraph element for a price
    const price = document.createElement('P')
    price.innerText = data[i].price
    newDiv.appendChild(price)

    // Make a button 
    const button = document.createElement('button')
    // add an  id name to the button
    button.id = data[i].name
    // creates a custom attribute called data-price. That will hold price for each element in the button
    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)

	console.log(img)
	itemsContainer.appendChild(newDiv)

}
const all_items_button = Array.from(document.querySelectorAll("button"))
console.log(all_items_button)
all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
  }))
const cart = []
// ---------------------------------------------
// Handle change events on updte input
itemList.onchange = function(e) {
    if (e.target && e.target.classList.contains('update')) {
        const name = e.target.dataset.name
        const qty = parseInt(e.target.value)
        updateCart(name, qty)
    }
}

// ---------------------------------------------
// Handle clicks on list
itemList.onclick = function(e) {
    //console.log("clicked list")
    if (e.target && e.target.classList.contains('remove')) {
        const name = e.target.dataset.name //data-name = ""
        removeItem(name)
    }   else if (e.target && e.target.classList.contains('add-one')) {
            const name = e.target.dataset.name //data-name = ""
            addItem(name)
    }   else if (e.target && e.target.classList.contains('remove-one')) {
            const name = e.target.dataset.name //data-name = ""
            removeItem(name, 1)
    }
}

// Adds item to cart
function addItem(name, price) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            cart[i].qty += 1
            showItems()
            // stop here!
            return 
        }
    }
    const item = { name, price, qty: 1 }
    cart.push(item)
}

// ---------------------------------------------
// Displays items in console
function showItems() {
    const qty = getQty()
    //console.log(`You have ${qty} items in your cart`)
    cartQty.innerHTML = `You have ${qty} items in your cart`


    let itemStr = ''
    for (let i = 0; i < cart.length; i += 1) {
        //console.log(`- ${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
        /*
        const name = cart[i].name
        const price = cart[i].price
        const qty = cart[i].qty
        */
        const { name, price, qty } = cart[i]
        itemStr += `<li>
        ${name} $${price} x ${qty} = ${(qty * price).toFixed(2)} 
        <button class="remove" data-name="${name}">Remove</button>
        <button class="add-one" data-name="${name}"> + </button>
        <button class="remove-one" data-name="${name}"> - </button>
        <input class="update type="number" min="0" data-name="${name}">
        </li>`
    }
    itemList.innerHTML = itemStr

    //console.log(`Total in cart: $${getTotal()}`)
    cartTotal.innerHTML = `Total in cart: $${getTotal()}`
}

// ---------------------------------------------
// Returns total quantity of cart
function getQty() {
    let qty_total = 0
    for (let i = 0; i < cart.length; i += 1) {
        qty_total += cart[i].qty
    }
    return qty_total
}

// ---------------------------------------------
// Returns total cost of cart
function getTotal() {
    let total_cost = 0
    for (let i = 0; i < cart.length; i += 1) {
        total_cost += cart[i].price * cart[i].qty
    }

    return total_cost.toFixed(2)
}

// ---------------------------------------------
// Remove item form cart
function removeItem(name, qty = 0) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            if (qty > 0) {
                cart[i].qty -= qty
            }
            if (cart[i].qty < 1 || qty === 0 ) {
                cart.splice(i, 1)
            }
            showItems()
            return
        } 
    }
}

// ---------------------------------------------
// Updates Cart
function updateCart(name, qty) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            if (qty < 1) {
                removeItem(name)
                return
            }
            cart[i].qty = qty
            showItems()
            return
        }
    }
}
