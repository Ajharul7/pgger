import React, { useContext, useState, useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Button, Stack, Menu, MenuItem } from "@mui/material";
import { UserContext } from "../App";
import data from "../constant/data.json";
import Features from "./pgpages/features.js";
import About from "./pgpages/about.js";
import Reviews from "./pgpages/reviews";
import Feenfood from "./pgpages/feenfood";

import SimpleImageSlider from "react-simple-image-slider";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { RWebShare } from "react-web-share";
import "../styles/pg.css";
import {
  DirectionsOutlined,
  AppRegistration,
  StarBorderOutlined,
  ShareOutlined,
  AccountCircle,
  StarRate,
} from "@mui/icons-material";

//pop kha items
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMediaQuery } from "react-responsive";

const PG = () => {
  // shows the features,about,etc
  const [isShown, setIsShown] = useState(true);
  const [isShown1, setIsShown1] = useState(false);
  const [isShown2, setIsShown2] = useState(false);
  const [isShown3, setIsShown3] = useState(false);

  // border-bottom line for features,about etc
  const [style, setStyle] = useState("about-button");
  const [style1, setStyle1] = useState("features-button1");
  const [style2, setStyle2] = useState("reviews-button");
  const [style3, setStyle3] = useState("feenfood-button");

  const ref = useRef(null);

  //pull user detials from backend
  const userContext = useContext(UserContext);

  //Logout arrow
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  //logout arrow functions
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //showing the features,about , etc functions
  const handleClick1 = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);

    // 👇️ or simply set it to true
    setIsShown(true);
    setIsShown1(false);
    setIsShown2(false);
    setIsShown3(false);

    // features , about etc css change function(implement here to onClick on 1 function)
    changeStyle1();
  };
  const handleClick2 = (event) => {
    // 👇️ toggle shown state
    setIsShown1((current) => !current);

    // 👇️ or simply set it to true
    setIsShown1(true);
    setIsShown(false);
    setIsShown2(false);
    setIsShown3(false);

    // features , about etc css change function(implement here to onClick on 1 function)
    changeStyle();
  };
  const handleClick3 = (event) => {
    // 👇️ toggle shown state
    setIsShown2((current) => !current);

    // 👇️ or simply set it to true
    setIsShown2(true);
    setIsShown(false);
    setIsShown1(false);
    setIsShown3(false);
    // features , about etc css change function(implement here to onClick on 1 function)
    changeStyle2();
    ref.current?.scrollIntoView({ behavior: "smooth" });
    // var clickme = setTimeout(() => {
    //   ref.current.click();
    //   console.log("aa");
    // }, 500);
    // setTimeout(() => {
    //   clearInterval(clickme);
    // }, 600);
  };
  const handleClick4 = (event) => {
    // 👇️ toggle shown state
    setIsShown3((current) => !current);

    // 👇️ or simply set it to true
    setIsShown3(true);
    setIsShown(false);
    setIsShown1(false);
    setIsShown2(false);
    // features , about etc css change function(implement here to onClick on 1 function)
    changeStyle3();
  };

  // features , about etc css change function
  const changeStyle = () => {
    setStyle("about-button1");
    setStyle1("features-button");
    setStyle2("reviews-button");
    setStyle3("feenfood-button");
  };
  const changeStyle1 = () => {
    setStyle1("features-button1");
    setStyle("about-button");
    setStyle2("reviews-button");
    setStyle3("feenfood-button");
  };
  const changeStyle2 = () => {
    setStyle2("reviews-button1");
    setStyle1("features-button");
    setStyle("about-button");
    setStyle3("feenfood-button");
  };
  const changeStyle3 = () => {
    setStyle3("feenfood-button1");
    setStyle2("reviews-button");
    setStyle1("features-button");
    setStyle("about-button");
  };
  const [reviewData, setReviewData] = useState();
  useEffect(() => {
    fetch("/api/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setReviewData(actualData);
      });
  }, []);

  //spacing responsive
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  //pull the href to match the json(acha dimaag laga idar)
  const id1 = window.location.pathname; //localhost ke baki kha part nikal tha hai
  const idd = id1.replace("/pg/", ""); // baki kha part ko delete karke sirf json kha id lia
  const id = parseInt(idd);

  const starratingadd =
    reviewData &&
    reviewData
      .filter((rew) => {
        if (rew.pgid === idd) {
          return rew;
        } else {
          return 0;
        }
      })
      .map((rew) => parseInt(rew.star))
      .reduce((acc, amount) => amount + acc, 0);

  const starratinglength =
    reviewData &&
    reviewData.filter((rew) => {
      if (rew.pgid === idd) {
        return rew;
      } else {
        return 0;
      }
    }).length;

  const starrating =
    parseFloat((starratingadd / starratinglength).toFixed(1)) || 0;
  console.log(starrating);

  //pop up
  const [open1, setOpen1] = useState(false);

  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const getCurrentURL1 = () => {
    return window.location.href;
  };
  const getCurrentURL = getCurrentURL1();

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
      <div>
        {data
          .filter((val) => {
            if (val.id === id) {
              return val;
            } else {
              return 0;
            }
          })
          .map((val) => {
            return (
              <div key={val.id}>
                {/* <div style={{}}>
                  <SimpleImageSlider
                    className=".rsis-image"
                    autoPlay
                    autoPlayDelay={3}
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginBottom: "25px",
                      objectFit: "contain",
                    }}
                    width={"62.6vw"}
                    height={"53vh"}
                    images={[
                      {
                        url: `${val.image === "" ? val.backupimg : val.image}`,
                      },
                      {
                        url: `${
                          val.image1 === "" ? val.backupimg : val.image1
                        }`,
                      },
                      {
                        url: `${
                          val.image2 === "" ? val.backupimg : val.image2
                        }`,
                      },
                      {
                        url: "https://www.istockphoto.com/photo/gold-glitter-vintage-lights-background-de-focused-gm871824196-243538694",
                      },
                      {
                        url: "https://media.istockphoto.com/id/873597266/photo/turquoise-glitter-vintage-lights-background-de-focused.webp?s=612x612&w=is&k=20&c=kth_YGc3t5Zaha3f_tgOi3I0o0Jaru8PhuWsN63r6R8=",
                      },
                    ]}
                    showBullets={true}
                    showNavs={true}
                  />
                </div> */}
                <div className="slider1">
                  <Slide autoplay={true}>
                    <div className="each-slide-effect">
                      <div
                        style={{ backgroundImage: `url(${val.image})` }}
                      ></div>
                    </div>
                    <div className="each-slide-effect">
                      <div
                        style={{ backgroundImage: `url(${val.image1})` }}
                      ></div>
                    </div>
                    <div className="each-slide-effect">
                      <div
                        style={{ backgroundImage: `url(${val.image2})` }}
                      ></div>
                    </div>
                  </Slide>
                </div>
                <h1 className="pgstar">
                  {starrating}
                  <StarRate
                    sx={{
                      fontSize: "18px",
                      color: "white",
                      paddingTop: "1.7px",
                      "@media screen and (max-width: 600px)": {
                        fontSize: "18px",
                        paddingTop: "9px",
                      },
                    }}
                  />
                </h1>
                <h1 className="pgs-name">{val.title}</h1>
                <h4 className="pgs-location">{val.location}</h4>
                <h4 className="city">Silchar Locality, Silchar City</h4>
                <Stack
                  direction="row"
                  spacing={isMobile ? 0.5 : 2}
                  sx={{
                    "@media screen and (max-width: 600px)": {
                      display: "flex",
                      justifyContent: "center",
                      margin: "0 3.5vw 0 3.5vw",
                    },
                  }}
                >
                  <Button
                    sx={{
                      color: "white",
                      bgcolor: "#3AB757",
                      borderRadius: "5px",
                      marginLeft: "20%",
                      textTransform: "none",
                      fontFamily: "Poppins",
                      width: "98px",
                      "&:hover": {
                        color: "white",
                        bgcolor: "#3AB757",
                        borderRadius: "5px",
                      },
                      "@media screen and (max-width:600px)": {
                        marginLeft: "0",
                        width: "10vh",
                        fontSize: "12px",
                      },
                    }}
                    disableRipple
                    variant="outlined"
                    startIcon={
                      <AppRegistration
                        sx={{
                          color: "white",
                          "@media screen and (max-width:600px)": {
                            transform: "scale(0.8)",
                            minWidth: "0px",
                          },
                        }}
                      />
                    }
                    onClick={handleClickOpen}
                  >
                    Book
                  </Button>

                  <Dialog
                    sx={{ width: "100%" }}
                    open={open1}
                    onClose={handleClose1}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle
                      id="alert-dialog-title"
                      sx={{
                        paddingRight: "250px",
                        paddingTop: "0",
                        paddingLeft: "40px",
                        paddingBottom: "20px",
                        "@media screen and (max-width: 600px)": {
                          padding: "4vw 0 0 0vw",
                        },
                      }}
                    >
                      {<h4 className="dialog-box-h4">Choose Your Room</h4>}
                    </DialogTitle>
                    {/* <DialogActions
                      sx={{
                        paddingRight: "52px",
                        paddingBottom: "0px",
                        marginLeft: "40px",
                        "@media screen and (max-width: 600px)": {
                          margin: 0,
                          padding: "0 5vw 0 0",
                        },
                      }}
                    > */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "1vh",
                      }}
                    >
                      <div
                        style={{
                          flexDirection: "column",
                          textAlign: "center",
                        }}
                      >
                        <Link
                          sx={{ color: "inherit", textDecoration: "none" }}
                          component={RouterLink}
                          to={`/pg/${id}/singleroom`}
                        >
                          <Button
                            sx={{
                              textDecoration: "none",
                              color: "#3ab757",
                              fontFamily: "poppins",
                              border: "1px solid #1EDE6D",
                              borderRadius: "20px",
                              marginRight: "14px",
                              fontWeight: "600",
                              "&:hover": {
                                color: "white",
                                bgcolor: "#1EDE6D",
                              },
                              "@media screen and (max-width: 600px)": {
                                fontSize: "10px",
                                margin: "0 1vw 0 0",
                              },
                            }}
                          >
                            Single Room
                          </Button>
                        </Link>
                        <h5 className="dialog-box-price">
                          Rs. {val.singleroomfee}/Month
                        </h5>
                      </div>
                      <div
                        style={{
                          flexDirection: "column",
                          textAlign: "center",
                        }}
                      >
                        <Link
                          sx={{ color: "inherit", textDecoration: "none" }}
                          component={RouterLink}
                          to={`/pg/${id}/doubleroom`}
                        >
                          <Button
                            onClick={handleClose1}
                            sx={{
                              textDecoration: "none",
                              color: "#3ab757",
                              fontFamily: "poppins",
                              border: "1px solid #1EDE6D",
                              borderRadius: "20px",
                              fontWeight: "600",
                              marginRight: "14px",
                              "&:hover": {
                                color: "white",
                                bgcolor: "#1EDE6D",
                              },
                              "@media screen and (max-width: 600px)": {
                                fontSize: "10px",
                                margin: 0,
                                margin: "0 1vw 0 0",
                              },
                            }}
                          >
                            Double Room
                          </Button>
                        </Link>
                        <h5 className="dialog-box-price">
                          Rs. {val.doubleroomfee}/Month
                        </h5>
                      </div>
                      <div
                        style={{
                          flexDirection: "column",
                          textAlign: "center",
                        }}
                      >
                        <Link
                          sx={{ color: "inherit", textDecoration: "none" }}
                          component={RouterLink}
                          to={`/pg/${id}/threepersonroom`}
                        >
                          <Button
                            onClick={handleClose1}
                            sx={{
                              textDecoration: "none",
                              color: "#3ab757",
                              fontFamily: "poppins",
                              border: "1px solid #1EDE6D",
                              borderRadius: "20px",
                              fontWeight: "600",
                              "&:hover": {
                                color: "white",
                                bgcolor: "#1EDE6D",
                              },
                              "@media screen and (max-width: 600px)": {
                                fontSize: "10px",
                                margin: 0,
                              },
                            }}
                          >
                            3 Person Room
                          </Button>
                        </Link>
                        <h5 className="dialog-box-price-1">
                          Rs. {val.threepersonroomfee}/Month
                        </h5>
                      </div>
                    </div>
                    <div className="res-close">
                      <Button
                        onClick={handleClose1}
                        sx={{
                          textDecoration: "none",
                          color: "white",
                          bgcolor: "#1EDE6D",
                          fontFamily: "poppins",
                          border: "1px solid #1EDE6D",
                          borderRadius: "4px",
                          width: "70px",
                          marginLeft: "385px",
                          marginTop: "4vh",
                          marginBottom: "20px",
                          fontWeight: "600",
                          textAlign: "center",
                          "&:hover": {
                            color: "white",
                            bgcolor: "#1EDE6D",
                          },
                          "@media screen and (max-width: 600px)": {
                            margin: "3vw 0 2vw 0",
                            width: "50px",
                            fontSize: "10px",
                          },
                        }}
                      >
                        CLOSE
                      </Button>
                    </div>
                  </Dialog>
                  <Button
                    sx={{
                      color: "#1c1c1c",
                      textTransform: "none",
                      fontFamily: "Poppins",
                      borderRadius: "5px",
                      "@media screen and (max-width: 600px)": {
                        minWidth: "80px",
                        fontSize: "12px",
                      },
                    }}
                    variant="outlined"
                    startIcon={
                      <DirectionsOutlined
                        sx={{
                          color: "#3AB757",
                          "@media screen and (max-width: 600px)": {
                            transform: "scale(0.8)",
                          },
                        }}
                      />
                    }
                  >
                    Direction
                  </Button>
                  <Button
                    id="gg1"
                    sx={{
                      color: "#1c1c1c",
                      textTransform: "none",
                      fontFamily: "Poppins",
                      borderRadius: "5px",
                      "@media screen and (max-width: 600px)": {
                        minWidth: "70px",
                        fontSize: "12px",
                      },
                    }}
                    variant="outlined"
                    startIcon={
                      <StarBorderOutlined
                        sx={{
                          color: "#3AB757",
                          "@media screen and (max-width: 600px)": {
                            transform: "scale(0.8)",
                          },
                        }}
                      />
                    }
                    onClick={handleClick3}
                  >
                    Reviews
                  </Button>
                  <RWebShare
                    data={{
                      text: `Share ${val.title} to yours Friends`,
                      url: `${getCurrentURL}`,
                      title: `Share ${val.title} to yours Friends`,
                    }}
                    onClick={() => console.info("share successful!")}
                  >
                    <Button
                      sx={{
                        color: "#1c1c1c",
                        textTransform: "none",
                        fontFamily: "Poppins",
                        borderRadius: "5px",
                        "@media screen and (max-width: 600px)": {
                          minWidth: "70px",
                          fontSize: "12px",
                        },
                      }}
                      variant="outlined"
                      startIcon={
                        <ShareOutlined
                          sx={{
                            color: "#3AB757",
                            "@media screen and (max-width: 600px)": {
                              transform: "scale(0.8)",
                            },
                          }}
                        />
                      }
                    >
                      Share
                    </Button>
                  </RWebShare>
                </Stack>
                <div className="feature-and-others" ref={ref}>
                  <button onClick={handleClick1} className={style1}>
                    Features
                  </button>
                  <button onClick={handleClick3} className={style2}>
                    Reviews
                  </button>
                  <button onClick={handleClick4} className={style3}>
                    Fee and Fooding
                  </button>
                  <button onClick={handleClick2} className={style}>
                    About
                  </button>
                  <hr className="line-after-button" />

                  {/* 👇️ show component on click */}
                  {/* 👇️ show component on click */}
                  {isShown && <Features />}
                  {isShown2 && <Reviews />}
                  {isShown3 && <Feenfood />}
                  {isShown1 && <About />}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PG;
