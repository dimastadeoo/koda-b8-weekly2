import {headerFooter} from './module/header-footer.js'
import {landing} from './componen/landing.js'
import {detailPage} from './componen/detail.js'
import {cartPage} from './componen/cart.js'
import {checkoutOne} from './componen/checkout-1.js'
import {checkoutTwo} from './componen/checkout-2.js'
import {checkoutThree} from './componen/checkout-3.js'
import {checkoutSuccess} from './componen/checkout-success.js'
import {allProducts} from './componen/all-produk.js'


document.addEventListener("DOMContentLoaded", async function () {
    const path = window.location.pathname;
    
    headerFooter()

    if(path.includes('landing-page.html')){
        landing()
    }else if(path.includes('detail-page.html')){
        detailPage()
    }else if(path.includes('cart.html')){
        cartPage()
    }else if(path.includes('browse-products.html')){
        allProducts()
    }else if(path.includes('checkout/step-1.html')){
        checkoutOne()
    }else if(path.includes('checkout/step-2.html')){
        checkoutTwo()
    }else if(path.includes('checkout/step-3.html')){
        checkoutThree()
    }else if(path.includes('checkout/success.html')){
        checkoutSuccess()
    }


})