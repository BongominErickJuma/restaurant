import { useState, useEffect } from "react";
import MenuItem from "../MenuItem/MenuItem";
import styles from "./MenuList.module.css";
import useFetch from "../../../hooks/useFetch";
import { useLocation } from "react-router-dom";

function MenuList() {
  const [menu, setMenu] = useState([]);

  const location = useLocation();
  const id = location.state.id;

  const formData = {
    perPage: "4",
    relationship: "products",
    orderBy: "asc",
  };

  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_SINGLE_CATEGORY}/${id}`,
    {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    }
  );

  useEffect(() => {
    if (data && data.data && data.data.results && data.data.results.data) {
      setMenu(data.data.results.data);
    }
  }, [data]);
  if (loading) {
    return (
      <div className="container text-center">
        <p className="para-1">Loading...</p>
      </div>
    ); // Show loading message while data is being fetched
  }

  // if (error) {
  //   alert(` ${error}`); // Trigger alert with the error message
  // }

  if (error) {
    return (
      <div className="container text-center">
        <p className="para-1">Error: {error.message}</p>
      </div>
    ); // Show error message if there's a problem
  }

  return (
    <ul className={styles.menuList}>
      {menu.length > 0 ? (
        menu.map((menuItem) => (
          <MenuItem key={menuItem.id} menu={menuItem} />
        ))
      ) : (
        <div className="container text-center">
          <p className="para-1">Product not available</p>
        </div>
      )}
    </ul>
  );
}

export default MenuList;
