/*
Copyright:   Vladimir Vons, UA
Author:      Vladimir Vons <VladVons@gmail.com>
Created:     2023.11.07
*/


class TShoppingCart {
    constructor() {
        this.Items = {}
        this.storageId = this.constructor.name;
        this.loadFromStorage()
    }

    clear() {
        this.Items = {}
        this.saveToStorage()
    }

    getTotal() {
        var Qty = 0
        var Sum = 0
        for (var [key, val] of Object.entries(this.Items)) {
            Qty += val.Qty
            Sum += val.Qty * val.Price
        }
        return {'Qty': Qty, 'Sum': Sum}
    }

    saveToStorage() {
        localStorage.setItem(this.storageId, JSON.stringify(this.Items))
    }

    loadFromStorage() {
        let Data = localStorage.getItem(this.storageId)
        if (Data) {
            this.Items = JSON.parse(Data);
        }
    }

    itemAdd(aKey, aName, aPrice, aQty) {
        if (aKey in this.Items) {
            aQty += this.Items[aKey].Qty
        }
        this.itemSet(aKey, aName, aPrice, aQty)
    }

    itemDel(aKey) {
      delete this.Items[aKey]
      this.saveToStorage()
    }

    itemSet(aKey, aName, aPrice, aQty) {
        this.Items[aKey] = {'Name': aName, 'Price': aPrice, 'Qty': aQty}
        this.saveToStorage()
    }

    itemSetQty(aKey, aQty) {
        if (aQty >= 0) {
            this.Items[aKey].Qty = aQty
            this.saveToStorage()
        } else {
            //this.itemDel(aKey)
        }
    }
}

ShoppingCart = new TShoppingCart()
//ShoppingCart.clear()


function buildCart() {
    var Arr = [];
    for (var [key, val] of Object.entries(ShoppingCart.Items)) {
        const Data = `
            <tr>
                <td>${val.Name}</td>
                <td>${val.Price}</td>
                <td>
                    <div class='input-group'>
                        <input type='number' class='item-count form-control' data-name='${val.Name}' value='${val.Qty}'>
                    </div>
                </td>
                <td>${val.Qty * val.Price}</td>
                <td>
                    <button class='delete-item btn btn-danger' data-name="${val.Name}">X</button>
                </td>
            </tr>
        `
        Arr.push(Data)
    }

    var Total = ShoppingCart.getTotal()

    // // jQuery
    // $('.show-cart').html(Arr.join(''))
    // $('.total-cart').html(Total.Sum);
    // $('.total-count').html(Total.Qty)
    document.querySelector('.show-cart').innerHTML = Arr.join('')
    document.querySelector('.total-cart').innerHTML = Total.Sum
    document.querySelector('.total-count').innerHTML = ` ${Total.Qty} (${Total.Sum})`
}

// // item add (jQuery)
// $('.default-btn').click(function (event) {
//     event.preventDefault()
//     var name = $(this).data('name')
//     var price = Number($(this).data('price'))
//     ShoppingCart.itemAdd(name, name, price, 1)
//     buildCart()
// });
const defaultBtns = document.querySelectorAll('.default-btn');
defaultBtns.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
        event.preventDefault()
        const name = btn.getAttribute('data-name')
        const price = parseFloat(btn.getAttribute('data-price'))
        ShoppingCart.itemAdd(name, name, price, 1)
        buildCart()
        showAlert(name, 2000);
    })
})

// // item del (jQuery)
// $('.show-cart').on("click", ".delete-item", function (event) {
//     var name = $(this).data('name')
//     ShoppingCart.itemDel(name)
//     buildCart()
// })
const showCart = document.querySelector('.show-cart');
showCart.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-item')) {
        const name = event.target.getAttribute('data-name');
        ShoppingCart.itemDel(name)
        buildCart()
    }
})

// item count (jQuery)
// $('.show-cart').on("change", ".item-count", function (event) {
//     var name = $(this).data('name')
//     var qty = Number($(this).val())
//     ShoppingCart.itemSetQty(name, qty)
//     buildCart()
// });
showCart.addEventListener('change', function (event) {
    if (event.target.classList.contains('item-count')) {
        const name = event.target.getAttribute('data-name');
        const qty = event.target.value
        ShoppingCart.itemSetQty(name, qty)
        buildCart()
    }
})

// items clear (jQuery)
// $('.clear-all').click(function () {
//     ShoppingCart.clear();
//     buildCart();
// });
const clearAll = document.querySelector('.clear-all');
clearAll.addEventListener('click', function (event) {
    ShoppingCart.clear();
    buildCart();
})

const alertBox = document.getElementById('alert-box');
function showAlert(message, duration) {
    alertBox.innerText = message
    alertBox.style.display = 'block'

    setTimeout(function () {
        alertBox.style.display = 'none'
    }, duration)
}

buildCart()
