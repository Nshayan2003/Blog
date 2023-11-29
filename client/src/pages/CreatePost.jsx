import { Controller, useForm } from "react-hook-form";
import { Button, Editor, Input } from "../components";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { handleApiError } from "../utils/handleApiError";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useProfile from "../hooks/useProfile";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const axiosPrivate = useAxiosPrivate();
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useProfile();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (values) => {
    const tags = values.tags.split(",").map((tag) => tag.trim());

    const resposneBody = {
      title: values.title,
      description: values.description,
      tags,
      image: values.image,
    };
    setIsLoading(true);

    try {
      await axiosPrivate.post("/post", resposneBody);

      mutate("/user/profile");
      toast.success("Blog created successfully");
      setTimeout(() => {
        navigate("/");
      });

      setValue("title", "");
      setValue("description", "");
      setValue("tags", "");
      setValue("image", "");
      setImage(null);
    } catch (error) {
      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred when are you create your post?";
      }

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Drag and Drop File
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    const filename = file.name;
    const fileType = filename.split(".").pop();
    if (
      ["jpeg", "png", "JPEG", "PNG", "jpg", "JPG", "svg"].includes(fileType)
    ) {
      setImage(file);
    } else {
      toast.error("Please select a valid image");
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="bg-white border rounded-lg shadow max-w-3xl w-full mx-auto mt-12 py-6 px-6">
      <h1 className="text-center font-semibold  text-2xl">Create Blog Post</h1>

      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mt-6 flex flex-col gap-4"
      >
        <Controller
          name="title"
          control={control}
          defaultValue={""}
          rules={{ required: "Title is required!" }}
          render={({ field, formState: { errors } }) => (
            <Input
              id="title"
              name="title"
              label="Title"
              value={field.value}
              onChange={field.onChange}
              errors={errors}
            />
          )}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <Controller
            name="description"
            control={control}
            rules={{ required: "Please enter the product description!" }}
            render={({ field }) => (
              <Editor value={field.value} onChange={field.onChange} />
            )}
          />

          <span className="text-red-600 text-sm ml-2 mt-[1px]">
            {errors?.description?.message}
          </span>
        </div>

        <Controller
          name="tags"
          control={control}
          defaultValue={""}
          rules={{ required: "Add tag for your blog!" }}
          render={({ field, formState: { errors } }) => (
            <Input
              id="tags"
              name="tags"
              label="Tags"
              value={field.value}
              onChange={field.onChange}
              errors={errors}
            />
          )}
        />
        <Controller
          name="image"
          control={control}
          defaultValue={""}
          rules={{ required: "Please add image URL" }}
          render={({ field, formState: { errors } }) => (
            <Input
              id="image"
              name="image"
              label="Image URL"
              value={field.value}
              onChange={field.onChange}
              errors={errors}
            />
          )}
        />

        {/* <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center justify-center w-full">
            <label
              {...getRootProps()}
              htmlFor="image"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={`flex flex-col items-center justify-center w-full h-64 border border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-50`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG, JPEG
                </p>
              </div>
              <input
                multiple
                name="image"
                {...getInputProps()}
                id="image"
                type="file"
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>

          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="blog-image"
              className="w-full h-64 rounded-lg object-cover"
            />
          )}
        </div> */}

        <Button isLoading={isLoading} type="submit" label="Submit" />
      </form>
    </div>
  );
};

export default CreatePost;
