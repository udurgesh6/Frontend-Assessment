import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  Table,
  NavDropdown,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const navigate = useNavigate();
  const [searchedItem, setSearchedItem] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("name");

  const onProductSearch = () => {
    if (selectedSearch === "name") {
      axios
        .get(`http://localhost:57754/api/search/${searchedItem}/1`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          var all_products = [];
          response.data.map((rdm) => {
            all_products.push({
              Name: rdm.ProductName,
              Description: rdm.ProductDescription,
              Id: rdm.ProductId,
              Exp: rdm.ProductExpiryDate,
              Manu: rdm.ProductManufacturingDate,
            });
          });
          setSearchedProducts(all_products);
        });
    } else {
      axios
        .get(`http://localhost:57754/api/search/${searchedItem}/2`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          var all_products = [];
          response.data.map((rdm) => {
            all_products.push({
              Name: rdm.ProductName,
              Description: rdm.ProductDescription,
              Id: rdm.ProductId,
              Exp: rdm.ProductExpiryDate,
              Manu: rdm.ProductManufacturingDate,
            });
          });
          setSearchedProducts(all_products);
        });
    }
  };

  const onLogout = () => {
    sessionStorage.setItem("token", "");
    navigate("/login");
  };
  const [curr, setCurr] = useState(
    new Date().setMonth(new Date().getMonth() + 1)
  );
  useEffect(() => {
    console.log(new Date(curr));
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
        .then((response) => {
          console.log(response);
          var all_products = [];
          response.data.map((rdm) => {
            all_products.push({
              Name: rdm.ProductName,
              Description: rdm.ProductDescription,
              Id: rdm.ProductId,
              Exp: rdm.ProductExpiryDate,
              Manu: rdm.ProductManufacturingDate,
            });
          });
          setAllProducts(all_products);
        })
        .catch((err) => {
          sessionStorage.setItem("token", "");
          sessionStorage.setItem("role", "user");
          alert("Session timed out !");
          navigate("/login");
        });
    }
  }, []);

  const onNameChange = (e, id) => {
    var all_products = [...allProducts];
    for (var i = 0; i < all_products.length; i++) {
      if (all_products[i].Id === id) {
        all_products[i].Name = e.target.value;
        break;
      }
    }
    setAllProducts(all_products);
  };

  const onSearchedNameChange = (e, id) => {
    var all_products = [...searchedProducts];
    for (var i = 0; i < all_products.length; i++) {
      if (all_products[i].Id === id) {
        all_products[i].Name = e.target.value;
        break;
      }
    }
    setSearchedProducts(all_products);
  };

  const onDescChange = (e, id) => {
    var all_products = [...allProducts];
    for (var i = 0; i < all_products.length; i++) {
      if (all_products[i].Id === id) {
        all_products[i].Description = e.target.value;
        break;
      }
    }
    setAllProducts(all_products);
  };

  const onSearchedDescChange = (e, id) => {
    var all_products = [...searchedProducts];
    for (var i = 0; i < all_products.length; i++) {
      if (all_products[i].Id === id) {
        all_products[i].Description = e.target.value;
        break;
      }
    }
    setSearchedProducts(all_products);
  };

  const onManuChange = (e, id) => {
    var all_products = [...allProducts];
    for (var i = 0; i < all_products.length; i++) {
      if (all_products[i].Id === id) {
        all_products[i].Manu = e.target.value;
        break;
      }
    }
    setAllProducts(all_products);
  };

  const onExpChange = (e, id) => {
    var all_products = [...allProducts];
    for (var i = 0; i < all_products.length; i++) {
      if (all_products[i].Id === id) {
        all_products[i].Exp = e.target.value;
        break;
      }
    }
    setAllProducts(all_products);
  };

  const updateProduct = (id) => {
    var all_products = [...allProducts];
    for (var i = 0; i < all_products.length; i++) {
      if (all_products[i].Id === id) {
        const params = JSON.stringify({
          ProductId: id,
          ProductName: all_products[i].Name,
          ProductDescription: all_products[i].Description,
          ProductManufacturingDate: all_products[i].Manu,
          ProductExpiryDate: all_products[i].Exp,
        });
        axios
          .put(`http://localhost:57754/api/products/${id}`, params, {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            console.log(response);
          });
        break;
      }
    }
  };

  const updateSearchedProduct = (id) => {
    var all_products = [...searchedProducts];
    for (var i = 0; i < all_products.length; i++) {
      if (all_products[i].Id === id) {
        const params = JSON.stringify({
          ProductId: id,
          ProductName: all_products[i].Name,
          ProductDescription: all_products[i].Description,
          ProductManufacturingDate: all_products[i].Manu,
          ProductExpiryDate: all_products[i].Exp,
        });
        axios
          .put(`http://localhost:57754/api/products/${id}`, params, {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            console.log(response);
          });
        break;
      }
    }
  };

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:57754/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    var all_products = [...allProducts];
    var reqind = -1;
    for (var i = 0; i < allProducts.length; i++) {
      if (all_products[i].Id === id) {
        reqind = i;
      }
    }
    all_products.splice(reqind, 1);
    setAllProducts(all_products);
  };

  const deleteSearchedProduct = (id) => {
    axios.delete(`http://localhost:57754/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    var all_products = [...searchedProducts];
    var reqind = -1;
    for (var i = 0; i < allProducts.length; i++) {
      if (all_products[i].Id === id) {
        reqind = i;
      }
    }
    all_products.splice(reqind, 1);
    setSearchedProducts(all_products);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/products">Team 4</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/products">Products</Nav.Link>
              {sessionStorage.getItem("role") === "admin" && (
                <Nav.Link href="/add">Add Product</Nav.Link>
              )}
              {/* */}
              {/* <Nav.Link href="#" disabled>
                Link
              </Nav.Link> */}
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearchedItem(e.target.value)}
              />
              <NavDropdown
                title={"Search By - " + `${selectedSearch.toUpperCase()}`}
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item onClick={(e) => setSelectedSearch("name")}>
                  Name
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={(e) => setSelectedSearch("description")}
                >
                  Description
                </NavDropdown.Item>
              </NavDropdown>
              <Button variant="outline-success" onClick={onProductSearch}>
                Search
              </Button>
              <Button
                onClick={onLogout}
                style={{ marginLeft: "20px" }}
                variant="light"
              >
                Logout
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <h1>{sessionStorage.getItem("token")}</h1> */}
      <div
        style={{
          backgroundColor: "whitesmoke",
          height: "100vh",
          paddingLeft: "30px",
          paddingRight: "30px",
        }}
      >
        <h1
          style={{
            color: "black",
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          Products
        </h1>

        {searchedProducts.length > 0 && <h4>Searched Products</h4>}

        {searchedProducts.length > 0 && (
          <Table
            style={{ marginTop: "10px" }}
            responsive
            striped
            bordered
            hover
          >
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Description</th>
                <th>Manufacturing Date</th>
                <th>Expiry Date</th>
                {sessionStorage.getItem("role") === "admin" && (
                  <th>Update Item</th>
                )}
                {sessionStorage.getItem("role") === "admin" && (
                  <th>Delete Item</th>
                )}
              </tr>
            </thead>
            <tbody>
              {searchedProducts.map((ap, i) => (
                <tr
                  key={i}
                  style={{
                    backgroundColor: `${
                      new Date(ap.Exp) < new Date(curr) ? "red" : "green"
                    }`,
                  }}
                >
                  <td>
                    <Form.Control
                      value={ap.Name}
                      type="text"
                      placeholder="Item Name"
                      onChange={(e) => onSearchedNameChange(e, ap.Id)}
                      disabled={
                        sessionStorage.getItem("role") === "admin"
                          ? false
                          : true
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      value={ap.Description}
                      type="text"
                      placeholder="Description Name"
                      onChange={(e) => onSearchedDescChange(e, ap.Id)}
                      disabled={
                        sessionStorage.getItem("role") === "admin"
                          ? false
                          : true
                      }
                    />
                  </td>
                  <td>
                    {/* <input type="date"></input> */}
                    <Form.Control
                      value={ap.Manu.substr(0, 10)}
                      type="date"
                      onChange={(e) => onManuChange(e, ap.Id)}
                      disabled="true"
                    />
                  </td>
                  <td>
                    {/* <input type="date"></input> */}
                    <Form.Control
                      value={ap.Exp.substr(0, 10)}
                      type="date"
                      onChange={(e) => onExpChange(e, ap.Id)}
                      disabled="true"
                    />
                  </td>
                  {sessionStorage.getItem("role") === "admin" && (
                    <td
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        as="input"
                        variant="warning"
                        type="submit"
                        value="Update"
                        onClick={(e) => updateSearchedProduct(ap.Id)}
                      />
                    </td>
                  )}
                  {sessionStorage.getItem("role") === "admin" && (
                    <td>
                      <Button
                        as="input"
                        variant="danger"
                        type="submit"
                        value="Delete"
                        onClick={(e) => deleteSearchedProduct(ap.Id)}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {allProducts.length > 0 && <h4>All Products</h4>}

        {allProducts.length > 0 ? (
          <Table
            style={{ marginTop: "10px" }}
            responsive
            striped
            bordered
            hover
          >
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Description</th>
                <th>Manufacturing Date</th>
                <th>Expiry Date</th>
                {sessionStorage.getItem("role") === "admin" && (
                  <th>Update Item</th>
                )}
                {sessionStorage.getItem("role") === "admin" && (
                  <th>Delete Item</th>
                )}
              </tr>
            </thead>
            <tbody>
              {allProducts.map((ap, i) => (
                <tr
                  key={i}
                  style={{
                    backgroundColor: `${
                      new Date(ap.Exp) < new Date(curr) ? "red" : "green"
                    }`,
                  }}
                >
                  <td>
                    <Form.Control
                      value={ap.Name}
                      type="text"
                      placeholder="Item Name"
                      onChange={(e) => onNameChange(e, ap.Id)}
                      disabled={
                        sessionStorage.getItem("role") === "admin"
                          ? false
                          : true
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      value={ap.Description}
                      type="text"
                      placeholder="Description Name"
                      onChange={(e) => onDescChange(e, ap.Id)}
                      disabled={
                        sessionStorage.getItem("role") === "admin"
                          ? false
                          : true
                      }
                    />
                  </td>
                  <td>
                    {/* <input type="date"></input> */}
                    <Form.Control
                      value={ap.Manu.substr(0, 10)}
                      type="date"
                      onChange={(e) => onManuChange(e, ap.Id)}
                      disabled="true"
                    />
                  </td>
                  <td>
                    {/* <input type="date"></input> */}
                    <Form.Control
                      value={ap.Exp.substr(0, 10)}
                      type="date"
                      onChange={(e) => onExpChange(e, ap.Id)}
                      disabled="true"
                    />
                  </td>
                  {sessionStorage.getItem("role") === "admin" && (
                    <td
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        as="input"
                        variant="warning"
                        type="submit"
                        value="Update"
                        onClick={(e) => updateProduct(ap.Id)}
                      />
                    </td>
                  )}
                  {sessionStorage.getItem("role") === "admin" && (
                    <td>
                      <Button
                        as="input"
                        variant="danger"
                        type="submit"
                        value="Delete"
                        onClick={(e) => deleteProduct(ap.Id)}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "100px",
            }}
          >
            <h3>No Products !</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
