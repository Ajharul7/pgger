import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Button, Menu, MenuItem } from "@mui/material";
import { UserContext } from "../App";
import { AccountCircle } from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import MyPoster from "../asset/about1.png";
import "../styles/aboutus.css";

const AboutUs = () => {
  //pull user detials from backend
  const userContext = useContext(UserContext);

  //Logout arrow
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const myWhatsapp = () => {
    window.open("https://wa.me/+918471987717");
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    await fetch("/api/logout", {
      method: "DELETE",
    });
    window.location.href = "/";
  };

  return (
    <>
      <div className="web-title-res">
        <Link
          sx={{ color: "inherit", textDecoration: "none" }}
          component={RouterLink}
          to={`/`}
          className="a"
        >
          {" "}
          <h1 className="web-title">PGGER</h1>
        </Link>
        <div className="arrow-button-div">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              minWidth: "0px",
              color: "#1c1c1c",
              "@media screen and (max-width: 600px)": {
                paddingTop: "0px",
                paddingLeft: "3px",
                fontSize: "12px",
              },
            }}
            className="button-arrow"
          >
            ▼
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={handleLogout}
              style={{
                fontFamily: "Poppins",
                fontWeight: "500",
                backgroundColor: "#F2FAFF",
              }}
            >
              Log Out
            </MenuItem>
          </Menu>
        </div>
        <h1 className="username-css">{userContext.name}</h1>
        <AccountCircle
          sx={{
            fontSize: "60px",
            color: "#1c1c1c",
            float: "right",
            marginLeft: "0px",
            paddingTop: "29px",
            width: "0.65em",
            height: "1em",
            "@media screen and (max-width: 600px)": {
              paddingTop: "0px",
              fontSize: "46px",
              paddingTop: "11px",
            },
          }}
        />
      </div>
      <hr className="top-hr" />
      <div className="about-div">
        <div className="about-div-child-3">
          <img src={MyPoster} alt="" className="about-svg" />
        </div>
        <div className="about-div-child-1">
          <h1 className="h1-aboutus">ABOUT US</h1>
          <h4 className="h4-aboutus">
            Our Website mainly aims to connect users to the local Paid Guest(PG)
            in Silchar. We provide a simple user friendly way to register to any
            PG in Silchar. A user can easily view the PG's photos,reviews and
            register to any PG to his/her liking.
            <br />
            We also have a review system for each of the PG. A user can read the
            reviews and decide which PG will be more preferable to them.
          </h4>
          <Button
            onClick={myWhatsapp}
            sx={{
              marginTop: "3%",
              textTransform: "none",
              fontSize: "20px",
              fontFamily: "Poppins",
              width: "11em",
              height: "3.5em",
              background: "#3ab757",
              color: "white",
              fontWeight: "600",
              "&:hover": {
                background: "#74f2ce",
                color: "white",
              },
              "@media screen and (max-width: 600px)": {
                width: "10em",
                fontSize: "15px",
              },
            }}
          >
            Contact Us &nbsp;
            <WhatsAppIcon
              sx={{
                fontSize: "30px",
                paddingBottom: "2px",
                "@media screen and (max-width: 600px)": {
                  fontSize: "25px",
                  paddingBottom: "0px",
                },
              }}
            />
          </Button>
        </div>
        <div className="about-div-child-2">
          <img src={MyPoster} alt="" className="about-svg" />
        </div>
      </div>
    </>
  );
};

export default AboutUs;
