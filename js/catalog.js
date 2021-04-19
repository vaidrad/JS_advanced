const products =[
    {id: 1, title: "ELLERY X M'O CAPSULE", price: "$52.00", image: "images/featured1.jpg"},
    {id: 2, title: "ELLERY X M'O CAPSULE", price: "$52.00", image: "images/catalog_item_2.jpg"},
    {id: 3, title: "ELLERY X M'O CAPSULE", price: "$52.00", image: "images/featured3.jpg"},
    {id: 4, title: "ELLERY X M'O CAPSULE", price: "$52.00", image: "images/featured4.jpg"},
    {id: 5, title: "ELLERY X M'O CAPSULE", price: "$52.00", image: "images/catalog_item_5.jpg"},
    {id: 6, title: "ELLERY X M'O CAPSULE", price: "$52.00", image: "images/catalog_item_6.jpg"},
    {id: 7, title: "ELLERY X M'O CAPSULE", price: "$52.00", image: "images/catalog_item_7.jpg"},
    {id: 8, title: "ELLERY X M'O CAPSULE", price: "$52.00", image: "images/catalog_item_8.jpg"},
    {id: 9, title: "ELLERY X M'O CAPSULE", price: "$52.00", image: "images/catalog_item_9.jpg"}
]

const renderProduct = item => {
    return ` <div class="catalog_items">
                <div class="catalog_image">
                    <img src=${item.image} alt="catalog_item">
                </div>
                <div class="overlay">
                    <button class="add_to_Cart"><img src="images/white_cart.svg" alt="White_cart">Add to Cart</button>
                </div>
                <p class="item_h">${item.title}</p>
                <p class="item_p">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                <p class="item_price">${item.price}</p>
            </div>`
};

const renderPage = list => {
    let productList = list.map(position => renderProduct(position));
    // document.querySelector('.catalog').innerHTML = productList;
    let place = document.querySelector('.catalog');
    productList.forEach(element => {
        place.insertAdjacentHTML('beforeend', element);
    });
}

renderPage(products);