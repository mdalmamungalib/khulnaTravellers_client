import { useQuery } from "@tanstack/react-query";
import { Carousel } from "react-responsive-carousel";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Loader from "../../../../Loader/Loader";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Add this line to import carousel styles

const Banner = () => {
  const [axiosSecure] = useAxiosSecure();

  const {
    data: banner = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allBanner");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full mx-auto">
      <Carousel
        autoPlay
        infiniteLoop
        interval={3000} // Adjust interval as needed
        showThumbs={false}
        showStatus={false}
      >
        {banner.map((image, id) => (
          <div
            key={id}
            className="flex justify-center items-center overflow-hidden"
          >
            <PhotoProvider>
              <PhotoView src={image?.imageURL}>
                <img
                  className="w-full max-h-[800px] object-cover"
                  src={image?.imageURL}
                  alt="banner"
                />
              </PhotoView>
            </PhotoProvider>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
