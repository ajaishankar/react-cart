import { observer } from "mobx-react"
import * as React from "react"
import { Input, Button, Table } from "reactstrap"
import { Products, CartItem, Cart } from "./models"

@observer
class CartItemView extends React.Component<{ item: CartItem, cart: Cart }> {
  handleProductChange = (event: any) => {
    this.props.item.product = Products.find(event.target.value)
  }

  handleQuantityChange = (event: any) => {
    let quantity = parseInt(event.target.value)
    this.props.item.quantity = isNaN(quantity) ? 0 : quantity
  }

  handleRemoveItem = () => this.props.cart.items.remove(this.props.item)

  render() {
    let item = this.props.item
    return (
      <tr>
        <td>
          <Button color="default" onClick={this.handleRemoveItem}><i className="fa fa-remove"></i></Button>
        </td>
        <td>
          <Input type="select" value={item.product.id} onChange={this.handleProductChange}>
            {Products.all.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </Input>
        </td>
        <td>
          <Input plaintext value={item.product.price.toFixed(2)} />
        </td>
        <td>
          <Input type="text" value={item.quantity == 0 ? '' : item.quantity} onChange={this.handleQuantityChange}></Input>
        </td>
        <td>
          <Input plaintext value={item.tax.toFixed(2)} />
        </td>
        <td>
          <Input plaintext value={item.total.toFixed(2)} />
        </td>
      </tr>
    )
  }
}

@observer
class CartView extends React.Component {
  cart = new Cart()

  handleAddItem = () => this.cart.addItem()

  render() {
    let widths = [
      { width: "5%" },
      { width: "10%" },
      { width: "5%" },
      { width: "5%" },
      { width: "5%" },
      { width: "10%" }
    ]
    return (
      <Table size="sm">
        <thead>
          <tr>
            <th style={widths[0]}>&nbsp;</th>
            <th style={widths[1]}>Product</th>
            <th style={widths[2]}>Price</th>
            <th style={widths[3]}>Quantity</th>
            <th style={widths[4]}>Tax</th>
            <th style={widths[4]}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {this.cart.items.map((item, index) => <CartItemView key={index} item={item} cart={this.cart}></CartItemView>)}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>
              <Button color="light" onClick={this.handleAddItem}><i className="fa fa-plus"></i> Add Item</Button>
            </td>
            <td>
              <h5><i className="fa fa-inr"></i> {this.cart.total.toFixed(2)}</h5>
            </td>
          </tr>
        </tfoot>
      </Table>
    )
  }
}

export default CartView;