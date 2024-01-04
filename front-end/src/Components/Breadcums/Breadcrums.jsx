import React from 'react';
import './Breadcrum.css';
import arrow_icon from '../Assets/arrow.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Breadcums = (props) => {
  const { product } = props;
  if (!product || !product.category || !product.name) {
    // Handle the case when product or its properties are undefined
    return null;
  }
  return (
    <div className="breadcrum">
      HOME
      <FontAwesomeIcon icon={faArrowRight} />
      SHOP
      <FontAwesomeIcon icon={faArrowRight} />
      {product.category}
      <FontAwesomeIcon icon={faArrowRight} />
      {product.name}
    </div>
  );
};

export default Breadcums;
