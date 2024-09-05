import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import CategoryItem from "../CategoryItem/CategoryItem";
import "./CategoryList.css";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
    try {
      // const res = await fetch(BASE_URL);
      // const data = await res.json();
      // setMenu(data);

      const res = await fetch(`${import.meta.env.BASE_URL}/data/data.json`);
      const data = await res.json();
      setCategories(data.menu);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <>
      <ul className="menuList">
        {categories.map((menuItem) => (
          <CategoryItem key={menuItem.name} category={menuItem} />
        ))}
      </ul>
    </>
  );
};

export default CategoryList;
