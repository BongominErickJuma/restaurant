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
        <source media="(max-width: 425px)" srcSet={menu.image.mobile} />
        <source media="(min-width: 768px)" srcSet={menu.image.tablet} />
        <source media="(min-width: 1024px)" srcSet={menu.image.desktop} />
        <img className="menu__image" src={menu.image.desktop} alt={menu.name} />
      </picture>
      {count < 1 ? (
        <AddToCartBtn menu={menu} />
      ) : (
        <IncrementDecrementBtn item={menu} count={count} />
      )}
      <article className="menu__text">
        <p className={`menu__name para-1`}>{menu.name}</p>
        <p className={`menu__price para-1`}>${menu.price.toFixed(2)}</p>
      </article>
    </li>
  );
}

export default MenuItem;
