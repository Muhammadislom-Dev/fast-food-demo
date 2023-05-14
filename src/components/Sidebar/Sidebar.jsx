import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Sidebar = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("https://fastfood.dipsag.uz/api/categories")
      .then((res) => setCategory(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="sidebar">
      <div className="container">
        <ul className=" sidebar-list">
          {category?.map((evt) => (
            <li className="sidebar-item">
              <NavLink
                activeClassName="sidebar-links"
                className="sidebar-link"
                exact
                to={`/${evt?.id}`}>
                {evt?.name_en}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
