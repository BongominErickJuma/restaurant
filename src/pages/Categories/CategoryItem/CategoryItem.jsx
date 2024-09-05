import { Link } from "react-router-dom";
import "./CategoryItem.css";

function CategoryItem({ category }) {
  return (
    <Link to="/restaurant/detail" state={category}>
      <li className="category">
        <picture>
          <source media="(max-width: 425px)" srcSet={category.image.mobile} />
          <source media="(min-width: 768px)" srcSet={category.image.tablet} />
          <source media="(min-width: 1024px)" srcSet={category.image.desktop} />
          <img
            className="category__image"
            src={category.image.desktop}
            alt={category.name}
          />
        </picture>

        <article className="category__text">
          <p className={`category__name heading-1`}>{category.category}</p>
        </article>
      </li>
    </Link>
  );
}

export default CategoryItem;
