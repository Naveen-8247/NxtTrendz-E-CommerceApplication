// CartListView.js
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'
import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      const onClickRemoveAll = () => {
        removeAllCartItems()
      }

      return (
        <>
          <div className="cart-header">
            <h1 className="cart-heading">My Cart</h1>
          </div>
          <button
            className="remove-all-btn"
            type="button"
            onClick={onClickRemoveAll}
          >
            Remove All
          </button>
          <ul className="cart-list">
            {cartList.map(eachItem => (
              <CartItem key={eachItem.id} cartItemDetails={eachItem} />
            ))}
          </ul>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
