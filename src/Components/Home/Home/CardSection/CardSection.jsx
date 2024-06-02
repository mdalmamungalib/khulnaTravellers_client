import React from 'react';
import "./CardSection.css"

const CardSection = () => {
  return (
   <div className="card" style={{ backgroundImage: `url(${"https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=600"})` }}>
   <div className="card-content">
     <h2 className="card-title">Title</h2>
     <p className="card-text">some text</p>
   </div>
 </div>
  );
}

export default CardSection;
