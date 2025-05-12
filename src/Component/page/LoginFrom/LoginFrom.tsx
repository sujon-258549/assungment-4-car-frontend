/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/assignment4/authSlice";
import { varyFyToken } from "@/Component/Utils/decodeJwt";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  const navigate = useNavigate();
  const [login, { error }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const [isPasswordShowHide, setIsPasswordShowHide] = useState<boolean>(false);
  const { register, handleSubmit, setValue } = useForm();
  const DEMO_CREDENTIALS = {
    USER: {
      email: "user@gmail.com",
      password: "Pa$$w0rd!",
      role: "User",
    },
    ADMIN: {
      email: "sujon1@gmail.com",
      password: "Pa$$w0rd!",
      role: "Admin",
    },
  };

  const fillDemoCredentials = (credentials: {
    email: string;
    password: string;
    role: string;
  }) => {
    setValue("email", credentials.email);
    setValue("password", credentials.password);
    toast.info(
      `Demo ${credentials.role} credentials filled. Click Login to continue.`
    );
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Login.............");
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await login(userInfo).unwrap();
      const user = varyFyToken(res?.data?.token);
      dispatch(setUser({ user: user, token: res.data.token }));
      sessionStorage.setItem("justLoggedIn", "true");
      toast.success("User Login Successfully", { id: toastId, duration: 2000 });
      navigate("/");
    } catch (err) {
      // @ts-expect-error data
      toast.error(error?.data?.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="px-5">
      <section
        style={{ boxShadow: "10px 10px 10px" }}
        className="my-20 p-10 text-[#333] max-w-[500px] px-4 md:px-8 rounded-md mx-auto border"
      >
        <h2 className="text-2xl pb-10 text-center font-bold md:text-4xl">
          Login Form
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 font-[sans-serif]"
        >
          <label htmlFor="email">Email</label>
          <div className="relative flex items-center">
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter Email"
              className="px-4 py-3 mb-5 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className="relative flex items-center">
            <input
              {...register("password", { required: true })}
              type={isPasswordShowHide ? "text" : "password"}
              placeholder="Enter Password"
              className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
            />
          </div>

          <div className="flex items-center">
            <input
              onChange={() => setIsPasswordShowHide(!isPasswordShowHide)}
              type="checkbox"
              className="w-4 h-4 shrink-0"
            />
            <label className="text-sm ml-3">Show Password</label>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 w-full !mt-8 text-sm bg-[#424242] hover:bg-[#424242da] text-white rounded active:bg-[#006bff]"
          >
            Submit
          </button>
        </form>
        <div className="mt-6">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-sm text-gray-500 dark:bg-black dark:text-gray-400">
                Or try demo accounts
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(DEMO_CREDENTIALS).map(([key, value]) => (
              <Button
                key={key}
                type="button"
                variant="outline"
                onClick={() => fillDemoCredentials(value)}
                className="bg-white text-gray-700 hover:bg-gray-50 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Demo {value.role}
              </Button>
            ))}
          </div>
        </div>
        <p className="md:text-[15px] font-medium mt-5 text-center">
          Don't have an account?{" "}
          <Link
            to={"/registration"}
            className="md:text-[16px] ml-2 text-cyan-900"
          >
            Register here
          </Link>
        </p>
      </section>
    </div>
  );
};

export default LoginForm;
