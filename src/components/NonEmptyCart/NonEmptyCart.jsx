import useCart from "../../hooks/useCart";
import CartItem from "../../pages/Cart/CartItem/CartItem";
import "./NonEmptyCart.css";

function NonEmptyCart() {
  const { cart, handleConfirmOrder } = useCart();
  const total = cart.reduce((acc, curr) => acc + curr.price * curr.count, 0);

  return (
    <>
      <ul className="cartContainer">
        {cart.map((cartItem) => (
          <CartItem key={cartItem.name} cartItem={cartItem} />
        ))}
      </ul>
      <section className="cart__totalContainer">
        <p className="cart__totalContainer__text para-2">Order Total</p>
        <p className={`cart__totalContainer__total heading-2`}>
          ${total.toFixed(2)}
        </p>
      </section>
      <section className={`cart__carbon`}>
        <img
          src={`${import.meta.env.BASE_URL}/images/icon-carbon-neutral.svg`}
          alt="icon carbon"
        />

        <p className="para-2">
          This is a <strong>Delivery type</strong> delivery
        </p>
      </section>
      <button
        className={`cart__confirmBtn para-1`}
        onClick={(e) => {
          e.preventDefault();
          handleConfirmOrder();
        }}
      >
        Confirm Order
      </button>
    </>
  );
}

export default NonEmptyCart;
