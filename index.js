import menuArray from './data.js'
const orderArray = []
const orderPreview = document.getElementById('orderPreview')
const modal = document.getElementById('modal')
const confirmMsg = document.getElementById('confirm-msg')
const customerName = document.getElementById('customer-name')

function renderMenuItems(menuArr) {
    return menuArr.map(item => {
        const {name, ingredients, price, emoji, id} = item
        return `
        <div class="card">
            <div class="card-left">
                <div class="card-emoji">${emoji}</div>
                <div class="card-info">
                    <h2>${name}</h2>
                    <p>${ingredients.join(', ')}</p>
                    <h3>$${price}</h3>
                </div>
            </div>
            <button class="order-btn" data-add="${id}">+</button>
        </div>
        `
    }).join('')
}

document.getElementById('menuItems').innerHTML = renderMenuItems(menuArray)

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        addToOrderArr(Number(e.target.dataset.add))
        }
})

document.addEventListener('click', function(e){
    if(e.target.dataset.remove){
        removeFromOrderArr(Number(e.target.dataset.remove))
        }
})

function addToOrderArr(itemId){
    const targetItem = menuArray.filter(function(menuItem){
        return menuItem.id === itemId
    })
    const orderObj = {
        name: targetItem[0].name,
        price: targetItem[0].price,
        id: targetItem[0].id
    }
    orderArray.push(orderObj)
    document.getElementById('orderPreview').innerHTML = renderOrderItems(orderArray)
}

function removeFromOrderArr(itemId){
    const targetIndex = orderArray.findIndex(orderItem => {
        return orderItem.id === itemId
    })

    if (targetIndex !== -1) {
        orderArray.splice(targetIndex, 1)
    }
    document.getElementById('orderPreview').innerHTML = renderOrderItems(orderArray)
}

function renderOrderItems(orderArr) {
    const title = '<h2 class="order-summary-title">Your Order</h2>'
    const orderItems = orderArr.map(item => {
        const {name, price, id} = item
        return `
        <div class="order-list">
            <div class="item-name">
                <h2>${name}</h2>
                <button class="remove-btn" data-remove="${id}">remove</button>
            </div>
            <h2>$${price}</h2>
        </div>
        `}).join('')

    const totalOrderPrice = orderArr.reduce((total, currentItem) => {
        return total + currentItem.price
    }, 0)

    const orderTotal = `
        <div class="order-total">
            <h2>Total Price:</h2>
            <h2>$${totalOrderPrice}</h2>
        </div>
    `

    const confirmBtn = `
        <button id="confirm-btn" class="green-btn">Complete Order</button>
    `

    if (orderArray.length === 0){
        return ''
    } else {
        return title + orderItems + orderTotal + confirmBtn
    }
}

document.addEventListener('click', function(e){
    if (e.target.id === 'confirm-btn') {
        modal.style.display = 'inline'
    }
})

document.addEventListener('click', function(e){
    if (e.target.id === 'close-btn') {
        modal.style.display = 'none'
    }
})

document.addEventListener('click', function(e){
    if (e.target.id === 'pay-btn') {
        e.preventDefault()
        confirmMsg.innerHTML = `
            <h1>Thanks, ${customerName.value}! Your order is on its way!</h1>
        `
        confirmMsg.style.display = 'block'
        console.log('Confirm message display set to block') // Debug log
        modal.style.display = 'none'
        orderPreview.innerHTML = ''
        orderArray.length = 0

        document.querySelector('form').reset()
        
        setTimeout(() => {
            confirmMsg.style.display = 'none'           
        }, 3000)
    }
})


