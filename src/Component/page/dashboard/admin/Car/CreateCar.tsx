/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileUpload } from "@/components/ui/file-upload";
import { useCreateCarMutation } from "@/redux/features/auth/Admin/product";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateCar = () => {
  const [files, setFiles] = useState<File[]>([]);
  console.log(files);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const [createCar] = useCreateCarMutation();
  const navigate = useNavigate();
  const handleFileUpload = (uploadedFiles: File[]) => {
    if (files.length < 3) {
      setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    }
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating car...", { duration: 2000 });

    // Mapping form data to car data format
    const carData = {
      // Basic Identification
      brand: data.brand,
      offerDateAndTime: data.offerDateAndTime,
      model: data.model,
      trim: data.trim,
      generation: data.generation,

      // Visuals
      color: data.color.split(",").map((c: string) => c.trim()), // Convert comma-separated string to array

      // Specifications
      year: Number(data.year),
      mileage: data.mileage ? Number(data.mileage) : undefined,
      bodyType: data.bodyType,
      seatingCapacity: Number(data.seatingCapacity),
      doors: Number(data.doors),
      drivetrain: data.drivetrain,
      transmission: data.transmission,
      fuelType: data.fuelType,
      engine: data.engineSize
        ? {
            size: data.engineSize,
            cylinders: Number(data.cylinders),
            horsepower: Number(data.horsepower),
            torque: Number(data.torque),
            fuelEconomy: data.fuelEconomyCity
              ? {
                  city: Number(data.fuelEconomyCity),
                  highway: Number(data.fuelEconomyHighway),
                  combined: Number(data.fuelEconomyCombined),
                }
              : undefined,
          }
        : undefined,
      batteryCapacity: data.batteryCapacity
        ? Number(data.batteryCapacity)
        : undefined,
      range: data.range ? Number(data.range) : undefined,

      // Features
      features: {
        interior: data.interiorFeatures
          ? data.interiorFeatures.split(",").map((f: string) => f.trim())
          : undefined,
        exterior: data.exteriorFeatures
          ? data.exteriorFeatures.split(",").map((f: string) => f.trim())
          : undefined,
        safety: data.safetyFeatures
          ? data.safetyFeatures.split(",").map((f: string) => f.trim())
          : undefined,
        infotainment: data.infotainmentFeatures
          ? data.infotainmentFeatures.split(",").map((f: string) => f.trim())
          : undefined,
      },

      // Pricing
      price: Number(0),
      originalPrice: data.originalPrice
        ? Number(data.originalPrice)
        : undefined,
      currency: data.currency || "USD",
      leaseOptions: data.leaseMonthlyPayment
        ? {
            monthlyPayment: Number(data.leaseMonthlyPayment),
            term: Number(data.leaseTerm),
            downPayment: Number(data.leaseDownPayment),
          }
        : undefined,

      // Inventory
      quantity: Number(data.quantity),
      inStock: data.inStock === true,
      isOffer: false,
      stockNumber: data.stockNumber,
      vin: data.vin,
      condition: data.condition,

      // Additional Info
      description: data.description,
      rating: data.rating ? Number(data.rating) : undefined,
      warranty: data.warrantyType
        ? {
            type: data.warrantyType,
            months: Number(data.warrantyMonths),
            miles: Number(data.warrantyMiles),
          }
        : undefined,
    };

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(carData));
      files.forEach((file) => {
        formData.append("images", file); // 'images' should match server-side field name
      });

      console.log("fileData", carData, files, formData);
      const result = await createCar(formData);
      if (result?.data?.success) {
        toast.success(
          result.data?.message || "Blog post created successfully",
          {
            id: toastId,
          }
        );
        navigate("/dashboard/all-car");
      } else {
        toast.error(result?.data?.message || "Failed to create blog post", {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred");
      console.error(error);
    }
  };

  return (
    <div className="px-5">
      <section
        style={{ boxShadow: "10px 10px 10px" }}
        className="my-10 p-10 text-[#333] max-w-[800px] px-4 md:px-8 rounded-md mx-auto border"
      >
        <h2 className="text-2xl pb-10 text-center font-bold md:text-4xl">
          Create Car
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="space-y-2 font-[sans-serif] grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Identification */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-2 border-b pb-1">
                Basic Identification
              </h3>
            </div>
            <div>
              <label>Brand*</label>
              <select
                {...register("brand", { required: true })}
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              >
                <option value="">Select brand</option>
                <option value="Toyota">Toyota</option>
                <option value="BMW">BMW</option>
                <option value="Ford">Ford</option>
                <option value="Honda">Honda</option>
                <option value="Mercedes">Mercedes</option>
                <option value="Audi">Audi</option>
                <option value="Tesla">Tesla</option>
              </select>
              {errors.brand && (
                <span className="text-red-500 text-xs">Brand is required</span>
              )}
            </div>
            <div>
              <label>Model*</label>
              <input
                {...register("model", { required: true })}
                type="text"
                placeholder="Enter car model"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
              {errors.model && (
                <span className="text-red-500 text-xs">Model is required</span>
              )}
            </div>
            <div>
              <label>Trim</label>
              <input
                {...register("trim")}
                type="text"
                placeholder="Enter trim level"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>
            <div>
              <label>Generation</label>
              <input
                {...register("generation")}
                type="text"
                placeholder="Enter generation"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label>Colors* (comma separated)</label>
              <input
                {...register("color", { required: true })}
                type="text"
                placeholder="Enter colors separated by commas"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
              {errors.color && (
                <span className="text-red-500 text-xs">
                  At least one color is required
                </span>
              )}
            </div>

            {/* Specifications */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-2 border-b pb-1">
                Specifications
              </h3>
            </div>
            <div>
              <label>Year*</label>
              <input
                {...register("year", { required: true })}
                type="number"
                min="1900"
                max={new Date().getFullYear() + 1}
                placeholder="Enter manufacturing year"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
              {errors.year && (
                <span className="text-red-500 text-xs">Year is required</span>
              )}
            </div>
            <div>
              <label>Mileage</label>
              <input
                {...register("mileage")}
                type="number"
                min="0"
                placeholder="Enter mileage"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>
            <div>
              <label>Body Type*</label>
              <select
                {...register("bodyType", { required: true })}
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              >
                <option value="">Select body type</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Truck">Truck</option>
                <option value="Coupe">Coupe</option>
                <option value="Convertible">Convertible</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Minivan">Minivan</option>
                <option value="Wagon">Wagon</option>
              </select>
              {errors.bodyType && (
                <span className="text-red-500 text-xs">
                  Body type is required
                </span>
              )}
            </div>
            <div>
              <label>Seating Capacity*</label>
              <input
                {...register("seatingCapacity", { required: true })}
                type="number"
                min="1"
                max="20"
                placeholder="Enter seating capacity"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
              {errors.seatingCapacity && (
                <span className="text-red-500 text-xs">
                  Seating capacity is required
                </span>
              )}
            </div>
            <div>
              <label>Doors*</label>
              <input
                {...register("doors", { required: true })}
                type="number"
                min="1"
                max="6"
                placeholder="Enter number of doors"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
              {errors.doors && (
                <span className="text-red-500 text-xs">
                  Number of doors is required
                </span>
              )}
            </div>
            <div>
              <label>Drivetrain*</label>
              <select
                {...register("drivetrain", { required: true })}
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              >
                <option value="">Select drivetrain</option>
                <option value="FWD">Front-Wheel Drive (FWD)</option>
                <option value="RWD">Rear-Wheel Drive (RWD)</option>
                <option value="AWD">All-Wheel Drive (AWD)</option>
                <option value="4WD">Four-Wheel Drive (4WD)</option>
              </select>
              {errors.drivetrain && (
                <span className="text-red-500 text-xs">
                  Drivetrain is required
                </span>
              )}
            </div>
            <div>
              <label>Transmission*</label>
              <select
                {...register("transmission", { required: true })}
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              >
                <option value="">Select transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="CVT">CVT</option>
                <option value="DCT">Dual-Clutch (DCT)</option>
              </select>
              {errors.transmission && (
                <span className="text-red-500 text-xs">
                  Transmission is required
                </span>
              )}
            </div>
            <div>
              <label>Fuel Type*</label>
              <select
                {...register("fuelType", { required: true })}
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              >
                <option value="">Select fuel type</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {errors.fuelType && (
                <span className="text-red-500 text-xs">
                  Fuel type is required
                </span>
              )}
            </div>

            {/* Engine Details */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-2 border-b pb-1">
                Engine Details
              </h3>
            </div>
            <div>
              <label>Engine Size (e.g., 2.0L)</label>
              <input
                {...register("engineSize")}
                type="text"
                placeholder="Enter engine size"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>
            <div>
              <label>Cylinders</label>
              <input
                {...register("cylinders")}
                type="number"
                min="0"
                max="16"
                placeholder="Enter number of cylinders"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>
            <div>
              <label>Horsepower</label>
              <input
                {...register("horsepower")}
                type="number"
                min="0"
                placeholder="Enter horsepower"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>
            <div>
              <label>Torque (lb-ft)</label>
              <input
                {...register("torque")}
                type="number"
                min="0"
                placeholder="Enter torque"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>
            <div>
              <label>Fuel Economy (City MPG)</label>
              <input
                {...register("fuelEconomyCity")}
                type="number"
                min="0"
                placeholder="Enter city MPG"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>
            <div>
              <label>Fuel Economy (Highway MPG)</label>
              <input
                {...register("fuelEconomyHighway")}
                type="number"
                min="0"
                placeholder="Enter highway MPG"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>
            <div>
              <label>Fuel Economy (Combined MPG)</label>
              <input
                {...register("fuelEconomyCombined")}
                type="number"
                min="0"
                placeholder="Enter combined MPG"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>

            {/* Electric Vehicle Details */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-2 border-b pb-1">
                Electric Vehicle Details
              </h3>
            </div>
            <div>
              <label>Battery Capacity (kWh)</label>
              <input
                {...register("batteryCapacity")}
                type="number"
                min="0"
                step="0.1"
                placeholder="Enter battery capacity"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>
            <div>
              <label>Range (miles)</label>
              <input
                {...register("range")}
                type="number"
                min="0"
                placeholder="Enter range"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>

            {/* Features */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-2 border-b pb-1">
                Features
              </h3>
            </div>
            <div>
              <label>Interior Features (comma separated)</label>
              <textarea
                {...register("interiorFeatures")}
                placeholder="Enter interior features"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>
            <div>
              <label>Exterior Features (comma separated)</label>
              <textarea
                {...register("exteriorFeatures")}
                placeholder="Enter exterior features"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>
            <div>
              <label>Safety Features (comma separated)</label>
              <textarea
                {...register("safetyFeatures")}
                placeholder="Enter safety features"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>
            <div>
              <label>Infotainment Features (comma separated)</label>
              <textarea
                {...register("infotainmentFeatures")}
                placeholder="Enter infotainment features"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>

            {/* Pricing */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-2 border-b pb-1">
                Pricing
              </h3>
            </div>

            <div>
              <label>Original Price</label>
              <input
                {...register("originalPrice")}
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter original price"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>
            <div>
              <label>Currency</label>
              <select
                {...register("currency")}
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>

            {/* Lease Options */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-2 border-b pb-1">
                Lease Options
              </h3>
            </div>
            <div>
              <label>Monthly Payment</label>
              <input
                {...register("leaseMonthlyPayment")}
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter monthly payment"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>
            <div>
              <label>Lease Term (months)</label>
              <input
                {...register("leaseTerm")}
                type="number"
                min="0"
                placeholder="Enter lease term"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>
            <div>
              <label>Down Payment</label>
              <input
                {...register("leaseDownPayment")}
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter down payment"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>

            {/* Inventory */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-2 border-b pb-1">
                Inventory
              </h3>
            </div>
            <div>
              <label>Quantity*</label>
              <input
                {...register("quantity", { required: true })}
                type="number"
                min="0"
                placeholder="Enter quantity"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
              {errors.quantity && (
                <span className="text-red-500 text-xs">
                  Quantity is required
                </span>
              )}
            </div>
            <div>
              <label>In Stock*</label>
              <select
                {...register("inStock", { required: true })}
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              {errors.inStock && (
                <span className="text-red-500 text-xs">
                  In stock status is required
                </span>
              )}
            </div>

            <div>
              <label>Stock Number</label>
              <input
                {...register("stockNumber")}
                type="text"
                placeholder="Enter stock number"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>
            <div>
              <label>VIN</label>
              <input
                {...register("vin")}
                type="text"
                placeholder="Enter VIN"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>
            <div>
              <label>Condition*</label>
              <select
                {...register("condition", { required: true })}
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              >
                <option value="">Select condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Certified Pre-Owned">Certified Pre-Owned</option>
              </select>
              {errors.condition && (
                <span className="text-red-500 text-xs">
                  Condition is required
                </span>
              )}
            </div>

            {/* Additional Info */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-2 border-b pb-1">
                Additional Info
              </h3>
            </div>
            <div className="md:col-span-2">
              <label>Description*</label>
              <textarea
                {...register("description", { required: true })}
                placeholder="Enter car description"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
                rows={4}
              />
              {errors.description && (
                <span className="text-red-500 text-xs">
                  Description is required
                </span>
              )}
            </div>
            <div>
              <label>Rating (0-5)</label>
              <input
                {...register("rating")}
                type="number"
                min="0"
                max="5"
                step="0.1"
                placeholder="Enter rating"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>

            {/* Warranty */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-2 border-b pb-1">
                Warranty
              </h3>
            </div>
            <div>
              <label>Warranty Type</label>
              <input
                {...register("warrantyType")}
                type="text"
                placeholder="Enter warranty type"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>
            <div>
              <label>Warranty Months</label>
              <input
                {...register("warrantyMonths")}
                type="number"
                min="0"
                placeholder="Enter warranty months"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>
            <div>
              <label>Warranty Miles</label>
              <input
                {...register("warrantyMiles")}
                type="number"
                min="0"
                placeholder="Enter warranty miles"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>
            <div>
              <label>Offered Time</label>
              <input
                {...register("offerDateAndTime")}
                type="date"
                min="0"
                placeholder="Enter offer date and time"
                className="px-4 py-3 mt-2 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              />
            </div>
          </div>
          <div className="w-full my-5 max-w-4xl mx-auto min-h-10 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload onChange={handleFileUpload} />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 md:col-span-2 w-full !mt-8 text-sm bg-[#424242] hover:bg-[#424242da] text-white rounded active:bg-[#006bff]"
          >
            Create Car
          </button>
        </form>
      </section>
    </div>
  );
};

export default CreateCar;
