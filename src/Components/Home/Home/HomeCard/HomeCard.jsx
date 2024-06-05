import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeCard = () => {
  const cardData = [
    {
      imgUrl: "https://images.pexels.com/photos/416179/pexels-photo-416179.jpeg?auto=compress&cs=tinysrgb&w=600",
      location: "Italy",
    },
    {
      imgUrl: "https://images.pexels.com/photos/36762/scarlet-honeyeater-bird-red-feathers.jpg?auto=compress&cs=tinysrgb&w=600",
      location: "Morocco",
    },
    {
      imgUrl: "https://images.pexels.com/photos/1435849/pexels-photo-1435849.jpeg?auto=compress&cs=tinysrgb&w=600",
      location: "Costa Rica",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <div className="max-w-screen-2xl mx-auto mt-20 px-5">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
        <div className="text-center sm:text-left">
          <p className="font-bold text-zinc-500">PLAN YOUR TRIP</p>
          <h1 className="sm:text-5xl text-3xl font-bold mt-2">Where to next?</h1>
        </div>
        <div className="mt-5 sm:mt-0">
          <button className="btn btn-ghost border border-gray-500 hover:bg-sky-600 hover:text-white rounded-full px-6 py-3">
            View all destinations
          </button>
        </div>
      </div>

      {/* Large devices card section */}
      <div className="hidden sm:block">
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cardData.map((card, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="card w-full bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={card?.imgUrl}
                    alt={card?.location}
                    className="rounded-xl w-full h-80 object-cover"
                  />
                </figure>
              </div>
              <h3 className="text-2xl font-bold mt-5">{card?.location}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Small device slider card */}
      <div className="sm:hidden block mt-10">
        <Slider {...settings}>
          {cardData.map((card, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="card w-full bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={card?.imgUrl}
                    alt={card?.location}
                    className="rounded-xl w-full h-80 object-cover"
                  />
                </figure>
              </div>
              <h3 className="text-2xl font-bold mt-5">{card?.location}</h3>
            </div>
          ))}
        </Slider>
      </div>

      {/* Small device show button */}
      <div className="block sm:hidden mt-10 flex justify-center">
        <button className="btn btn-ghost border border-gray-500 hover:bg-sky-600 hover:text-white rounded-full px-6 py-3">
          View all destinations
        </button>
      </div>
    </div>
  );
};

export default HomeCard;
