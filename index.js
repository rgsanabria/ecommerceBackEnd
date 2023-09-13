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
  
  
  const productManager = new ProductManager();
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
  