const fs = require('node:fs');

const dataPath = './data/products.json';

module.exports = {
  getAllProducts: () => {
    try {
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      return data.products || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  getProductById: (id) => {
    try {
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      const product = data.products.find(p => p.id === id);
      return product;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  createProduct: (body) => {
    try {
      const { name, description, price } = body;

      if (!name || !description || !price) {
        return null;
      }

      const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      const newProduct = {
        id: data.latestSequenceId + 1,
        name,
        description,
        price: parseFloat(price)
      };

      data.products = [...data.products, newProduct];
      data.latestSequenceId = newProduct.id;

      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

      return newProduct;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  updateProduct: (id, body) => {
    try {
      const { name, description, price } = body;

      if (!name || !description || !price) {
        return null;
      }

      const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      const product = data.products.find(p => p.id === id);

      if (!product) {
        return null;
      }

      product.name = name;
      product.description = description;
      product.price = parseFloat(price);

      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

      return product;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  deleteProduct: (id) => {
    try {
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      const product = data.products.find(p => p.id === id);

      if (!product) {
        return null;
      }

      data.products = data.products.filter(p => p.id !== id);

      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

      return product;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};
