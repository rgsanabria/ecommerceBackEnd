class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
    }
  
    addProduct(product) {
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        console.log("Todos los campos son obligatorios.");
        return;
      }
  
      if (this.products.some((p) => p.code === product.code)) {
        console.log("El campo 'code' ya existe. Debe ser único.");
        return;
      }
  
      product.id = this.productIdCounter++;
      this.products.push(product);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find((p) => p.id === id);
      if (!product) {
        console.log("Producto no encontrado.");
      }
      return product;
    }
  }
  
  
  const ProductManager = new ProductManager();
  ProductManager.addProduct({
    title: "Producto 1",
    description: "Descripción del Producto 1",
    price: 2999,
    thumbnail: "imagen1.jpg",
    code: "P1",
    stock: 100,
  });
  ProductManager.addProduct({
    title: "Producto 2",
    description: "Descripción del Producto 2",
    price: 2039,
    thumbnail: "imagen2.jpg",
    code: "P2",
    stock: 50,
  });
  
  console.log(ProductManager.getProducts());
  console.log(ProductManager.getProductById(1));
  
  
  
  
  const express = require("express");
  const ProductManager = require("./ProductManager");
  
  const app = express();
  const port = 3000;
  
  const ProductManager = new ProductManager("src/products.json");
  
  app.use(express.json());
  
  app.get("/products", async (req, res) => {
    const { limit } = req.query;
    const products = await productManager.getProducts();
  
    if (limit) {
      res.json(products.slice(0, parseInt(limit)));
    } else {
      res.json(products);
    }
  });
  
  app.get("/products/:pid", async (req, res) => {
    const { pid } = req.params;
    const product = await productManager.getProductById(parseInt(pid));
  
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado." });
    }
  });
  
  app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
  });
  