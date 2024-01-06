import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: '',
    category: '',
    new_price: '',
    old_price: '',
    image: '',
  });

  const imageHandler = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage || e.target.files.length === 0) {
      setImage(selectedImage);
    }
  };
  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const AddProduct = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('product', image);

      const response = await fetch('http://localhost:4444/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setProductDetails({
            ...productDetails,
            image: data.image_url,
          });
        } else {
          console.error('Image upload unsuccessful:', data.message);
        }
      } else {
        console.error('Invalid response:', response.statusText);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error during image upload:', error);
    } finally {
    }
  };
  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          type="text"
          value={productDetails.name}
          onChange={changeHandler}
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="women">Women</option>
          <option value="men">men</option>
          <option value="kid">kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumnaul-img"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          AddProduct();
        }}
        className="addproduct-btn"
      >
        {loading ? 'Adding...' : 'ADD'}
      </button>
    </div>
  );
};

export default AddProduct;
