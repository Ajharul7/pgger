import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Stack,
  TextField,
  Autocomplete,
  InputAdornment,
  Link,
  Menu,
  MenuItem,
} from "@mui/material";
import { UserContext } from "../App";
import data from "../constant/data.json";
import pgloca from "../constant/pglocation.json";
import "../styles/home.css";
import Img from "../asset/img46.png";
import PlaceholderImage from "../asset/img47.jpg";
import ImgLoca from "../asset/searchforlocation.png";
import { Search as SearchMe } from "@mui/icons-material";
import {
  LocationOn as Location,
  StarRate,
  AccountCircle,
} from "@mui/icons-material";
import { LazyLoadImage } from "react-lazy-load-image-component";

const handleLogout = async (event) => {
  event.preventDefault();

  await fetch("/api/logout", {
    method: "DELETE",
  });
  window.location.href = "/";
};

const Home = () => {
  const userContext = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const showstyle = { display: "none" };
  const showstyle1 = { display: "block" };
  const [showorNot, setshoworNot] = useState(showstyle1);

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
        console.log(actualData);
      });
  }, []);

  return (
    <>
      <img src={Img} loading="eager" alt="" className="poster" />
      {/* for mobile */}
      <div className="arrow-button-div-1">
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            minWidth: "0px",
            color: "#1c1c1c",
            display: "none",
            "@media screen and (max-width: 600px)": {
              paddingTop: "0px",
              paddingLeft: "3px",
              fontSize: "11px",
              display: "unset",
            },
          }}
          className="button-arrow"
        >
          ▼
        </Button>
        <Menu
          sx={{ textAlign: "center" }}
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Link
            sx={{ color: "inherit", textDecoration: "none" }}
            component={RouterLink}
            to={`/aboutus`}
          >
            <MenuItem
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                backgroundColor: "#F2FAFF",
                fontSize: "13px",
                borderBottom: "1px solid #E1E2E1",
                paddingLeft: "25px",
                paddingRight: "25px",
              }}
            >
              About Us
            </MenuItem>
          </Link>
          <MenuItem
            onClick={handleLogout}
            style={{
              fontFamily: "Poppins",
              fontWeight: "600",
              backgroundColor: "#F2FAFF",
              fontSize: "13px",
              paddingLeft: "28px",
              paddingRight: "25px",
            }}
          >
            Log Out
          </MenuItem>
        </Menu>
      </div>
      <h1 className="username-css-home">{userContext.name}</h1>
      <AccountCircle
        sx={{
          fontSize: "60px",
          color: "#1c1c1c",
          float: "right",
          marginLeft: "0px",
          paddingTop: "29px",
          width: "0.65em",
          height: "1em",
          display: "none",
          "@media screen and (max-width: 600px)": {
            paddingTop: "0px",
            fontSize: "46px",
            paddingTop: "11px",
            display: "unset",
            color: "#fff",
          },
        }}
      />
      {/* end for mobile */}
      <Button
        sx={{
          float: "right",
          marginRight: "1.5%",
          fontFamily: "Poppins",
          color: "#D4F1F4",
          fontSize: "23px",
          fontWeight: "900",
          "@media screen and (max-width: 600px)": {
            display: "none",
          },
        }}
        onClick={handleLogout}
        className="aboutus-button"
      >
        Logout
      </Button>
      <Link component={RouterLink} to={"/aboutus"}>
        <Button
          sx={{
            float: "right",
            marginRight: "5%",
            fontFamily: "Poppins",
            fontWeight: "900",
            color: "#D4F1F4",
            fontSize: "23px",
            "@media screen and (max-width: 600px)": {
              display: "none",
            },
          }}
        >
          About Us
        </Button>
      </Link>
      <h1 className="welcome-text">Welcome, {userContext.name}</h1>
      {/* <Button
        onClick={() => {
          setSearchTerm(pgloca[0].pglocation);
        }}
      >
        {" "}
        Ambirapatty{" "}
      </Button>
      <Button
        onClick={() => {
          setSearchTerm(pgloca[1].pglocation);
        }}
      >
        {" "}
        Church Road{" "}
      </Button>
      <Button
        onClick={() => {
          setSearchTerm(pgloca[2].pglocation);
        }}
      >
        {" "}
        Link Road{" "}
      </Button>
      <input
        id="searchInput"
        type="text"
        placeholder="Search here..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      /> */}
      {/* try */}
      <p style={{ textAlign: "center" }}>
        <h1 className="web-name">pgger</h1>
        <center>
          <h2 className="web-diaglog">
            Discover the best Paid Guest(PG) in Silchar
          </h2>
        </center>
      </p>

      <center>
        <Stack
          spacing={2}
          className="search"
          onSelect={(event) => {
            setSearchTerm(event.target.value);
            if (event.target.value === "") {
              setshoworNot(showstyle1);
            } else {
              setshoworNot(showstyle);
            }
          }}
          // onChange={(event) => {
          //   if (event.target.value != searchTerm) {
          //     setshoworNot(showstyle1);
          //   } else {
          //     setshoworNot(showstyle);
          //   }
          // }}
        >
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={pgloca.map((options) => options.pglocation)}
            renderInput={(params) => (
              <TextField
                className="search-1"
                // onChange={(event) => {
                //   setSearchTerm(event.target.value);
                // }}
                // onClick={(event) => {
                //   setSearchTerm(event.target.value);
                // }}
                {...params}
                placeholder="Search for Location"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      {" "}
                      <SearchMe
                        sx={{
                          "@media screen and (max-width: 600px)": {
                            fontSize: "15px",
                            color: "#1e1e1e",
                          },
                        }}
                      />
                    </InputAdornment>
                  ),
                  type: "search",
                }}
              />
            )}
          />
        </Stack>
      </center>
      <div>
        {data
          .filter((val) => {
            if (val.location === searchTerm) {
              return val;
            } else {
              return 0;
            }
          })
          .map((val) => {
            const starratingadd =
              reviewData &&
              reviewData
                .filter((rew) => {
                  if (parseInt(rew.pgid) === parseInt(val.id)) {
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
                if (parseInt(rew.pgid) === parseInt(val.id)) {
                  return rew;
                } else {
                  return 0;
                }
              }).length;

            const starrating =
              parseFloat((starratingadd / starratinglength).toFixed(1)) || 0;
            console.log(starrating);
            return (
              <center>
                <Link
                  sx={{ color: "inherit", textDecoration: "none" }}
                  component={RouterLink}
                  to={`/pg/${val.id}`}
                >
                  <div className="pgs-display" key={val.id}>
                    <div>
                      <img src={val.image} alt="" className="img-pg" />
                    </div>
                    <div style={{ float: "left" }}>
                      <h3 className="pg-title">{val.title}</h3>
                    </div>
                    <h3 className="starme">
                      {starrating}
                      <StarRate
                        sx={{
                          fontSize: "18px",
                          color: "white",
                          paddingTop: "7px",
                          paddingLeft: "0px",
                          "@media screen and (max-width: 600px)": {
                            paddingTop: "7px",
                            fontSize: "16px",
                          },
                        }}
                      />
                    </h3>
                    <h4 style={{ visibility: "hidden" }}>
                      <Location
                        sx={{
                          fontSize: "19px",
                          color: "#F2FAFF",
                          "@media screen and (max-width: 600) ": {
                            margin: "0",
                          },
                        }}
                      />
                    </h4>
                    <h4 className="location-for-home">
                      <Location
                        sx={{
                          fontSize: "20px",
                          color: "#727272",
                          "@media screen and (max-width: 600px)": {
                            fontSize: "15px",
                          },
                        }}
                      />
                    </h4>
                    <h4 className="pg-location">{val.location}</h4>
                    <h4 className="price-monthly">
                      Rs. {val.threepersonroomfee}-{val.singleroomfee}/Month
                    </h4>
                    <br></br>
                    <br></br>
                  </div>
                </Link>
              </center>
            );
          })}
      </div>
      <div style={showorNot}>
        <center>
          <img src={ImgLoca} alt="" className="searchforlocation" />
          <h2 className="searchfortext">Search For Location</h2>
        </center>
      </div>
    </>
  );
};

export default Home;
