import { useEffect, useState, useContext } from "react";
import data from "../../constant/data.json";
import "../../styles/rooms.css";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Button } from "@mui/material";
import { UserContext } from "../../App";

const DoubleRoom = () => {
  //pull user detials from backend
  const userContext = useContext(UserContext);

  const [couponApplyButton, setCouponApplyButton] = useState("Apply");
  const [disablecouponApply, setdisablesetCouponApply] = useState(false);
  const [totalAmount, setTotalAmount] = useState();
  const [paymenttotalAmount, setPaymentTotalAmount] = useState();
  const [myCoupon, setMyCoupon] = useState();
  const [questionForm, setquestionForm] = useState();
  const [couponData, setCouponData] = useState();

  const handleChange = (event) => {
    const currentValue = event.target.value;
    setMyCoupon(currentValue);
    setCouponApplyButton("Apply");
    setcouponapplybuttoncss(couponapplybuttoncss1);
  };
  const handleChange1 = (event) => {
    const currentValue = event.target.value;
    setquestionForm(currentValue);
  };

  const priceoff1 = parseInt(paymenttotalAmount) / 100;
  const priceoff2 = priceoff1 * 5;
  const priceoff = paymenttotalAmount - priceoff2;

  const deleteCoupon = async () => {
    await fetch(`/api/${myCoupon}`, {
      method: "DELETE",
    });
  };
  const handleCouponClick = () => {
    {
      couponData &&
        couponData
          .filter((val) => {
            if (`${myCoupon}` === `${val.coupon}`) {
              return val;
            } else {
              setCouponApplyButton("Invalid Coupon");
              setcouponapplybuttoncss(couponapplybuttoncss3);
              return 0;
            }
          })
          .map((val) => {
            setCouponApplyButton("Coupon Applied");
            setTotalAmount(`Rs. ${parseInt(priceoff)}`);
            setPaymentTotalAmount(parseInt(priceoff));
            setdisablesetCouponApply(true);
            setcouponapplybuttoncss(couponapplybuttoncss2);
            deleteCoupon();
            return console.log("Successfully Applied Coupon");
          });
    }
  };

  //css
  //beforeclick
  const couponapplybuttoncss1 = {
    float: "right",
    backgroundColor: "#1161EB",
    color: "white",
    textTransform: "none",
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: "13px",
    padding: "6px",
    "&:hover": {
      backgroundColor: "#1161EB",
      color: "white",
      cursor: "pointer",
    },
  };
  // afterclick-valid
  const couponapplybuttoncss2 = {
    float: "right",
    backgroundColor: "#00ff00",
    color: "white",
    textTransform: "none",
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: "13px",
    padding: "6px",
    "&:hover": {
      backgroundColor: "#00ff00",
      color: "white",
      cursor: "pointer",
    },
  };
  // afterclicked-invalid
  const couponapplybuttoncss3 = {
    float: "right",
    backgroundColor: "red",
    color: "white",
    textTransform: "none",
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: "13px",
    padding: "6px",
    "&:hover": {
      backgroundColor: "red",
      color: "white",
      cursor: "pointer",
    },
  };

  const [couponapplybuttoncss, setcouponapplybuttoncss] = useState(
    couponapplybuttoncss1
  );

  const id1 = window.location.pathname; //localhost ke baki kha part nikal tha hai
  const idd = id1.replace("/pg/", ""); // baki kha part ko delete karke sirf json kha id lia
  const id2 = idd.replace("/doubleroom", "");
  const id = parseInt(id2);

  const handleSubmit = async () => {
    const res = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: userContext.name,
        email: userContext.email,
        phonenumber: userContext.phoneno,
        address: userContext.address,
        question: document.getElementById("question").value,
        pgname: document.getElementById("pgname").value,
        pglocation: document.getElementById("pglocation").value,
        roomtype: document.getElementById("roomtype").value,
        couponused: document.getElementById("couponused").value,
        perpersonamount: document.getElementById("perpersonamount").value,
        totalamount: document.getElementById("totalamount").value,
      }),
    });
    await res.json();
  };

  useEffect(() => {
    {
      data
        .filter((val) => {
          if (val.id === id) {
            return val;
          } else {
            return 0;
          }
        })
        .map((val) => {
          setTotalAmount(`Rs. ${val.doubleroomfee}`);
          setPaymentTotalAmount(`${val.doubleroomfee}`);
        });
    }
    console.log(id);
    fetch("/api/pg")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setCouponData(actualData);
        console.log(actualData);
      });
  }, []);
  return (
    <>
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
            <div className="main-box1">
              <div className="main-box2">
                {/* hidden data for pgdetails */}
                <input value={val.title} id="pgname" hidden />
                <input value={val.location} id="pglocation" hidden />
                <input value="Double Room" id="roomtype" hidden />
                <input value={myCoupon} id="couponused" hidden />
                <input
                  value={`Rs. ${val.doubleroomfee}`}
                  id="perpersonamount"
                  hidden
                />
                <input value={totalAmount} id="totalamount" hidden />
                {/* end */}

                <h3>Summary: </h3>
                <h4 className="total-amount">{val.title}</h4>
                <h4 className="title-pgname">PG Name: </h4>
                <h4 className="total-amount">
                  {val.location.replace(", Silchar", "")}
                </h4>
                <h4 className="title-pgname">PG Location: </h4>
                <h4 className="total-amount">Double Room</h4>
                <h4 className="title-pgname">Room Type: </h4>
                <h4 className="total-amount">Rs. {val.doubleroomfee}/person</h4>
                <h4 className="title-pgname">Fee: </h4>
                <input
                  type="text"
                  className="coupon-box"
                  value={myCoupon}
                  onChange={handleChange}
                  disabled={disablecouponApply}
                />
                <h4 className="title-pgname">Coupon: </h4>
                <Button
                  onClick={handleCouponClick}
                  sx={couponapplybuttoncss}
                  className="coupon-apply-button"
                >
                  {couponApplyButton}
                </Button>
                <br />
                <br />
                <hr style={{ borderTop: "dashed 2px gray", opacity: 0.2 }}></hr>
                <h4 className="total-amount1">{totalAmount}</h4>
                <h4 className="title-pgname">Total Amount: </h4>
              </div>
              <AccountBalanceWalletIcon
                sx={{
                  color: "#1161eb",
                  fontSize: "38px",
                  float: "left",
                  marginTop: "27px",
                  marginRight: "13px",
                  marginLeft: "9px",
                  "@media screen and (max-width: 600px)": {
                    fontSize: "24px",
                    marginTop: "21px",
                    marginRight: "7px",
                    marginLeft: "0px",
                  },
                }}
              />
              <h1 className="website-name1">PGGER Payment</h1>
              <form action="/api/paynow" onSubmit={handleSubmit} method="POST">
                <label className="forpayment">Full Name:</label>
                <br />
                <input
                  type="text"
                  className="textforpayment"
                  value={userContext.name}
                />
                <br />
                <label for="email" className="forpayment">
                  Email:
                </label>
                <br />
                <input
                  type="email"
                  name="email"
                  className="emailforpayment"
                  value={userContext.email}
                />
                <br />
                <label for="phone" className="forpayment">
                  Phone Number:
                </label>
                <br />
                <input
                  type="text"
                  name="phone"
                  className="textforpayment"
                  value={userContext.phoneno}
                />
                <br />
                <label className="forpayment">Address:</label>
                <br />
                <input
                  type="text"
                  className="textforpayment"
                  value={userContext.address}
                />
                <br />
                <label className="forpayment">
                  When will you join the PG ? (DD/MM/YYYY)
                  <span style={{ color: "red" }}>*</span> :
                </label>
                <br />
                <input
                  type="text"
                  className="textforpayment"
                  value={questionForm}
                  placeholder="Format : DD/MM/YYYY"
                  onChange={handleChange1}
                  id="question"
                ></input>
                <br></br>
                <input
                  type="text"
                  name="amount"
                  value={paymenttotalAmount}
                  hidden
                />
                <div className="main-box3">
                  <h3 className="summary">Summary: </h3>
                  <h4 className="total-amount">{val.title}</h4>
                  <h4 className="title-pgname">PG Name: </h4>
                  <h4 className="total-amount">
                    {val.location.replace(", Silchar", "")}
                  </h4>
                  <h4 className="title-pgname">PG Location: </h4>
                  <h4 className="total-amount">Double Room</h4>
                  <h4 className="title-pgname">Room Type: </h4>
                  <h4 className="total-amount">
                    Rs. {val.doubleroomfee}/person
                  </h4>
                  <h4 className="title-pgname">Fee: </h4>
                  <input
                    type="text"
                    className="coupon-box"
                    value={myCoupon}
                    onChange={handleChange}
                    disabled={disablecouponApply}
                  />
                  <h4 className="title-pgname">Coupon: </h4>
                  <Button
                    onClick={handleCouponClick}
                    sx={couponapplybuttoncss}
                    className="coupon-apply-button"
                  >
                    {couponApplyButton}
                  </Button>
                  <br />
                  <br />
                  <hr
                    style={{ borderTop: "dashed 2px gray", opacity: 0.2 }}
                  ></hr>
                  <h4 className="total-amount1">{totalAmount}</h4>
                  <h4 className="title-pgname">Total Amount: </h4>
                </div>
                <button
                  type="submit"
                  className="paynow-button"
                  disabled={!questionForm}
                >
                  Pay Now
                </button>
              </form>
            </div>
          );
        })}
    </>
  );
};

export default DoubleRoom;
