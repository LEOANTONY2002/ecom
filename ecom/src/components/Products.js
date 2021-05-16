import React, { useEffect, useState } from "react";
import "./Products.css";
import cre from "./images/create.png";
import cancel from "./images/cancel.png";
import edit from "./images/edit.png";
import del from "./images/delete.png";
import cam from "./images/cam.png";
import { useDispatch, useSelector } from "react-redux";
import { open } from "../actions/openAction";
import {
  createProduct,
  deleteProduct,
  getUserProducts,
} from "../actions/productAction";
import Cookies from "js-cookie";
import Axios from "../axios";
import { storage } from "../firebase";

function Products() {
  const [id, setId] = useState(null);
  const [create, setCreate] = useState(false);
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const { uload, products, ufail } = useSelector((state) => state.userProducts);
  const { product, fail } = useSelector((state) => state.product);

  useEffect(() => {
    const fetch = async () => {
      const usr = await Cookies.getJSON("ecom_user");
      setUser(usr);
      dispatch(getUserProducts(usr.email));
    };
    fetch();
    console.log(products);
    if (product) setCreate(false);
  }, [create, product]);

  const openModal = (product) => {
    setCreate(true);
    setId(product._id);
    console.log(product._id);
    setName(product.name);
    setPrice(product.price);
    setDesc(product.desc);
    setImage(product.image);
    setCategory(product.category);
    setStock(product.stock);
    dispatch(open());
  };

  const createProductHandler = async (e) => {
    e.preventDefault();
    if (id) {
      await dispatch(
        createProduct({
          _id: id,
          username: user.name,
          email: user.email,
          name,
          desc,
          image,
          category,
          stock,
          price,
        })
      );
      setCreate(false);
    } else {
      await dispatch(
        createProduct({
          username: user.name,
          email: user.email,
          name,
          desc,
          image,
          category,
          stock,
          price,
        })
      );
      setCreate(false);
    }
    const p = await product;
    if (p) setCreate(false);
  };

  const uploadFileHandler = (e) => {
    setUploading(true);
    const file = e.target.files[0];
    const date = Date.now();
    const up = storage
      .ref(`/posts/${user?.email}/${date}${file.name}`)
      .put(file);
    up.on("state_changed", (snap) => {
      storage
        .ref(`/posts/${user.email}/${date}${file.name}`)
        .getDownloadURL()
        .then((response) => {
          setImage(response);
          setUploading(false);
        })
        .catch((err) => {
          console.log(err);
          setUploading(false);
        });
    });
  };

  return (
    <div className="products">
      {create && (
        <div className="model">
          <div className="reg p-reg">
            <img
              onClick={() => setCreate(false)}
              className="cancelIc"
              src={cancel}
              alt="cancel"
            />
            <div className="m-field">
              <p>Name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="m-field">
              <p>Description</p>
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </div>
            <div className="imgField">
              <p>Image</p>
              <div>
                <img src={cam} alt="camera" />
                <input type="file" onChange={uploadFileHandler} required />
                {uploading && <p>Uploading...</p>} <p className="up">{image}</p>
              </div>
            </div>
            <div className="m-field">
              <p>Category</p>
              <select
                className="drop"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option>SELECT</option>
                <option value="accessories">Tech Accessories</option>
                <option value="fashion">Fashion & Clothings</option>
                <option value="art">Arts</option>
                <option value="book">Books</option>
                <option value="electronics">
                  Electronics & Home Appliances
                </option>
                <option value="food">Food & Groceries</option>
                <option value="toy">Toys</option>
                <option value="other">Others</option>
              </select>
            </div>
            <div className="m-field">
              <p>Price</p>
              <input
                value={price}
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="m-field">
              <p>Stock</p>
              <input
                value={stock}
                type="number"
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
            <button onClick={createProductHandler}>
              {id ? "EDIT" : "CREATE"}
            </button>

            {fail && <p className="fail">{fail}</p>}
          </div>
        </div>
      )}
      <div className="your">
        <p>YOUR PRODUCTS</p>
      </div>
      <div onClick={() => setCreate(true)} className="p-head">
        <img src={cre} alt="create" />
        <p>create new product</p>
      </div>
      <div className="p-body">
        {uload && (
          <div className="loading">
            <div>
              <p>.</p>
              <p>.</p>
              <p>.</p>
            </div>
          </div>
        )}
        {products &&
          products?.map((p) => (
            <div className="p-wrap">
              <div className="prod">
                <img src={p?.image} alt="" />
                <div className="p-desc">
                  <p className="name">{p?.name}</p>
                  <p className="desc">{p?.desc}</p>
                  <p className="cat">
                    <span>Category : </span>
                    {p?.category}
                  </p>

                  <p>
                    <span>Stock : </span>
                    {p?.stock}
                  </p>
                  <p className="price">₹{p?.price}</p>
                </div>
                <div className="overlay">
                  <div onClick={() => openModal(p)}>
                    <img src={edit} alt="" />
                    <p>EDIT</p>
                  </div>
                  <div onClick={() => dispatch(deleteProduct(p?._id))}>
                    <img src={del} alt="" />
                    <p>DELETE</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
export default Products;
