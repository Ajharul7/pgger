import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import ReactStars from "react-rating-stars-component";
import data from "../../constant/data.json";
import validator from "validator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Box, Button, Stack, TextField } from "@mui/material";
import "../../styles/review.css";

import { AccountCircle, StarRate } from "@mui/icons-material";
import { flexbox } from "@mui/system";

const Reviews = () => {
  const userContext = useContext(UserContext);
  const id1 = window.location.pathname; //localhost ke baki kha part nikal tha hai
  const idd = id1.replace("/pg/", ""); // baki kha part ko delete karke sirf json kha id lia
  const id = parseInt(idd);

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

  const [values, setValues] = useState({
    star: "",
    comment: "",
    pgname: ``,
    username: `${userContext.name}`,
  });
  const [errors, setErrors] = useState({
    star: "",
    comment: "",
    pgname: "",
    username: "",
  });

  const handleChange = (fieldName) => (event) => {
    const currValue = event.target.value;
    switch (fieldName) {
      // case "star":
      //   validator.isUppercase(currValue)
      //     ? setErrors({ ...errors, star: false })
      //     : setErrors({ ...errors, star: true });
      //   break;

      case "comment":
        validator.isUppercase(currValue)
          ? setErrors({ ...errors, comment: false })
          : setErrors({ ...errors, comment: true });
        break;

      case "pgname":
        validator.isUppercase(currValue)
          ? setErrors({ ...errors, pgname: false })
          : setErrors({ ...errors, pgname: true });
        break;
      case "username":
        validator.isUppercase(currValue)
          ? setErrors({ ...errors, username: false })
          : setErrors({ ...errors, username: true });
        break;
    }
    setValues({ ...values, [fieldName]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("/api/pg/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        star: values.star,
        comment: values.comment,
        pgname: document.getElementById("pg-name").value,
        username: userContext.name,
        pgloca: document.getElementById("pg-loca").value,
        pgid: id,
      }),
    });

    await res.json();
    setValues({
      star: "",
      comment: "",
      pgname: "",
      username: `${userContext.name}`,
    });
    window.location.reload(false);
  };
  const ratingChanged = (newRating) => {
    setValues({
      star: newRating,
    });
  };

  return (
    <>
      <div className="warning-card">
        <h3 className="disclaimer">Disclaimer :</h3>
        <h4 className="disclaimer-text">
          Reviews posted by users cannot be deleted by the users. So please be
          discrete and honest when you give a review.
        </h4>
      </div>
      <div className="main-div-box">
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
                <div>
                  <input id="pg-name" value={val.title} type="hidden" />
                  <input id="pg-loca" value={val.location} type="hidden" />
                </div>
              );
            })}
        </div>
        <center>
          <Stack
            id="review-card"
            className="review-card"
            component="form"
            onSubmit={handleSubmit}
            noValidate
            spacing={1}
            sx={{
              width: "97%",
              marginTop: "3%",
              marginBottom: "3%",
              paddingTop: "10px",
              paddingBottom: "10px",
              borderRadius: "7px",
              boxShadow: "3px 3px 18px -8px rgba(0, 0, 0, 0.5)",
              bgcolor: "#fff",
              "@media screen and (max-width: 600px)": {
                marginTop: "5%",
                padding: "10px",
                borderRadius: "0px",
              },
            }}
          >
            <h3 className="text-for-review-1">Rate Your Experience</h3>
            <div
              style={{
                backgroundColor: "#E8E8E8",
                paddingTop: "2%",
                marginBottom: "5.5%",
              }}
            >
              <h4 className="text-for-review-2">How was your experience ? </h4>
              <h5 className="h5-for-review-box">
                <ReactStars
                  count={5}
                  emptyIcon={<FontAwesomeIcon icon={faStar} />}
                  halfIcon={<FontAwesomeIcon icon={faStar} />}
                  filledIcon={<FontAwesomeIcon icon={faStar} />}
                  onChange={ratingChanged}
                  size={30}
                  activeColor="#3ab757"
                  color="	#C0C0C0"
                />
              </h5>
              <h5 className="h5-for-review-box">
                <TextField
                  sx={{
                    color: "gray",
                    width: "65%",
                    marginTop: "2%",
                    height: "8em",
                    border: "1px solid #fff",
                    bgcolor: "#fff",
                    padding: "10px",
                    borderRadius: "10px",
                    "@media screen and (max-width: 600px)": {
                      width: "90%",
                      marginTop: "4%",
                      borderRadius: "7px",
                      height: "3.6em",
                    },
                  }}
                  variant="standard"
                  type="string"
                  placeholder="Write your Review..."
                  onChange={handleChange("comment")}
                  value={values.comment}
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      fontFamily: "Poppins",
                      fontSize: "15px",
                      "@media screen and (max-width: 600px)": {
                        fontSize: "13px",
                      },
                    },
                  }}
                />
              </h5>
              <Box sx={{}}>
                <h5 className="h5-for-review-box">
                  <Button
                    variant="contained"
                    disabled={!values.star || !values.comment}
                    size="large"
                    type="submit"
                    sx={{
                      width: "65%",
                      marginTop: "2%",
                      fontFamily: "Poppins",
                      backgroundColor: "#3ab757",
                      fontWeight: 700,
                      marginBottom: "4%",
                      marginTop: "2%",
                      textTransform: "none",
                      "&:hover": {
                        color: "white",
                        bgcolor: "#3AB757",
                      },
                      "@media screen and (max-width: 600px)": {
                        width: "90%",
                        marginTop: "4%",
                        fontSize: "14px",
                      },
                    }}
                  >
                    Add Review
                  </Button>
                </h5>
              </Box>
            </div>
          </Stack>
        </center>
        <div style={{ color: "black" }}>
          {reviewData &&
            reviewData
              .filter((rew) => {
                console.log(rew);
                if (rew.pgid === idd) {
                  return rew;
                } else {
                  return 0;
                }
              })
              .map((rew) => {
                let date = new Date(rew.date);
                let date1 = date.toDateString();
                let getdate = date.getDate();
                let getmonth = date1.substring(4, 7);
                let getyear = date.getFullYear();
                return (
                  <div className="review-main-div">
                    <hr
                      style={{
                        width: "99%",
                        marginBottom: "0px",
                        backgroundColor: "grey",
                        height: "1px",
                        marginLeft: "0px",
                        opacity: "0.3",
                      }}
                    />
                    <div style={{ marginTop: "2.5%" }}>
                      <p className="p-star">
                        {rew.star}
                        <StarRate
                          sx={{
                            fontSize: "14px",
                            paddingTop: "1px",
                            "@media screen and (max-width: 600px)": {
                              fontSize: "12px",
                              paddingTop: "3px",
                            },
                          }}
                        />
                      </p>
                      <AccountCircle
                        sx={{
                          fontSize: "50px",
                          float: "left",
                          marginTop: "0%",
                          color: "#272C33",
                          "@media screen and (max-width: 600px)": {
                            fontSize: "40px",
                          },
                        }}
                      />

                      <p className="p-username">{rew.username}</p>
                      <p className="p-postedon">
                        Posted on {getdate}&nbsp;
                        {getmonth},{getyear}
                      </p>
                      <p className="p-comment">{rew.comment}</p>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default Reviews;
