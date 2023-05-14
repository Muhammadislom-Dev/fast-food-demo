import "./HomeContent.css";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import foods from "../../assets/data/food";
import Foodcard from "../Foodcard/Foodcard";
import { Context } from "../../context/orderFoods";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const HomeContent = () => {
  const { dishtype } = useParams();
  const { orderFoods, setOrderFoods } = useContext(Context);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("https://fastfood.dipsag.uz/api/products")
      .then((res) =>
        setProduct(
          res?.data?.data.filter((evt) => evt.category_id === dishtype)
        )
      )
      .catch((err) => console.log(err));
  }, [dishtype]);

  const addCardClick = () => {
    product.count = product?.count ? product?.count + 1 : 1;
    const uniqueArr = [...new Set([...orderFoods, product])];
    setOrderFoods(uniqueArr);
  };
  return (
    <div className="homecontent">
      <div className="container">
        {product.map((food) => (
          <Foodcard
            img={`https://fastfood.dipsag.uz/api/uploads/images/${food?.image_src}`}
            key={food.id}
            title={food.title_en}
            price={food.price}
            available={food.description_en}
            onClick={addCardClick}
          />
        ))}
      </div>
    </div>
  );
};
export default HomeContent;
