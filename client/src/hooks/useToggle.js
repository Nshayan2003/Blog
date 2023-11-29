import { useCallback, useEffect, useRef, useState } from "react";

const useToggle = (initialValue = false) => {
  const [toggle, setToggle] = useState(initialValue);
  const toggleRef = useRef();

  const onToggle = useCallback(() => setToggle((prev) => !prev), []);
  const onClose = useCallback(() => setToggle(false), []);
  const onOpen = useCallback(() => setToggle(true), []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggleRef.current && !toggleRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return {
    toggle,
    onClose,
    onOpen,
    onToggle,
    toggleRef
  };
};

export default useToggle;
