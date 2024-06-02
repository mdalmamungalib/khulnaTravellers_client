import "./Video.css";
import video from "/src/assets/video/videoplayback.mp4";

const Video = () => {
  return (
    <div className="mt-36 relative">
      <div className="overly">
        <video
          className="w-full"
          src={video}
          autoPlay
          loop
          muted></video>
        <div
          className="content inset-0 font-serif">
          <h2 className="text-[5vw] font-bold">Welcome</h2>
          <h1 className="text-[3vw]  font-bold">
            TRAVELING AROUND THE WORLD
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Video;
