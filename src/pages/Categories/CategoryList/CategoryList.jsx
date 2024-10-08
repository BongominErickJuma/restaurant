import { useState, useEffect } from "react";
import CategoryItem from "../CategoryItem/CategoryItem";
import "./CategoryList.css";
import useFetch from "../../../hooks/useFetch";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const formData = {
    perPage: "50",
    orderBy: "asc",
  };

  const { data, error, loading } = useFetch(import.meta.env.VITE_CATEGORIES, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });
  useEffect(() => {
    if (data) {
      setCategories(data.results.data);
      console.log(data.results.data);
    }
  }, [data]);

  return (
    <>
      <ul className="menuList">
        {categories &&
          categories.map((menuItem) => (
            <CategoryItem key={menuItem.id} category={menuItem} />
          ))}
      </ul>
    </>
  );
};

export default CategoryList;
