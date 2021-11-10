import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [name, setName] = useState("");
  const [desc, setdesc] = useState("");
  const [mfd, setMfd] = useState("");
  const [ed, setEd] = useState("");
  const navigate = useNavigate();

  const addProduct = (e) => {
    e.preventDefault();
    const params = JSON.stringify({
      ProductName: name,
      ProductDescription: desc,
      ProductManufacturingDate: mfd,
      ProductExpiryDate: ed,
    });
    axios
      .post(`http://localhost:57754/api/products`, params, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        navigate("/products");
      });
  };

  useEffect(() => {
    if (
      sessionStorage.getItem("token") === null ||
      sessionStorage.getItem("token").length < 1
    ) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:57754/api/products", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {})
        .catch((err) => {
          sessionStorage.setItem("token", "");
          sessionStorage.setItem("role", "user");
          alert("Session timed out !");
          navigate("/login");
        });
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Navigation />
      <div style={{ backgroundColor: "whitesmoke", height: "100%" }}>
        <h2
          style={{
            color: "black",
            marginTop: "20px",
            marginLeft: "40px",
          }}
        >
          Add Product
        </h2>
        <Form style={{ marginLeft: "40px", marginRight: "40px" }}>
          <Form.Group className="mb-3" controlId="formPlaintext">
            <Form.Label column sm="2">
              Name
            </Form.Label>
            <Form.Control
              style={{ maxWidth: "280px" }}
              type="text"
              placeholder="Item Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPlaintext">
            <Form.Label column sm="2">
              Description
            </Form.Label>
            <Form.Control
              style={{ maxWidth: "280px" }}
              type="text"
              placeholder="Item Description"
              value={desc}
              onChange={(e) => setdesc(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlaintext">
            <Form.Label column sm="2">
              Manufacturing Date
            </Form.Label>
            <Form.Control
              style={{ maxWidth: "280px" }}
              type="Date"
              value={mfd}
              onChange={(e) => setMfd(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlaintext">
            <Form.Label column sm="2">
              Expiry Date
            </Form.Label>
            <Form.Control
              style={{ maxWidth: "280px" }}
              type="Date"
              value={ed}
              onChange={(e) => setEd(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlaintext">
            <Form.Label column sm="2"></Form.Label>
            <Col sm="10">
              <Button
                as="input"
                variant="success"
                type="submit"
                value="Add Item"
                onClick={(e) => addProduct(e)}
              />
              &nbsp;&nbsp;
              <Button as="input" variant="danger" type="submit" value="Reset" />
            </Col>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default AddProduct;
