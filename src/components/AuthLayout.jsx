import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loader, setloader] = useState(true);
  const authStatus = useSelector((state) => {
    return state.auth.status;
  });

  useEffect(() => {
    // if (authStatus === true) {
    //   navigate("/");
    // }
    // else {
    //   navigate("/login");

    // }

    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setloader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>loading..</h1> : <>{children}</>;
};

export default Protected;
