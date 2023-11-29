const Input = (props) => {
  const {
    name,
    id,
    label,
    isIcon,
    value,
    onChange,
    icon: Icon,
    type = "text",
    errors,
    onClick,
    ...rest
  } = props;
  return (
    <div className="w-full flex flex-col relative">
      <label htmlFor={id} className="text-sm font-medium mb-[1px]">
        {label}
      </label>
      <div className="w-full relative">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          {...rest}
          className={`bg-gray-50 border ${
            errors?.[name]?.type
              ? "border-red-400 focus:ring-red-500 focus:border-red-500"
              : "border-gray-400 focus:ring-blue-500 focus:border-blue-500"
          }   text-gray-900 text-sm rounded-lg outline-0 block w-full p-2.5`}
        />
        {isIcon && (
          <div
            onClick={onClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer  ounded-full"
          >
            <Icon size={20} />
          </div>
        )}
      </div>
      {errors && (
        <small className="text-red-600 ml-2">{errors?.[name]?.message}</small>
      )}
    </div>
  );
};

export default Input;
