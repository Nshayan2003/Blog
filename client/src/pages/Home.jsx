import { Post } from "../components";
import usePosts from "../hooks/post/usePosts";

const Home = ({ debouncedSearch }) => {
  const { data: posts, isLoading } = usePosts(debouncedSearch);

  return (
    <div className="px-4 my-6 max-w-[1500px] w-full mx-auto">
      {isLoading ? (
        <p>Loading...</p>
      ) : posts?.length > 0 ? (
        <div className=" w-full grid lg:grid-cols-3  md:grid-cols-2 grid-cols-1 gap-6 ">
          {posts?.map((post) => {
            return <Post post={post} key={post?._id} />;
          })}
        </div>
      ) : (
        "Not found"
      )}
    </div>
  );
};

export default Home;
