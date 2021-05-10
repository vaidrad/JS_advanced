/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/CartComponent.js":
/*!************************************!*\
  !*** ./public/js/CartComponent.js ***!
  \************************************/
/***/ (() => {

eval("// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';\nVue.component('cart', {\n  data() {\n    return {\n      cartUrl: '/getBasket.json',\n      cartItems: [],\n      showCart: false\n    };\n  },\n\n  mounted() {\n    this.$parent.getJson(`/api/cart`).then(data => {\n      for (let item of data.contents) {\n        item.imgPath = `img/cart/${item.id_product}.png`;\n        this.$data.cartItems.push(item);\n      }\n    });\n  },\n\n  methods: {\n    addProduct(item) {\n      let find = this.cartItems.find(el => el.id_product === item.id_product);\n\n      if (find) {\n        this.$parent.putJson(`/api/cart/${find.id_product}`, {\n          quantity: 1\n        }).then(data => {\n          if (data.result === 1) {\n            find.quantity++;\n          }\n        });\n      } else {\n        const prod = Object.assign({\n          quantity: 1\n        }, item);\n        this.$parent.postJson(`/api/cart`, prod).then(data => {\n          if (data.result === 1) {\n            this.cartItems.push(prod);\n          }\n        });\n      }\n    },\n\n    remove(item) {\n      let find = this.cartItems.find(el => el.id_product === item.id_product);\n      this.$parent.deleteJson(`api/cart/${find.id_product}`, {\n        quantity: 1\n      }).then(data => {\n        if (data.result === 1) {\n          if (item.quantity > 1) {\n            item.quantity--;\n          } else {\n            this.cartItems.splice(this.cartItems.indexOf(item), 1);\n          }\n        }\n      });\n    }\n\n  },\n  template: `<div>\n<button class=\"btn-cart\" type=\"button\" @click=\"showCart = !showCart\">Корзина</button>\n        <div class=\"cart-block\" v-show=\"showCart\">\n            <cart-item v-for=\"item of cartItems\" :key=\"item.id_product\" :img=\"item.imgPath\" :cart-item=\"item\" @remove=\"remove\">\n            </cart-item>\n        </div>\n        </div>\n    `\n});\nVue.component('cart-item', {\n  props: ['img', 'cartItem'],\n  template: `\n    <div class=\"cart-item\">\n                    <div class=\"product-bio\">\n                        <img :src=\"img\" alt=\"Some img\">\n                        <div class=\"product-desc\">\n                            <div class=\"product-title\">{{ cartItem.product_name }}</div>\n                            <div class=\"product-quantity\">Quantity: {{ cartItem.quantity }}</div>\n                            <div class=\"product-single-price\">$ {{ cartItem.price }} each</div>\n                        </div>\n                    </div>\n                    <div class=\"right-block\">\n                        <div class=\"product-price\">{{cartItem.quantity*cartItem.price}}</div>\n                        <button class=\"del-btn\" @click=\"$emit('remove', cartItem)\">&times;</button>\n                    </div>\n                </div>\n    `\n});\n\n//# sourceURL=webpack://project_express/./public/js/CartComponent.js?");

/***/ }),

/***/ "./public/js/ErrorComp.js":
/*!********************************!*\
  !*** ./public/js/ErrorComp.js ***!
  \********************************/
/***/ (() => {

eval("Vue.component('error', {\n  data() {\n    return {\n      text: ''\n    };\n  },\n\n  computed: {\n    isVisible() {\n      return this.text !== '';\n    }\n\n  },\n  template: `\n    <div class=\"error-block\" v-if=\"isVisible\">\n        <p class=\"error-msg\">\n        <button class=\"close-btn\" @click=\"text=''\">&times;</button>\n        {{ text }}\n</p>\n</div>\n    `\n});\n\n//# sourceURL=webpack://project_express/./public/js/ErrorComp.js?");

/***/ }),

/***/ "./public/js/FilterComp.js":
/*!*********************************!*\
  !*** ./public/js/FilterComp.js ***!
  \*********************************/
/***/ (() => {

eval("Vue.component('filter-el', {\n  data() {\n    return {\n      userSearch: ''\n    };\n  },\n\n  template: `<form action=\"#\" class=\"search-form\" @submit.prevent=\"$parent.$refs.products.filter(userSearch)\">\n                <input type=\"text\" class=\"search-field\" v-model=\"userSearch\">\n                <button type=\"submit\" class=\"btn-search\">\n                    <i class=\"fas fa-search\"></i>\n                </button>\n            </form>`\n});\n\n//# sourceURL=webpack://project_express/./public/js/FilterComp.js?");

/***/ }),

/***/ "./public/js/ProductComponent.js":
/*!***************************************!*\
  !*** ./public/js/ProductComponent.js ***!
  \***************************************/
/***/ (() => {

eval("Vue.component('products', {\n  data() {\n    return {\n      catalogUrl: '/catalogData.json',\n      filtered: [],\n      products: []\n    };\n  },\n\n  mounted() {\n    this.$parent.getJson(`/api/products`).then(data => {\n      for (let item of data) {\n        item.imgPath = `img/products/${item.id_product}.png`;\n        this.$data.products.push(item);\n        this.$data.filtered.push(item);\n      }\n    });\n  },\n\n  methods: {\n    filter(userSearch) {\n      let regexp = new RegExp(userSearch, 'i');\n      this.filtered = this.products.filter(el => regexp.test(el.product_name));\n    }\n\n  },\n  template: `<div class=\"products\">\n                <product v-for=\"item of filtered\" \n                :key=\"item.id_product\" \n                :img=\"item.imgPath\"\n                :product=\"item\"\n                @add-product=\"$parent.$refs.cart.addProduct\"></product>\n               </div>`\n});\nVue.component('product', {\n  props: ['product', 'img'],\n  template: `\n            <div class=\"product-item\">\n                <img :src=\"img\" alt=\"Some img\">\n                <div class=\"desc\">\n                    <h3>{{product.product_name}}</h3>\n                    <p>{{product.price}}</p>\n                    <button class=\"buy-btn\" @click=\"$emit('add-product', product)\">Купить</button>\n                </div>\n            </div>\n    `\n});\n\n//# sourceURL=webpack://project_express/./public/js/ProductComponent.js?");

/***/ }),

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/***/ (() => {

eval("const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';\nconst app = new Vue({\n  el: '#app',\n  data: {\n    userSearch: ''\n  },\n  methods: {\n    getJson(url) {\n      return fetch(url).then(result => result.json()).catch(error => {\n        // console.log(error)\n        this.$refs.error.text = error;\n      });\n    },\n\n    postJson(url, data) {\n      return fetch(url, {\n        method: 'POST',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => {\n        // console.log(error)\n        this.$refs.error.text = error;\n      });\n    },\n\n    putJson(url, data) {\n      return fetch(url, {\n        method: 'PUT',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => {\n        // console.log(error)\n        this.$refs.error.text = error;\n      });\n    },\n\n    deleteJson(url, data) {\n      return fetch(url, {\n        method: 'DELETE',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => {\n        this.$refs.error.text = error;\n      });\n    }\n\n  },\n\n  mounted() {}\n\n});\n\n//# sourceURL=webpack://project_express/./public/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_modules__["./public/js/main.js"]();
/******/ 	__webpack_modules__["./public/js/CartComponent.js"]();
/******/ 	__webpack_modules__["./public/js/ErrorComp.js"]();
/******/ 	__webpack_modules__["./public/js/FilterComp.js"]();
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/ProductComponent.js"]();
/******/ 	
/******/ })()
;