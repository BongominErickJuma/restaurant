import { useState, useEffect } from "react";
import MenuItem from "../MenuItem/MenuItem";
import styles from "./MenuList.module.css";
import useFetch from "../../../hooks/useFetch";

function MenuList() {
  const [menu, setMenu] = useState([]);

  const formData = {
    perPage: "50",
    orderBy: "asc",
  };

  const { data } = useFetch(import.meta.env.VITE_PRODUCTS, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });
  useEffect(() => {
    if (data) {
      setMenu(data.results.data);
      console.log(data.results.data);
    }
  }, [data]);

  return (
    <ul className={styles.menuList}>
      {menu.map((menuItem) => (
        <MenuItem key={menuItem.id} menu={menuItem} />
      ))}
    </ul>
  );
}

export default MenuList;
