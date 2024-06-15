import { TiHome } from "react-icons/ti";
import { GiShoppingBag } from "react-icons/gi";
import { IoMenu } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiPlanetConquest } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { GrChapterAdd } from "react-icons/gr";
import { NavLink, Outlet } from "react-router-dom";
import UseHelmetTitle from "../Hooks/UseHelmetTitle";
import { GrGallery } from "react-icons/gr";
import { SiHomebridge } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
// import useAdmin from "../Hooks/useAdmin";

const DashBoard = () => {
  // const [isAdmin] = useAdmin();

  // console.log("isadmin true",isAdmin)
  const [axiosSecure] = useAxiosSecure();

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allUsers");
      return res.data;
    },
  });

  // const isAdmin = true;
  return (
    <div className="drawer lg:drawer-open">
      <UseHelmetTitle title={"Dash Board"} />
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-[#e0eefa]">
        <div className="flex justify-end mt-5 mr-2">
          <label
            htmlFor="my-drawer-2"
            className="btn border-none bg-[#86A789] drawer-button
                     lg:hidden text-2xl text-white"
          >
            <GiHamburgerMenu></GiHamburgerMenu>
          </label>
        </div>
        <div className="flex flex-col justify-center items-center p-5 ">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay bg-[#86A789]"
        ></label>

        <ul
          className="menu p-4 w-80 mt-0 min-h-full bg-[#86A789]
         text-black font-bold uppercase"
        >
          {/* Sidebar content here */}
          <NavLink to="/dashBoard/home">
            <div className="text-center font-serif uppercase">
              <h1 className="text-[23.322px] font-extrabold">
                Khulna Travelers
              </h1>
              <p
                style={{ "letter-spacing": "5px" }}
                className="text-[17.492px]"
              >
                Online App
              </p>
            </div>
          </NavLink>
          <li className="mt-10">
          <NavLink to="/dashBoard/myProfile">
                <CgProfile /> My Profile
              </NavLink>
              <NavLink to="/dashBoard/home">
                <SiHomebridge /> Dashboard Home
              </NavLink>
              <NavLink to="/dashBoard/allUsers">
                <FaUsers /> All Users
              </NavLink>
              <NavLink to="/dashBoard/addlatestPlan">
                <GrChapterAdd /> Add latest Plan
              </NavLink>
              <NavLink to="/dashBoard/allLatestPlan">
                <GiPlanetConquest /> All latest Plan
              </NavLink>
              <NavLink to="/dashBoard/addThemMember">
                <GrChapterAdd /> Add A Team Member
              </NavLink>
              <NavLink to="/dashBoard/allThemMember">
                <FaAddressCard /> All Team Member
              </NavLink>
              <NavLink to="/dashBoard/addBanner">
                <GrChapterAdd /> Add Banner & Preview
              </NavLink>
              <NavLink to="/dashBoard/addGallery">
                <GrGallery /> Add Gallery & Preview
              </NavLink>
            </li>
          {/* {isAdmin === true ? (
            <li className="mt-10">
              
              <NavLink to="/dashBoard/home">
                <SiHomebridge /> Dashboard Home
              </NavLink>
              <NavLink to="/dashBoard/allUsers">
                <FaUsers /> All Users
              </NavLink>
              <NavLink to="/dashBoard/addlatestPlan">
                <GrChapterAdd /> Add latest Plan
              </NavLink>
              <NavLink to="/dashBoard/allLatestPlan">
                <GiPlanetConquest /> All latest Plan
              </NavLink>
              <NavLink to="/dashBoard/addThemMember">
                <GrChapterAdd /> Add A Team Member
              </NavLink>
              <NavLink to="/dashBoard/allThemMember">
                <FaAddressCard /> All Team Member
              </NavLink>
              <NavLink to="/dashBoard/addBanner">
                <GrChapterAdd /> Add Banner & Preview
              </NavLink>
              <NavLink to="/dashBoard/addGallery">
                <GrGallery /> Add Gallery & Preview
              </NavLink>
            </li>
          ) : (
            <li className="mt-10">
              <NavLink to="/dashBoard/myProfile">
                <CgProfile /> My Profile
              </NavLink>
            </li>
          )} */}

          <div className="divider bg-white w-[233px] h-[1px]"></div>
          <li>
            <NavLink to="/">
              <TiHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/destination">
              <IoMenu /> Destination
            </NavLink>
          </li>
          <li>
            <NavLink to="/gallery">
              <GrGallery /> Gallery
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
