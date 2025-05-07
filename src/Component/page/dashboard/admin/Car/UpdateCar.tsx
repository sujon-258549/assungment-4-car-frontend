/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useGetSingleCarQuery,
  useUpdateCarDataMutation,
} from "@/redux/features/auth/Admin/product";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const UpdateCar = () => {
  const { register, handleSubmit } = useForm();
  const [updateCarData] = useUpdateCarDataMutation();
  const navigate = useNavigate();
  const { _id } = useParams();
  const {
    data: singledata,
    isLoading,
    error,
  } = useGetSingleCarQuery(_id as string);

  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load car details.
      </p>
    );
  }

  if (!singledata) {
    return <p className="text-center py-10">No car details available.</p>;
  }

  const { brand, model, price, description, image, quantity, inStock } =
    singledata;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating car...");

    const carData = {
      brand: data.brand,
      model: data.model,
      image: data.image,
      year: Number(data.year),
      price: Number(data.price),
      category: data.category,
      description: data.description,
      quantity: Number(data.quantity),
      inStock: data.inStock === "true", // Convert string to boolean
    };

    const updateData = {
      id: _id,
      carData: carData,
    };
    try {
      const res = await updateCarData(updateData);
      console.log(res);
      toast.success(res.data.message, {
        id: toastId,
        duration: 2000,
      });
      navigate("/dashboard/all-car"); // Optionally navigate after update
    } catch (error) {
      toast.error("Something went wrong while updating the car.", {
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
          Update Car
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 font-[sans-serif]"
        >
          <div>
            <label>Brand</label>
            <select
              {...register("brand", { required: true })}
              required
              defaultValue={brand}
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
              defaultValue={model}
              className="px-4 py-3 mt-2 mb-5 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
            />
          </div>

          <div>
            <label>Image</label>
            <input
              {...register("image", { required: true })}
              required
              type="text"
              placeholder="Enter car Image URL"
              defaultValue={image}
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
              defaultValue={singledata.year}
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
              defaultValue={price}
              className="px-4 py-3 mt-2 mb-5 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
            />
          </div>

          <div>
            <label>Category</label>
            <select
              {...register("category", { required: true })}
              required
              defaultValue={singledata.category}
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
              defaultValue={description}
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
              defaultValue={quantity}
              className="px-4 py-3 mt-2 mb-5 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
            />
          </div>

          <div>
            <label>In Stock</label>
            <select
              {...register("inStock", { required: true })}
              required
              defaultValue={inStock ? "true" : "false"} // Set default value from inStock
              className="px-4 py-3 mt-2 mb-5 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
            >
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>
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

export default UpdateCar;
