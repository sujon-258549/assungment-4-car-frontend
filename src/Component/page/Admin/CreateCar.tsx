/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCreateCarMutation } from "@/redux/features/auth/Admin/product";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateCar = () => {
  const { register, handleSubmit } = useForm();
  const [createCar] = useCreateCarMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating car...");

    // Mapping form data to car data format
    const carData = {
      brand: data.brand,
      model: data.model,
      image: data.image,
      year: Number(data.year),
      price: Number(data.price),
      category: data.category,
      description: data.description,
      quantity: Number(data.quantity),
    };

    console.log(carData);

    try {
      const res = await createCar(carData); // Assuming this is the correct mutation
      console.log(res);
      toast.success(res.data?.message, {
        id: toastId,
        duration: 2000,
      });
      navigate("/all-cars"); // Redirect after creation
    } catch (error) {
      toast.error("Something went wrong while creating the car.", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="px-5">
      <section
        style={{ boxShadow: "10px 10px 10px" }}
        className="my-10 p-10 text-[#333] max-w-[550px] px-4 md:px-8 rounded-md mx-auto border"
      >
        <h2 className="text-2xl pb-10 text-center font-bold md:text-4xl">
          Create Car
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 font-[sans-serif]"
        >
          <div>
            <label className="">Brand</label>
            <select
              {...register("brand", { required: true })}
              required
              className="px-4 py-3 mt-2 mb-5 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
            >
              <option value="">Select brand</option>
              <option value="Toyota">Toyota</option>
              <option value="BMW">BMW</option>
              <option value="Ford">Ford</option>
            </select>
          </div>
          <div>
            <label>Model</label>
            <input
              {...register("model", { required: true })}
              required
              type="text"
              placeholder="Enter car model"
              className="px-4 py-3 mt-2 mb-5 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
            />
          </div>
          <div>
            <label>Image</label>
            <input
              {...register("image", { required: true })}
              required
              type="text"
              placeholder="Enter car Image"
              className="px-4 py-3 mt-2 mb-5 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
            />
          </div>

          <div>
            <label>Year</label>
            <input
              {...register("year", { required: true })}
              required
              type="number"
              placeholder="Enter manufacturing year"
              className="px-4 py-3 mt-2 mb-5 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
            />
          </div>

          <div>
            <label>Price</label>
            <input
              {...register("price", { required: true })}
              required
              type="number"
              placeholder="Enter car price"
              className="px-4 py-3 mt-2 mb-5 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
            />
          </div>

          <div>
            <label>Category</label>
            <select
              {...register("category", { required: true })}
              required
              className="px-4 py-3 mt-2 mb-5 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
            >
              <option value="">Select category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Truck">Truck</option>
              <option value="Coupe">Coupe</option>
              <option value="Convertible">Convertible</option>
            </select>
          </div>

          <div>
            <label>Description</label>
            <textarea
              {...register("description", { required: true })}
              required
              placeholder="Enter car description"
              className="px-4 py-3 mt-2 mb-5 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
            />
          </div>

          <div>
            <label>Quantity</label>
            <input
              {...register("quantity", { required: true })}
              required
              type="number"
              placeholder="Enter quantity"
              className="px-4 py-3 mt-2 mb-5 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 w-full !mt-8 text-sm bg-cyan-900 hover:bg-cyan-600 text-white rounded active:bg-[#006bff]"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default CreateCar;
