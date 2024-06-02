import React from "react";

const Album = () => {
  const images = [
    {
      img: "https://images.pexels.com/photos/2131904/pexels-photo-2131904.jpeg?auto=compress&cs=tinysrgb&w=600",
      user: "@user_name",
    },
    {
      img: "https://images.pexels.com/photos/2131946/pexels-photo-2131946.jpeg?auto=compress&cs=tinysrgb&w=600",
      user: "@user_name",
    },
    {
      img: "https://images.pexels.com/photos/2131776/pexels-photo-2131776.jpeg?auto=compress&cs=tinysrgb&w=600",
      user: "@user_name",
    },
    {
      img: "https://images.pexels.com/photos/2131892/pexels-photo-2131892.jpeg?auto=compress&cs=tinysrgb&w=600",
      user: "@user_name",
    },
    {
      img: "https://images.pexels.com/photos/2131904/pexels-photo-2131904.jpeg?auto=compress&cs=tinysrgb&w=600",
      user: "@user_name",
    },
    {
      img: "https://images.pexels.com/photos/15698350/pexels-photo-15698350/free-photo-of-silhouettes-of-seaside-town-houses-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600",
      user: "@user_name",
    },
  ];
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6">
      {images.map((image, i) => (
         <div key={i}>
         <img
           className="max-w-[210px] sm:max-w-[380px] min-h-[200px] md:min-h-[400px]"
           src={image?.img}
           alt=""
         />
       </div>
      ))}
    </div>
  );
};

export default Album;
