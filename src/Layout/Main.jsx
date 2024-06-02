import { useState } from "react";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Main = () => {
  const [bgColor, setBgColor] = useState(true);
  const location = useLocation();
  const noHeaderFooterRoutes = ["/signUp", "/login" ];
  const noHeaderFooter = noHeaderFooterRoutes.some(route => location.pathname.includes(route));

  return (
    <div
      className={
        bgColor
          ? "bg-slate-100 text-slate-900"
          : "bg-slate-900 text-white"
      }
    >
      {!noHeaderFooter && <Navbar bgColor={bgColor} setBgColor={setBgColor} />}
      <Outlet />
      {!noHeaderFooter && <Footer />}
    </div>
  );
};

export default Main;
