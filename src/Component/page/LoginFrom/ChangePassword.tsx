/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useChangePasswordMutation } from "@/redux/features/auth/Admin/product";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/redux/features/assignment4/authSlice";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [changePassword, { error }] = useChangePasswordMutation();
  const [isPasswordShowHide, setIsPasswordShowHide] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { oldPassword, confirmChangePassword, newPassword } = data;

    if (confirmChangePassword !== newPassword) {
      toast.error("Passwords do not match. Please try again!");
      return;
    }
    const passwordData = { oldPassword: oldPassword, newPassword: newPassword };
    console.log(passwordData);

    const toastId = toast.loading("Changing password...");
    try {
      const res = await changePassword(passwordData);
      console.log(res);
      toast.dismiss(toastId);
      toast.success("Password changed successfully!");
      dispatch(logOut());
      navigate("/login");
    } catch (err) {
      toast.dismiss(toastId);
      //  @ts-expect-error data
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="px-5">
      <section
        style={{ boxShadow: "10px 10px 10px" }}
        className=" my-6 md:my-20 p-10 text-[#333] max-w-[500px] px-4 md:px-8 rounded-md mx-auto border"
      >
        <h2 className="text-2xl pb-10 text-center font-bold md:text-4xl">
          Change Password
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 font-[sans-serif]"
        >
          <label htmlFor="oldPassword">Old Password</label>
          <input
            {...register("oldPassword", { required: true })}
            type={isPasswordShowHide ? "text" : "password"}
            placeholder="Enter old password"
            className="px-4 mb-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
          />

          <div className="pt-3">
            <label htmlFor="newPassword">New Password</label>
            <input
              {...register("newPassword", { required: true, minLength: 6 })}
              type={isPasswordShowHide ? "text" : "password"}
              placeholder="Enter new password (min 6 chars)"
              className="px-4 py-3 mb-4 mt-1.5 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
            />
          </div>
          <label htmlFor="confirmChangePassword">Confirm New Password</label>
          <input
            {...register("confirmChangePassword", { required: true })}
            type={isPasswordShowHide ? "text" : "password"}
            placeholder="Confirm new password"
            className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
          />

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

        <p className="md:text-[15px] font-medium mt-5 text-center">
          Don't have an account?{" "}
          <Link
            to="/registration"
            className="md:text-[16px] ml-2 text-cyan-900"
          >
            Register here
          </Link>
        </p>
      </section>
    </div>
  );
};

export default ChangePassword;
