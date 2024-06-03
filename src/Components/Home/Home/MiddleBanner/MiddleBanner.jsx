import { Link } from "react-router-dom";

const MiddleBanner = () => {
  return (
    <div className="mt-24">
      <section
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=600)",
        }}
      >
        <div
          className="absolute inset-0 bg-white/25 sm:bg-transparent
         sm:from-white/25 sm:to-white/25 ltr:sm:bg-gradient-to-r 
         rtl:sm:bg-gradient-to-l"
        ></div>

        <div
          className="relative max-w-screen-xl px-4 py-32 sm:px-6 lg:flex 
        lg:h-screen lg:items-center lg:px-8"
        >
          <div className="max-w-xl  ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl text-[#0f172a] font-extrabold sm:text-5xl">
              Let us find your
              <strong className="block font-extrabold text-rose-700">
                {" "}
                Forever Place.{" "}
              </strong>
            </h1>

            <p className="mt-4 max-w-lg text-black sm:text-xl/relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <Link onClick={() => window.screenTop(0, 0)} to={"/destination"}>
                <a className="block w-full rounded bg-rose-600 border-none px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto">
                  View All Tour
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MiddleBanner;
