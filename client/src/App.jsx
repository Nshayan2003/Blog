import { Route, Routes } from "react-router-dom";
import {
  CreatePost,
  EditPost,
  Home,
  Login,
  PostDetail,
  Profile,
  Register,
} from "./pages";
import { Navbar } from "./components";
import { Toaster } from "react-hot-toast";
import Layout from "./layouts/Layout";
import { useState } from "react";
import { useDebounce } from "./hooks/useDebounce";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm);
  return (
    <>
      <div>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route element={<Layout />}>
            <Route
              path="/"
              element={<Home debouncedSearch={debouncedSearch} />}
            />
            <Route path="/profile" element={<Profile />} />
            {/* Posts */}
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Route>
        </Routes>
      </div>
      <Toaster toastOptions={{ position: "top-center", duration: 3000 }} />
    </>
  );
};

export default App;
