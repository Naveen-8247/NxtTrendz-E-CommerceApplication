import {useContext, useState} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {BsCheckCircle} from 'react-icons/bs'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  const {cartList} = useContext(CartContext)

  const totalQuantity = cartList.reduce(
    (acc, product) => acc + product.quantity,
    0,
  )

  const totalPrice = cartList.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  )

  const [selectedMethod, setSelectedMethod] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleConfirmOrder = () => {
    if (selectedMethod === 'cod') {
      setIsConfirmed(true)
    }
  }

  return (
    <div className="cart-summary-container">
      <h1 className="summary-heading">
        Order Total: <span className="total-price">Rs {totalPrice}/-</span>
      </h1>
      <p className="total-items">{totalQuantity} Items in cart</p>

      <Popup modal trigger={<button className="checkout-btn">Checkout</button>}>
        {close => (
          <div className="popup-wrapper">
            {!isConfirmed ? (
              <>
                <h2 className="popup-heading">Select Payment Method</h2>
                <div className="payment-options">
                  <label>
                    <input type="radio" name="payment" disabled /> Card
                  </label>
                  <label>
                    <input type="radio" name="payment" disabled /> Net Banking
                  </label>
                  <label>
                    <input type="radio" name="payment" disabled /> UPI
                  </label>
                  <label>
                    <input type="radio" name="payment" disabled /> Wallet
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={selectedMethod === 'cod'}
                      onChange={() => setSelectedMethod('cod')}
                    />
                    Cash on Delivery
                  </label>
                </div>

                <div className="summary-info">
                  <p>Items: {totalQuantity}</p>
                  <p>Total: Rs {totalPrice}/-</p>
                </div>

                <button
                  className="confirm-btn"
                  onClick={handleConfirmOrder}
                  disabled={selectedMethod !== 'cod'}
                >
                  Confirm Order
                </button>
              </>
            ) : (
              <div className="success-box">
                <BsCheckCircle className="success-icon" />
                <p className="success-text">
                  Your order has been placed successfully
                </p>
              </div>
            )}
          </div>
        )}
      </Popup>
    </div>
  )
}

export default CartSummary
