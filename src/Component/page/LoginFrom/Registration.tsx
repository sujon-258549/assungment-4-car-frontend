/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRegistrationMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Registration = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormValues>();
  const [registration] = useRegistrationMutation();
  const [isPasswordShowHide, setIsPasswordShowHide] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { password, confirmPassword, email, name } = data;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please try again!");
      return;
    }

    const toastId = toast.loading("Creating user...");

    try {
      await registration({ name, email, password }).unwrap();
      toast.success("User registered successfully!", { id: toastId });
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong. Please try again.", { id: toastId });
    }
  };

  return (
    <div className="px-5">
      <section
        style={{ boxShadow: "10px 10px 10px" }}
        className="my-20 p-10 text-[#333] max-w-[500px] px-4 md:px-8 rounded-md mx-auto border"
      >
        <h2 className="text-2xl pb-10 text-center font-bold md:text-4xl">
          Registration Form
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {/* Full Name */}
          <label>Full Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Enter your full name"
            className="px-4 py-3 mb-20 w-full bg-[#f0f1f2] focus:bg-transparent text-sm border outline-[#007bff] rounded transition-all"
          />

          {/* Email */}
          <div className="mb-3">
            <div className="mt-2">
              <label>Email</label>
            </div>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 mt-2 mb-1 w-full bg-[#f0f1f2] focus:bg-transparent text-sm border outline-[#007bff] rounded transition-all"
            />
          </div>

          {/* Password */}
          <div className="">
            <label>Password</label>
            <input
              {...register("password", { required: true })}
              type={isPasswordShowHide ? "text" : "password"}
              placeholder="Enter Password"
              className="px-4 py-3 mt-2 mb-3 w-full bg-[#f0f1f2] focus:bg-transparent text-sm border outline-[#007bff] rounded transition-all"
            />
          </div>

          {/* Confirm Password */}
          <label>Confirm Password</label>
          <input
            {...register("confirmPassword", { required: true })}
            type={isPasswordShowHide ? "text" : "password"}
            placeholder="Confirm Password"
            className="px-4 py-3 mb-5 w-full bg-[#f0f1f2] focus:bg-transparent text-sm border outline-[#007bff] rounded transition-all"
          />

          {/* Show Password Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              onChange={() => setIsPasswordShowHide(!isPasswordShowHide)}
              className="w-4 h-4"
            />
            <label className="text-sm ml-3">Show Password</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-2.5 w-full mt-8 text-sm bg-cyan-900 hover:bg-cyan-600 text-white rounded"
          >
            Submit
          </button>
        </form>

        <p className="text-[15px] font-medium mt-5 text-center">
          Already have an account?
          <Link to="/login" className="text-[16px] ml-2 text-cyan-900">
            Login here
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Registration;
