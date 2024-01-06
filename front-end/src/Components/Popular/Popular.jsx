import React, { useState, useEffect } from 'react';
import './Popular.css';
import Item from '../Items/Item';

const PopularinWomen = () => {
  const [popular_in_women, setPopulariNWomen] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4444/popularinwomen')
      .then((res) => res.json())
      .then((data) => {
        setPopulariNWomen(data);
      });
  }, []);
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popular_in_women.map((item) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PopularinWomen;
