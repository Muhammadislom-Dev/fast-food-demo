import "./Navbar.css";
import Bscard from "../Lib/Bscard";
import { Link } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import SModal from "../Modal/Modal";
import { Context } from "../../context/orderFoods";
import { useContext, useState } from "react";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const Navbar = () => {
  let [count, setCount] = useState(1);
  const { orderFoods, setOrderFoods } = useContext(Context);
  const [korzinkaModal, setKorzinkaModal] = useState(false);

  const handleAddClass = (evt) => {
    const links = document.querySelectorAll(".navbar__link-active");
    links.forEach((link) => {
      link.classList.remove("navbar__link-active");
    });
    evt.currentTarget.classList.add("navbar__link-active");
  };
  function incrementCount() {
    count = count - 0 + 1;
    setCount(count);
  }
  function decrementCount() {
    if (count <= 0) {
      count = 1;
    }
    count = count - 1;
    setCount(count);
  }

  function openKorzinkaModal() {
    setKorzinkaModal(!korzinkaModal);
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setKorzinkaModal();
  };
  const handleClose = () => setOpen(false);

  const [nameValue, setNameValue] = useState("");
  const [numberValue, setNumberValue] = useState("");

  const [, setInvalidName] = useState(false);
  const [, setInvalidNumber] = useState(false);

  function changeNumber(item) {
    setNumberValue(item);
    setInvalidNumber(false);
  }

  function changeName(item) {
    setNameValue(item);
    setInvalidName(false);
  }

  let bot = {
    TOKEN: "6199941139:AAG5VGAAgU-h7bxiFFdZp5EUeQPnGbYiA1w",
    chatID: "-1001809300543",
    message: `
      Assalomu alaykum sizga yangi buyurtma xabari!%0A
      %0AIsmi 👤: ${nameValue}; 
      %0ATelefon raqami ☎: ${numberValue}`,
  };

  function sendMessage() {
    if (nameValue === "") {
      setInvalidName(true);
    } else if (numberValue === "") {
      setInvalidNumber(true);
    } else {
      fetch(
        `https://api.telegram.org/bot${bot.TOKEN}/sendMessage?chat_id=${bot.chatID}&text=${bot.message} `,
        {
          method: "GET",
        }
      ).then(
        (success) => {
          console.log("send message");
        },
        (error) => {
          console.log(error);
        }
      );

      setNameValue("");
      setNumberValue("");
      handleClose();
    }
  }

  console.log(orderFoods);
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar-left">
          <Link className="navbar-links">SFood</Link>
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link onClick={handleAddClass} className="navbar-link" to="/">
                Главная
              </Link>
            </li>
            <li className="navbar-item">
              <Link onClick={handleAddClass} className="navbar-link" to="/">
                Контакты
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-right">
          <button className="navbar-logo" onClick={() => openKorzinkaModal()}>
            <Bscard />
            {orderFoods.length > 0 && (
              <p>
                {orderFoods.map((food) => (
                  <span className="navbar-span">{food.count}</span>
                ))}
              </p>
            )}
          </button>
        </div>
      </div>

      <SModal className="modal" show={korzinkaModal}>
        <button className="close-btn" onClick={() => setKorzinkaModal()}>
          <IoCloseOutline />
        </button>
        <div className="modal-box">
          <ul className="modal-list">
            {orderFoods?.map((food) => (
              <li className="modal-item">
                <img
                  className="modal-img"
                  src={`https://fastfood.dipsag.uz/api/uploads/images/${food[0]?.image_src}`}
                />
                <p className="modal-title">{food[0]?.title_en}</p>
                <div className="modal-blok">
                  <button className="modal-minus" onClick={decrementCount}>
                    -
                  </button>
                  <span className="modal-count">{food?.count}</span>
                  <button className="modal-plus" onClick={incrementCount}>
                    +
                  </button>
                </div>
                <p className="modal-price">
                  {(food[0].price * food.count).toFixed(1)} сум
                </p>
                <button
                  className="modal-btn"
                  onClick={() => {
                    setOrderFoods(
                      orderFoods.filter((meal) => meal.id !== food[0].id)
                    );
                  }}>
                  <RiDeleteBinLine />
                </button>
              </li>
            ))}
            <div className="navbar-bottom">
              <Button onClick={handleOpen} variant="contained">
                Contact
              </Button>
            </div>
          </ul>
        </div>
      </SModal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <TextField
            value={nameValue}
            onChange={(e) => changeName(e.target.value)}
            size="large"
            placeholder="Name"
            className="navbar-input"
            sx={{ margin: "15px" }}
          />
          <TextField
            value={numberValue}
            onChange={(e) => changeNumber(e.target.value)}
            size="large"
            placeholder="Telefon raqam"
            className="navbar-input"
            sx={{ margin: "15px" }}
          />
          <Button
            sx={{ margin: "15px" }}
            variant="contained"
            onClick={() => sendMessage()}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Navbar;
