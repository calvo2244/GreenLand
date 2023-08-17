import { PREV, NEXT, GET_ALL_PRODUCTS, GET_ALL_CATEGORIES, APPLY_FILTERS } from "./actionType";

const initialState = {
    numPageState   : 1,
    allProducts    : [],
    allCategories  : [],
    minPrice: 0,
    maxPrice:100,
    filterProducts : []
};

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case PREV:
            return {
                ...state,
                numPageState : state.numPageState - 1
            }

        case NEXT:
            return {
                ...state,
                numPageState : state.numPageState + 1
            }

        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts    : payload,
                filterProducts : payload
            }

        case GET_ALL_CATEGORIES:
            return {
                ...state,
                allCategories  : payload,
            }

        case APPLY_FILTERS:
            const { categories, minPrice, maxPrice, sortBy, bestSellers } = payload;
            let filteredProducts = state.allProducts;

            if (categories.length > 0 ) {
                filteredProducts = filteredProducts.filter(product => categories.includes(product.category.id));
            }
            filteredProducts = filteredProducts.filter(
                product => product.price >= minPrice && product.price <= maxPrice
            );

            if (bestSellers) {
                filteredProducts = filteredProducts.filter(product => product.bestSeller);
            }

            if (sortBy === 'priceLowtoHigh') {
                filteredProducts.sort((a, b) => a.price - b.price)
            } else if (sortBy === 'priceHighToLow') {
                filteredProducts.sort((a, b) => b.price - a.price);
            }
        
            return {
                ...state,
                filterProducts: filteredProducts,
                categories: categories,
                minPrice: minPrice,
                maxPrice: maxPrice,
                bestSellers: bestSellers,

/*
                filterProducts : [{
                    "id": 1,
                    "name": "EL EJEMPLO",
                    "description": "Cafetera de acero inoxidable para preparar café de manera sostenible",
                    "price": 19.99,
                    "stock": 50,
                    "image": "https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_640.png",
                    "active": true,
                    "category": {
                      "id": 1,
                      "name": "appliances",
                      "description": "Electrodomésticos"
                    }
                  }]*/
            }
        default: return { ...state };
    }
}
