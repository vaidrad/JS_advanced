const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        allproducts: [],
        imgCatalog: 'https://picsum.photos/200/150',
        imgBasket: 'https://picsum.photos/100/50',
        userSearch: '',
        show: false,
        basket: []
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product){
            let find = this.basket.find(item => item.id_product === product.id_product);
            if(find){
                find.quantity++;
            } else{
                let baketProduct = {
                    id_product: product.id_product,
                    price: product.price,
                    product_name: product.product_name,
                    quantity: 1
                }
                this.basket.push(baketProduct);
            }
        }, 
        removeProduct(product){
            if(product.quantity>1){
                product.quantity--;
            } else{
                this.basket.splice(this.basket.indexOf(product), 1);
            }
        },  
        useFilter(){
            const regexp = new RegExp(this.userSearch, 'i');
            this.products = this.allproducts.filter(product => regexp.test(product.product_name));
        }
    },
    mounted(){
       this.getJson(`${API + this.catalogUrl}`)
           .then(data => {
               for(let el of data){
                   this.allproducts.push(el);
                   this.products.push(el);
               }
           });
    }
})