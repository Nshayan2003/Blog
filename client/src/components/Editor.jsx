import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ value, onChange }) => {
  return (
    <div className="">
      <ReactQuill theme="snow" value={value} onChange={onChange} className="" />
    </div>
  );
};

export default Editor;
