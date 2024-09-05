import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import MenuItem from "../MenuItem/MenuItem";
import styles from "./MenuList.module.css";

// DUMMY SERVER
// const BASE_URL = "http://localhost:8000/desserts";

function MenuList() {
  const [menu, setMenu] = useState([]);

  const fetchMenu = useCallback(async () => {
    try {
      // const res = await fetch(BASE_URL);
      // const data = await res.json();
      // setDesserts(data);

      const res = await fetch(`${import.meta.env.BASE_URL}/data/data.json`);
      const data = await res.json();
      setMenu(data.menu);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  return (
    <ul className={styles.menuList}>
      {menu.map((menuItem) => (
        <MenuItem key={menuItem.name} menu={menuItem} />
      ))}
    </ul>
  );
}

export default MenuList;
