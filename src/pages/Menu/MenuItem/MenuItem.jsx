import useCart from "../../../hooks/useCart";
import AddToCartBtn from "../../../components/AddToCartBtn/AddToCartBtn";
import IncrementDecrementBtn from "../../../components/IncrementDecrementBtn/IncrementDecrementBtn";
import "./MenuItem.css";

function MenuItem({ menu }) {
  const { cart } = useCart();

  const targetCartItemIndex = cart.findIndex(
    (cartItem) => cartItem.name === menu.name
  );
  const targetCartItem = cart[targetCartItemIndex];
  const count = targetCartItem?.count || 0;

  return (
    <li className="menu">
      <picture>
        <img
          className="menu__image"
          src={`${import.meta.env.VITE_IMAGE}/${menu.image}`}
          alt={menu.name}
        />
      </picture>
      {count < 1 ? (
        <AddToCartBtn menu={menu} />
      ) : (
        <IncrementDecrementBtn item={menu} count={count} />
      )}
      <article className="menu__text">
        <p className={`menu__name para-1`}>{menu.name}</p>
        <p className={`menu__price para-1`}>${menu.price}</p>
      </article>
    </li>
  );
}

export default MenuItem;
