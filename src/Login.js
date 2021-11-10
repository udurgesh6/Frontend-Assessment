import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import back from "./assets/images/login1.jpeg";
import login from "./assets/images/login.jpeg";
import { useNavigate } from "react-router-dom";

function LoginNew() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();
    const params = JSON.stringify({
      username: username,
      password: password,
    });

    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (format.test(username)) {
      alert("No special characters allowed");
    } else {
      if (
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password) &&
        /[1-9]/.test(password)
      ) {
        if (password.length >= 8) {
          axios
            .post("http://localhost:57754/api/products/authenticate", params, {
              headers: {
                "content-type": "application/json",
              },
            })
            .then((response) => {
              sessionStorage.setItem("token", response.data);
              if (username === "udurgesh6") {
                sessionStorage.setItem("role", "admin");
              } else {
                sessionStorage.setItem("role", "user");
              }
              navigate("/products");
            })
            .catch((err) => {
              alert("Username or password is incorrect");
            });
        } else {
          alert("Password length should be greater than 8 characters");
        }
      } else {
        alert(
          "Password should contain atleast one small letter, one capital letter, one number and one special charcter"
        );
      }
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${back})`,
        paddingLeft: "50px",
        paddingRight: "50px",
        paddingTop: "60px",
        paddingBottom: "60px",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        style={{
          backgroundColor: "whitesmoke",
          height: "100%",
          borderRadius: "10px",
          boxShadow:
            "0 20px 20px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <Row style={{ height: "100%" }}>
          <Col
            xl={7}
            sm={12}
            md={7}
            style={{
              backgroundImage: `url(${login})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
            }}
          ></Col>
          <Col
            xl={5}
            sm={12}
            md={5}
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "30px",
              justifyContent: "center",
              paddingRight: "30px",
            }}
          >
            <h3>Login Here</h3>
            <form
              style={{
                display: "flex",
                flexDirection: "column",

                justifyContent: "center",
              }}
              onSubmit={(e) => onLogin(e)}
            >
              <label for="username" style={{ marginTop: "15px" }}>
                Username
              </label>
              <input
                id="username"
                style={{
                  maxWidth: "250px",
                  marginBottom: "15px",
                }}
                required={true}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="9"
                type="text"
              />
              <label for="password">Password</label>
              <input
                id="password"
                style={{ maxWidth: "250px", marginBottom: "15px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
                minLength="8"
                type="password"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <input
                  type="checkbox"
                  style={{ marginRight: "10px", marginTop: "2px" }}
                />
                <p style={{ margin: "0px", padding: "0px" }}>Remember Me</p>
              </div>
              <p>
                Please sign up -{" "}
                <a
                  href="/signup"
                  style={{
                    fontWeight: "500",
                    cursor: "pointer",
                    textDecorationLine: "none",
                    color: "black",
                  }}
                >
                  Sign Up
                </a>
              </p>
              <Button
                style={{
                  width: "150px",
                  borderRadius: "25px",
                  backgroundColor: "black",
                }}
                variant="dark"
                type="submit"
                disabled={
                  username.length > 0 && password.length > 0 ? false : true
                }
              >
                Login
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default LoginNew;
