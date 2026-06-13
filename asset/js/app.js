
requirejs.config({
    baseUrl: '/asset/js',
    paths: {
        jquery: 'https://code.jquery.com/jquery-4.0.0.min',
        headerFooter: 'module/header-footer'
    }
});

const path = window.location.pathname.toLowerCase();

if (path.includes('landing-page.html')) {
    requirejs(['componen/landing'])
} else if (path.includes('detail-page.html')) {
    requirejs(['componen/detail'])
} else if (path.includes('cart.html')) {
    requirejs(['componen/cart'])
} else if (path.includes('browse-products.html')) {
    requirejs(['componen/all-produk'])
} else if (path.includes('checkout/step-1.html')) {
    requirejs(['componen/checkout-1'])
} else if (path.includes('checkout/step-2.html')) {
    requirejs(['componen/checkout-2'])
} else if (path.includes('checkout/step-3.html')) {
    requirejs(['componen/checkout-3'])
} else if (path.includes('checkout/success.html')) {
    requirejs(['componen/checkout-success'])
}

if (path === "/" || path.endsWith("index.html")) {
    window.location.replace("/main/landing-page.html")
}

