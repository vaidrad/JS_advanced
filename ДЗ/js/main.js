const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


class ProductsList {
    constructor(cart, container = '.products'){
        this.cart = cart;
        this.container = container;
        this.goods = [];//массив товаров
        this.allProducts = [];//массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render();
                this._init();
            });
    }

    _getProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
    _init(){
        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('buy-btn')){
                this.cart.addProduct(e.target);
            }
        })
    }
}


class ProductItem {
    constructor(product, img = 'https://picsum.photos/200/150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn"
                    data-id="${this.id}"
                    data-price="${this.price}"
                    data-name="${this.title}">Купить</button>
                </div>
            </div>`
    }
}

class CartList {
    constructor(container ='.cart-block', url = "/getBasket.json"){
        this.container = container;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this._init();
    }
    _init(){
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        })
        document.querySelector(this.container).addEventListener('click', e => {
            if(e.target.classList.contains('del-btn')){
                this.removeProduct(e.target);
            }
        })
        this.getJson(this.url)
            .then(data => {
                this.goods = [...data.contents]
                console.log(this.goods)
                this.render();
            })
    }
    getJson(url){
        return fetch(`${API + url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new CartItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render())
        }
    }
    addProduct(element){
        this.getJson(`/addToBasket.json`)
            .then (data => {
                if(data.result === 1){
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id === productId)
                        if(find){
                            find.quantity++;
                            this._updateCart(find)
                        } else {//&&&&&&&&&&&&&&&&&&&&&&&&&???????????????????????????
                            let product = {
                                id_product: productId,
                                price: +element.dataset['price'],
                                product_name: element.dataset['name'],
                                quantity: 1
                            };
                            this.goods = [product];
                            this.render();
                        }
                } else {
                    alert('Error');
                }
            })
    }
    removeProduct(element){
        this.getJson(`/deleteFromBasket.json`)
            .then(data => {
                if(data.result === 1){
                    let productId = +element.dataset['id']
                    let find = this.allProducts.find(product => product.id === productId);
                    if(find.quantity > 1){
                        find.quantity--
                        this._updateCart(find);
                    } else{
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id= "${productId}"]`).remove();
                    }
                } else{
                    alert("error")
                }
            } )
    }
    _updateCart(product){
        let block = document.querySelector(`.cart-item[data-id="${product.id}"]`);
        block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `$${product.quantity*product.price}`;
    }
}

class CartItem extends ProductItem{
    constructor(product, img = 'https://picsum.photos/100/50'){
        super(product, img);
        this.product_name = product.product_name;
        this.quantity = product.quantity;
    }
    render(){
        return `<div class="cart-item" data-id="${this.id}">
                    <div class="product-bio">
                        <img src="${this.img}" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">${this.product_name}</p>
                            <p class="product-quantity">Quantity: ${this.quantity}</p>
                            <p class="product-single-price">$${this.price} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">$${this.quantity*this.price}</p>
                        <button class="del-btn" data-id="${this.id}">&times;</button>
                    </div>
                </div>`
    }
}

let cart = new CartList();
let list = new ProductsList(cart);


