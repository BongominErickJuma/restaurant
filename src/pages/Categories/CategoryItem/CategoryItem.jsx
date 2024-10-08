import { Link } from "react-router-dom";
import "./CategoryItem.css";

function CategoryItem({ category }) {
  return (
    <Link to="/restaurant/detail" state={category}>
      <li className="category">
        <picture>
          <img
            className="category__image"
            src={`${import.meta.env.VITE_IMAGE}/${category.image}`}
            alt={category.name}
          />
        </picture>

        <article className="category__text">
          <p className={`category__name heading-1`}>{category.name}</p>
        </article>
      </li>
    </Link>
  );
}

export default CategoryItem;
