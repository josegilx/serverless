
const stringToHTML = (str) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(str, 'text/html')

    return doc.body.firstChild
}

const renderItem = (item)=> {
    const element = stringToHTML(`<li data-id="${item._id}"> ${item.name} </li>`)

    element.addEventListener('click',() => {
        const mealsList = document.getElementById('list-meals')
        Array.from(mealsList.children).forEach(x => x.classList.remove('selected'))
        element.classList.add('selected')
        const mealsIdInput = document.getElementById('id-meals-input')
        mealsIdInput.value = item._id
    })
    
    return element;
}

const renderOrder = (order, meals) => {
    const meal = meals.find(meal => meal._id === order.meal_id)
    const element = stringToHTML(`<li data-id="${order._id}"> ${meal.name} - ${order.user_id}</li>`)

    return element
}

window.onload = () => {
    const formOrdersId = document.getElementById('form-orders')
    formOrdersId.onsubmit = (e) => {
        e.preventDefault()

        const mealId = document.getElementById('id-meals-input')
        const mealIdValue = mealId.value
        if(!mealIdValue){
            alert('Debe seleccinar un plato')
            return
        }
        // console.log(mealId.value)
        const order = {
            // username: 'example'
            meal_id: mealIdValue,
            user_id: 'chamos triste',
        }

        const url = 'https://serverless.josegilramos.vercel.app/api/orders'
        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            // credentials: 'include',
            mode: 'cors', // no-cors, *cors, same-origin
            // redirect:'follow',
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin',//omit, same-origin
            // referrer: "no-referrer",
            headers:{
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(order)

        }).then(res=> console.log('Success:', res));
    }

    fetch('https://serverless.josegilramos.vercel.app/api/meals')
    .then(response => response.json())
    .then(data => {
        // console.log(data[1])
        const mealsList = document.getElementById('list-meals')
        const submitId = document.getElementById('id-submit')
        const listItems = data.map(renderItem)
        mealsList.removeChild(mealsList.firstElementChild)
        listItems.forEach(element => 
            mealsList.appendChild(element)
        )
        
        submitId.removeAttribute('disabled')
        fetch('https://serverless.josegilramos.vercel.app/api/orders')
        .then(response => response.json())
        .then(ordersData => {
            const ordersList = document.getElementById('list-orders')
            const listOrders = ordersData.map(orderData => renderOrder(orderData, data))
            ordersList.removeChild(ordersList.firstElementChild)
            listOrders.forEach(element => ordersList.appendChild(element))
            console.log(ordersData)
        })
    })
    
}