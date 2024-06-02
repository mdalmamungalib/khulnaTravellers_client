import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const HomeCard = () => {
  const cardData = [
    {
      imgUrl:
        "https://images.pexels.com/photos/416179/pexels-photo-416179.jpeg?auto=compress&cs=tinysrgb&w=600",
      location: "Italy",
    },
    {
      imgUrl:
        "https://images.pexels.com/photos/36762/scarlet-honeyeater-bird-red-feathers.jpg?auto=compress&cs=tinysrgb&w=600",
      location: "Morocco",
    },
    {
      imgUrl:
        "https://images.pexels.com/photos/1435849/pexels-photo-1435849.jpeg?auto=compress&cs=tinysrgb&w=600",
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
      <div className="flex justify-between">
        <div>
          <p className="font-bold text-zinc-500">
            PLAN YOUR TRIP
          </p>
          <h1 className="sm:text-5xl text-3xl font-bold ">
            Where to next?
          </h1>
        </div>
        <div className="mt-5 hidden sm:block ">
          <button className="btn btn-ghost border border-gray-500 hover:bg-sky-600 hover:text-white rounded-full">
            View all destinations
          </button>
        </div>
      </div>
      {/* card section */}
      <div className="hidden sm:block">
        <div className="mt-[76px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
          {cardData.map((card, index) => (
            <div key={index}>
              <div className="card max-w-[470px] min-h-[485px] bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={card?.imgUrl}
                    alt="Shoes"
                    className="rounded-xl min-h-[485px]"
                  />
                </figure>
              </div>
              <h3 className="text-2xl font-bold mt-5">
                {card?.location}
              </h3>
            </div>
          ))}
        </div>
      </div>
      {/* small device slider card */}
      <div className="sm:hidden block gap-10 mt-10">
        <Slider {...settings}>
          {cardData.map((card, index) => (
            <div key={index}>
              <div className="card max-w-[470px] min-h-[485px] bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={card?.imgUrl}
                    alt="Shoes"
                    className="rounded-xl min-h-[485px]"
                  />
                </figure>
              </div>
              <h3 className="text-2xl font-bold mt-5">
                {card?.location}
              </h3>
            </div>
          ))}
        </Slider>
      </div>
      {/* small devise show button */}
      <div className="block sm:hidden mt-10 flex justify-center">
        <button
          className="btn btn-ghost border border-gray-500
         hover:bg-sky-600 hover:text-white rounded-full">
          View all destinations
        </button>
      </div>
    </div>
  );
};

export default HomeCard;
