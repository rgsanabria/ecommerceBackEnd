class ProductManager {
    constructor() {
        this.products = []
    }
}

getProducts() ;{
    return this.products
}

 getProductById(idProduct);{
    const product = this.products.find((p) => p.id ===idProduct)
    if (!product){
        return "Not found"
    }
    return product
 }

addProduct(product) ;{
    const{name,price,stock,code} = product
    if(!name || !price || !stock || !code){
        console.log('Data missing');
        return
    }
    const isCodeRepeat = this.product.some(p=>p.code === code)
    if(isCodeRepeat){
        console.log('Code already used');
        return
    }

    let id
    if (!this.products.length){
        id = 1
    } else {
        id = this.products[this.products.length - 1].id+1
    }
    const newProduct = {id,...product}
    this.products.push(newProduct)
    console.log('Product added');
    return newProduct

}

const manager1 = new ProductManager()
manager1.addProduct({
    name: 'Producto1',
    price: '100',
    code: 'a85954a',
    stock: 25,
})