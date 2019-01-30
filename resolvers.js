const _ = require("lodash");

// example data
const products = [
  { id: 1, title: "Blue T-Shirt", thumbnail: "blue-t-shirt_350x.jpg" },
  { id: 2, title: "Bright Red Purse", thumbnail: "bright-red-purse_350x.jpg" },
  {
    id: 3,
    title: "Black Fashion Backpack",
    thumbnail: "black-fashion-backpack_350x.jpg"
  },
  { id: 4, title: "Lemon Purse", thumbnail: "lemon-purse_350x.jpg" }
];

const reviews = [
  { productId: 1, count: "3", average: 4.4 },
  { productId: 2, count: "0", average: 0 },
  { productId: 3, count: "12", average: 4.8 },
  { productId: 4, count: "6", average: 3.5 }
];

let offers = [
  { productId: 1, reseller: "Fashion Giant", price: 8.88 },
  { productId: 1, reseller: "Outlet Fashion", price: 10 },
  { productId: 2, reseller: "Fashion Giant", price: 48.95 },
  { productId: 3, reseller: "Fashion Giant", price: 35 },
  { productId: 3, reseller: "Outlet Fashion", price: 37.5 },
  { productId: 3, reseller: "Fashion Store", price: 40 },
  { productId: 1, reseller: "Fashion Giant", price: 10 }
];

const resolvers = {
  Query: {
    products: () => products,
    product: (parent, { id }) => _.find(products, { id })
  },

  Mutation: {
    addOffer: (parent, { productId, reseller, price }) => {
      const product = _.find(products, { id: productId });
      if (!product) {
        throw new Error(`Couldn't find product ${productId}`);
      }

      const newOffer = {
        productId,
        reseller,
        price
      };

      offers = [...offers, newOffer];

      return newOffer;
    }
  },

  Product: {
    reviews: product => _.find(reviews, { productId: product.id }),
    offers: product => _.filter(offers, { productId: product.id })
  }
};

module.exports = resolvers;
