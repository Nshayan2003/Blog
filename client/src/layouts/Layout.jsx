import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="px-4 my-6 max-w-[1500px] w-full mx-auto">
      <Outlet />
    </div>
  );
};

export default Layout;
