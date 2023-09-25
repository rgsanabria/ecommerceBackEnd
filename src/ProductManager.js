const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.productIdCounter = 1;
    this.loadProductsFromFile();
  }

  loadProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      this.products = JSON.parse(data);
      if (!Array.isArray(this.products)) {
        this.products = [];
      }
    } catch (err) {
      this.products = [];
    }
  }

  saveProductsToFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
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
    this.saveProductsToFile();
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

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      console.log("Producto no encontrado.");
      return;
    }

    this.products[index] = { ...this.products[index], ...updatedProduct };
    this.saveProductsToFile();
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      console.log("Producto no encontrado.");
      return;
    }

    this.products.splice(index, 1);
    this.saveProductsToFile();
  }
}


const productManager = new ProductManager("products.json");
productManager.addProduct({
  title: "Producto 1",
  description: "Descripción del Producto 1",
  price: 2999,
  thumbnail: "imagen1.jpg",
  code: "P1",
  stock: 100,
});
productManager.addProduct({
  title: "Producto 2",
  description: "Descripción del Producto 2",
  price: 2039,
  thumbnail: "imagen2.jpg",
  code: "P2",
  stock: 50,
});

console.log(productManager.getProducts());
console.log(productManager.getProductById(1));


productManager.updateProduct(1, { price: 2499 });
console.log(productManager.getProductById(1));


productManager.deleteProduct(2);
console.log(productManager.getProducts());
