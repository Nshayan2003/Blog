const Button = ({ label, onClick, isLoading = false, type = "button" }) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      onClick={onClick}
      className={`w-full ${
        isLoading
          ? "bg-gray-300 text-black hover:bg-0 cursor-not-allowed"
          : "bg-blue-700 hover:bg-blue-800 text-white"
      } focus:outline-none font-medium mt-4 h-11 rounded-lg`}
    >
      {label}
    </button>
  );
};

export default Button;
