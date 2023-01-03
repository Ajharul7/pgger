import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/home";
import PG from "./components/pg";
import AboutUs from "./components/aboutus";
import SingleRoom from "./components/paymentdetails/singleroom";
import DoubleRoom from "./components/paymentdetails/doubleroom";
import ThreePersonRoom from "./components/paymentdetails/threepersonroom";
import data from "./constant/data.json";

import { UserContext } from "./App";

function RoutesComp() {
  const userContext = useContext(UserContext);
  return (
    <>
      <Routes>
        {userContext.email && (
          <>
            <Route path="/" element={<Home />} />
            {data.map((val) => {
              const id = `${val.id}`;
              return <Route path={`/pg/${id}`} element={<PG />} />;
            })}
            {data.map((val) => {
              const id = `${val.id}`;
              return (
                <Route path={`/pg/${id}/singleroom`} element={<SingleRoom />} />
              );
            })}
            {data.map((val) => {
              const id = `${val.id}`;
              return (
                <Route path={`/pg/${id}/doubleroom`} element={<DoubleRoom />} />
              );
            })}
            {data.map((val) => {
              const id = `${val.id}`;
              return (
                <Route
                  path={`/pg/${id}/threepersonroom`}
                  element={<ThreePersonRoom />}
                />
              );
            })}
            <Route path="/pg/:id" />;
            <Route path="/aboutus" element={<AboutUs />} />
          </>
        )}
        {!userContext.email && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default RoutesComp;
