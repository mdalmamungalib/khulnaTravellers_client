import { Link } from "react-router-dom";
import Authentication from "../../Hooks/Authentication";
import Swal from "sweetalert2";
import useAdmin from "../../Hooks/useAdmin";
import logo from "/src/assets/travelLogo.png"


const Navbar = ({ bgColor, setBgColor }) => {
  const { user, logOut } = Authentication();
  const [isAdmin] = useAdmin();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "You have logged out! Please Log In",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error?.message);
      });
  };

  const navOptions = (
    <>
      <li>
        <Link onClick={() => window.scrollTo(0, 0)} to={"/"}>
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link
          onClick={() => window.scrollTo(0, 0)}
          to={"/destination"}>
          <a>Destinations</a>
        </Link>
      </li>
      <li>
        <Link to={"/gallery"}><a>Gallery</a></Link>
        
      </li>
      {user ? (
        <li>
          <Link to={"/dashBoard/home"}>
            <a>Dash Board</a>
          </Link>
        </li>
      ) : null}
      {user ? (
        <li
          onClick={handleLogOut}
          className="bg-white rounded-full hover:bg-sky-600 text-black hover:text-slate-300">
          <Link to={"/logIn"}>Log Out</Link>
        </li>
      ) : (
        <li className="bg-white rounded-full hover:bg-sky-600 text-black hover:text-slate-300">
          <Link to={"/signUp"}>Sign in</Link>
        </li>
      )}
    </>
  );
  return (
    <div className=" mx-auto flex justify-center">
      <div
        className="navbar fixed z-10 bg-opacity-0 text-white max-w-screen-xl
       sm:mt-5">
        <div className="navbar-start">
          <div className="dropdown text-slate-700">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 
              shadow bg-base-100 rounded-box w-52">
              {navOptions}
            </ul>
          </div>
          <div className="form-control">
            <div className="mx-auto">
              <Link to="/">
                <img
                  className="w-28"
                  src={logo}
                  alt="travelLogo"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-end w-full gap-5">
          <div className="navbar-end hidden lg:flex w-auto">
            <ul className="menu menu-horizontal px-1 text-base font-bold text-slate-500">
              {navOptions}
            </ul>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-[white] "
            onClick={() => setBgColor(!bgColor)}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
