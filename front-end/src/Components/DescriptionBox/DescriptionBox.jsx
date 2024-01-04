import React from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews(122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          An e-commer website is an online platform that facilitates you to
          create buying Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Impedit rerum dolores sequi quod laudantium sapiente minus magni
          eius alias ipsam, at ut earum vero facilis non aspernatur natus vitae
          saepe?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          tempora sunt suscipit nesciunt vel inventore placeat culpa iusto.
          Ipsam ut animi facere a earum quidem, dolore nesciunt cumque
          consectetur minima.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
