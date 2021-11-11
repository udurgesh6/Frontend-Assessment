import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import back from "./assets/images/login1.jpeg";
import login from "./assets/images/login.jpeg";
import { useNavigate } from "react-router-dom";

function Sign() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (format.test(username)) {
      alert("No special characters allowed");
    } else if (username.length < 11) {
      alert("Username should be greated than 9 characters");
    } else {
      if (
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password) &&
        /[1-9]/.test(password) &&
        format.test(password)
      ) {
        if (password.length >= 8) {
          const params = JSON.stringify({
            Firstname: firstname,
            Lastname: lastName,
            EmailAddress: email,
            PhoneNumber: contactNumber,
            Pwd: password,
            Username: username,
          });
          axios
            .post(`http://localhost:57754/api/signup`, params, {
              headers: {
                "content-type": "application/json",
              },
            })
            .then((response) => {
              console.log(response);
              navigate("/login");
            })
            .catch((err) => alert("User already exists !"));
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
              borderTop: "3px solid black",
              borderRight: "2px solid black",
              borderBottom: "2px solid black",
            }}
          >
            <h3>Register Here</h3>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              onSubmit={(e) => onLogin(e)}
            >
              <label for="firstname">First Name</label>
              <input
                id="firstname"
                style={{
                  maxWidth: "250px",
                  marginBottom: "5px",
                }}
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required="true"
                autoFocus="true"
              />
              <label for="lastname">Last Name</label>
              <input
                id="lastname"
                style={{
                  maxWidth: "250px",
                  marginBottom: "5px",
                }}
                value={lastName}
                onChange={(e) => setLastname(e.target.value)}
                required="true"
              />
              <label for="username">Username</label>
              <input
                id="username"
                style={{
                  maxWidth: "250px",
                  marginBottom: "5px",
                }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required="true"
                minLength="10"
              />
              <label for="email">Email</label>
              <input
                id="email"
                style={{
                  maxWidth: "250px",
                  marginBottom: "5px",
                }}
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required="true"
              />
              <label>Contact Number</label>
              <input
                id="firstname"
                style={{
                  maxWidth: "250px",
                  marginBottom: "5px",
                }}
                type="number"
                required="true"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
              <label for="password">Password</label>
              <input
                id="password"
                style={{ maxWidth: "250px", marginBottom: "5px" }}
                value={password}
                type="password"
                required="true"
                minLength="8"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p>
                Already have an account -{" "}
                <a
                  href="/login"
                  style={{
                    fontWeight: "500",
                    cursor: "pointer",
                    textDecorationLine: "none",
                    color: "black",
                  }}
                >
                  Login
                </a>
              </p>
              <p style={{ cursor: "pointer" }}>Terms & Conditions</p>
              <Button
                style={{
                  width: "150px",
                  borderRadius: "25px",
                  backgroundColor: "black",
                }}
                variant="dark"
                type="submit"
                disabled={
                  username.length > 9 && password.length > 7 && email.length > 0
                    ? false
                    : true
                }
              >
                Register
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Sign;
