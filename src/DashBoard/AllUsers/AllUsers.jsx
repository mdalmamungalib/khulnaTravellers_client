import { FaTrash } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { CgMail } from "react-icons/cg";
import axios from "axios";
import UseHelmetTitle from "../../Hooks/UseHelmetTitle";
import Loader from "../../Loader/Loader";
import { PhotoProvider, PhotoView } from "react-photo-view";

const AllUsers = () => {
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


  // make A Admin
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/user/admin/${user?._id}`).then((res) => {
      if (res?.data?.modifiedCount) {
        refetch();
        Swal.fire(`${user?.name} has ben admin`);
      }
    });
  };

  // user Delete
  // const handleDelete = () => {
  //   if (!user || loading) {
  //     return;
  //   }

  //   const promptUserForCredential = () => {
  //     const password = window.prompt("Please enter your password:");
  //     if (password) {
  //       const credential = firebase.auth.EmailAuthProvider.credential(
  //         user.email,
  //         password
  //       );
  //       return credential;
  //     }
  //     return null;
  //   };

  //   const credential = promptUserForCredential(); // Call the function to get the credential

  //   if (credential) {
  //     user
  //       .reauthenticateWithCredential(credential) // Use the obtained credential
  //       .then(() => {
  //         userDelete()
  //           .then(() => {
  //             console.log("User deleted successfully");
  //             // Optionally, perform any additional actions after user deletion
  //           })
  //           .catch((error) => {
  //             console.error("Error deleting user:", error);
  //             // Handle error appropriately
  //           });
  //       })
  //       .catch((error) => console.log("Error", error));
  //   }
  // };

  const handleDelete = (user) => {
    Swal.fire({
      title: `Are you sure Delete ${user?.email}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/user/delete/${user?._id}`).then((res) => {
          if (res?.data?.acknowledged === true) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${user?.name} has been deleted.`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  const getIcon = (method) => {
    switch (method) {
      case "google.com":
        return <FcGoogle className="text-2xl " />;
      case "facebook.com":
        return <FaFacebook className="text-2xl text-[#1877F2]" />;
      case "github.com":
        return <FaGithub className="text-2xl text-[#4479c5]" />;
      default:
        return <CgMail className="text-2xl text-[#e85543]" />;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <UseHelmetTitle title={"All-Users"} />
      <div className="w-full bg-slate-100 p-4 md:p-12 rounded-2xl overflow-x-auto">
        <div className="flex justify-evenly items-center gap-10  uppercase text-black">
          <h1 className="text-2xl sm:text-3xl md:text-xl lg:text-3xl font-bold">
            Total users: {users.length}
          </h1>
        </div>
        {/* table aria....... */}
        <div className="overflow-x-auto w-full h-full  mt-[38px]">
          <div className="md:flex">
            <table className="table w-full">
              {/* head */}
              <thead
                style={{
                  "border-radius": "15px 15px 0px 0px",
                  background: "#86A789",
                }}
                className="text-white uppercase"
              >
                <tr>
                  <th></th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Method</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {/* row 1 */}

                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          {user?.userImage ? (
                            <PhotoProvider>
                              <PhotoView src={user?.userImage}>
                                <img
                                  src={user?.userImage}
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </PhotoView>
                            </PhotoProvider>
                          ) : (
                            <img
                              src={
                                "https://i.pngimg.me/thumb/f/350/m2H7H7N4b1Z5H7m2.jpg"
                              }
                              alt="Avatar Tailwind CSS Component"
                            />
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="font-bold">{user?.name}</div>
                    </td>
                    <td>
                      <div>{getIcon(user?.method)}</div>
                    </td>
                    {/* todo: change image name */}
                    <td className="flex text-lg">{user?.email}</td>

                    <th>
                      {user?.role === "admin" ? (
                        "Admin"
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="btn bg-[#B2C8BA]
                       hover:bg-[#EBF3E8] border-none 
                       text-black text-2xl"
                        >
                          <FaUserShield></FaUserShield>
                        </button>
                      )}
                      {/* <button
                        className="btn bg-[#B2C8BA]
                       hover:bg-[#EBF3E8] border-none 
                       text-black text-2xl">
                        <FaUserShield></FaUserShield>
                      </button> */}
                    </th>
                    <th>
                      <button
                        onClick={() => handleDelete(user)}
                        className="btn bg-[#B91C1C] border-none 
                      hover:bg-[white] hover:text-[#B91C1C] btn-xs 
                      w-12 h-12 text-white text-lg"
                      >
                        <FaTrash></FaTrash>
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
