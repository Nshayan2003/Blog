import { Link, useNavigate } from "react-router-dom";
import { MdLogout, MdOutlineFileUpload } from "react-icons/md";
import useToggle from "../hooks/useToggle";
import useLogout from "../hooks/useLogout";
import useProfile from "../hooks/useProfile";
import Search from "./Search";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const profileToggle = useToggle(false);
  const { data: user } = useProfile();

  const logout = useLogout();

  const handleSerachTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
    profileToggle.onClose();
  };

  return (
    <header className="w-full h-16 bg-white shadow sticky top-0 left-0 right-0 z-[1000]">
      <div className="max-w-[1500px] w-full mx-auto flex items-center justify-between h-full px-4">
        <Link to="/">
          <p className="text-2xl font-bold font-mono">My Blog</p>
        </Link>

        <div className="lg:max-w-xl lg:w-full sm:w-[350px]">
          <Search value={searchTerm} onChange={handleSerachTerm} />
        </div>

        <div className="flex items-center gap-4 relative">
          {user && (
            <button
              onClick={() => navigate("/create-post")}
              className="flex text-sm items-center justify-center gap-1 border rounded-lg border-gray-300 px-4 py-[10px] cursor-pointer"
            >
              <MdOutlineFileUpload size={20} />
              Upload
            </button>
          )}
          <div
            ref={profileToggle.toggleRef}
            onClick={profileToggle.onToggle}
            className="w-10 h-10 border rounded-full relative"
          >
            <img
              src={
                user && user?.avatar
                  ? user.avatar?.url
                  : "https://res.cloudinary.com/pavitarsharma/image/upload/v1683457291/dm5pkbvd9q10mwqxrbdp.png"
              }
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />

            {profileToggle.toggle && (
              <div
                onClick={(event) => event.stopPropagation()}
                className="w-[250px]  bg-white shadow absolute z-10 -left-[200px] top-11 border rounded-lg p-2"
              >
                {user ? (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          user && user?.avatar
                            ? user.avatar?.url
                            : "https://res.cloudinary.com/pavitarsharma/image/upload/v1683457291/dm5pkbvd9q10mwqxrbdp.png"
                        }
                        alt="profile"
                        className="w-16 h-16 border rounded-full object-cover"
                      />
                      <span className="font-semibold break-words">
                        {user?.name}
                      </span>
                    </div>
                    <p className="my-2 break-words text-base font-medium opacity-70">
                      {user?.email}
                    </p>

                    <div className="w-full h-[1px] bg-gray-300 rounded-md my-4"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-1  rounded-lg bg-blue-600 text-white hover:bg-blue-800 transition text-sm duration-300 px-4 py-[10px] cursor-pointer"
                    >
                      <MdLogout size={20} />
                      Log out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => {
                        navigate("/sign-up");
                        profileToggle.onClose();
                      }}
                      className="flex items-center justify-center gap-1  rounded-lg bg-white text-balck   text-sm border border-gray-300 px-4 py-[10px] cursor-pointer"
                    >
                      Sign Up
                    </button>
                    <button
                      onClick={() => {
                        navigate("/login");
                        profileToggle.onClose();
                      }}
                      className="flex items-center justify-center gap-1  rounded-lg bg-blue-600 text-white hover:bg-blue-800 transition text-sm duration-300 px-4 py-[10px] cursor-pointer"
                    >
                      Log In
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
