import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../static/Login.css"
import mic from "../static/images/podcast-mic-1920.png"
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      const response2 = await fetch(`/api/auth/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json2 = await response2.json();
      if (json2.role === "user") {
        navigate("/");
      } else {
        navigate("/admin");
      }
    } else {
      alert("Invalid credential!");
    }
    console.log(json);
  };
  return (
    <>
    <img className="mic-bg" src={mic} alt=""/>
    <div className="log-cont">
      <div class="login-text">Login</div>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-dark w-100 my-4" onClick={handleClick}>
          Log In
        </button>
      </form>
    </div>
    </>
  );
};
