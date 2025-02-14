/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/assignment4/authSlice";
import { varyFyToken } from "@/Component/Utils/decodeJwt";
import { toast } from "sonner";

const LoginForm = () => {
  const navigate = useNavigate();
  const [login, { error }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const [isPasswordShowHide, setIsPasswordShowHide] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating.............");
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await login(userInfo).unwrap();
      const user = varyFyToken(res?.data?.token);
      dispatch(setUser({ user: user, token: res.data.token }));
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
        className="my-20 p-10 text-[#333] max-w-[450px] px-4 md:px-8 rounded-md mx-auto border"
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
            className="px-6 py-2.5 w-full !mt-8 text-sm bg-cyan-900 hover:bg-cyan-600 text-white rounded active:bg-[#006bff]"
          >
            Submit
          </button>
        </form>

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
