import { observable, computed } from "mobx"

export class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public tax: number) { }
}

export class Products {
  static all = [
    new Product(1, "Shirt", 1000, 0.05),
    new Product(2, "Jeans", 1500, 0.07),
  ]

  static find(id: number) {
    return this.all.find(p => p.id == id) as Product
  }
}

export class CartItem {
  @observable product = Products.all[0]
  @observable quantity = 1

  @computed get amount() {
    return this.product.price * this.quantity
  }

  @computed get tax() {
    return this.amount * this.product.tax
  }

  @computed get total() {
    return this.amount + this.tax
  }
}

export class Cart {
  items = observable<CartItem>([])
  @computed get total() {
    return this.items.map(item => item.total).reduce((prev, cur) => cur + prev, 0)
  }

  addItem() {
    this.items.push(new CartItem())
  }

  removeItem(item: CartItem) {
    this.items.remove(item)
  }
}