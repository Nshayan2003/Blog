import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../components";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import useToggle from "../hooks/useToggle";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { handleApiError } from "../utils/handleApiError";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosPublic } from "../http";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const passwordToggle = useToggle(false);
  const { setAuth, auth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control, setValue } = useForm();

  useEffect(() => {
    if (auth.accessToken) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [auth, navigate]);

 

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await axiosPublic.post("/auth/login", values);
      const accessToken = data?.access_token;
      const user = data?.user;
      console.log(data);
      setAuth({ accessToken, user});
      toast.success("User logged in successfully");
      navigate("/");
      setValue("email", "");
      setValue("password", "");
    } catch (error) {
      let message;

      if (error instanceof AxiosError) {
        message = handleApiError(error);
      } else {
        message = "An unexpected error occurred.";
      }

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-40 px-4">
      <div className="max-w-xl w-full mx-auto p-4 shadow bg-white border rounded-lg">
        <h3 className="text-2xl font-semibold tracking-wider mb-6 text-center">
          Sign In
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <Controller
            name="email"
            control={control}
            defaultValue={""}
            rules={{ required: "Email is required!" }}
            render={({ field, formState: { errors } }) => (
              <Input
                id="email"
                name="email"
                label="Your Email Address"
                type="email"
                value={field.value}
                onChange={field.onChange}
                errors={errors}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue={""}
            rules={{ required: "Password is required!" }}
            render={({ field, formState: { errors } }) => (
              <Input
                id="password"
                name="password"
                label="Your Password"
                value={field.value}
                onChange={field.onChange}
                errors={errors}
                type={passwordToggle.toggle ? "text" : "password"}
                isIcon={true}
                icon={
                  passwordToggle.toggle
                    ? MdOutlineRemoveRedEye
                    : AiOutlineEyeInvisible
                }
                onClick={passwordToggle.onToggle}
              />
            )}
          />
          <Button isLoading={isLoading} label="Sign In" type="submit" />

          <div className="text-sm text-center font-medium text-gray-600">
            Not registered?{" "}
            <Link
              to="/sign-up"
              className="text-blue-700 text-center hover:underline"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
