import { IoSearchOutline } from "react-icons/io5";

const Search = ({ value, onChange }) => {
  return (
    <div className="relative h-10 ">
      <input
        type="text"
        id="search"
        value={value}
        onChange={onChange}
        placeholder="Search your blog..."
        className="w-full  text-sm  border border-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 h-full outline-0 block p-2.5 pl-8"
      />
      <IoSearchOutline size={20} className="absolute top-1/2 -translate-y-1/2 left-2" />
    </div>
  );
};

export default Search;
