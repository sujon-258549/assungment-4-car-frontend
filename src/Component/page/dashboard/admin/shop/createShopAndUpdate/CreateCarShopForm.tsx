/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUpload } from "@/components/ui/file-upload";
import { useState, useMemo } from "react";
import { CircleFadingPlus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useCreateShopMutation } from "@/redux/features/auth/Admin/shop";
import { zodResolver } from "@hookform/resolvers/zod";
import { carShopValidationSchema } from "./createShopValidaction";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const PAYMENT_METHODS = [
  "Cash",
  "Credit Card",
  "Debit Card",
  "Bank Transfer",
  "Leasing",
] as const;

const CAR_SERVICES = [
  "Sales",
  "Repairs",
  "Maintenance",
  "Parts",
  "Detailing",
] as const;

const CreateCarShopForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createShop] = useCreateShopMutation();

  const form = useForm({
    resolver: zodResolver(carShopValidationSchema),
    defaultValues: {
      shopName: "",
      shopAddress: "",
      description: "",
      phoneNumber: "",
      website: "",
      ownerName: "",
      establishedYear: new Date().getFullYear().toString(),
      carBrands: [{ value: "" }],
      servicesOffered: [],
      shopFeatures: [{ value: "" }],
      socialMediaLinks: {
        facebook: "",
        instagram: "",
        twitter: "",
        linkedin: "",
      },
      operatingHours: {
        open: "09:00",
        close: "18:00",
        daysOpen: [],
      },
      paymentMethods: [],
      customerServiceContact: "",
      serviceAreas: [{ value: "" }],
      certifications: [{ value: "" }],
      warrantyOffered: false,
      isActive: true,
      rating: 0,
    },
  });

  // Field arrays
  const {
    fields: carBrandFields,
    append: appendCarBrand,
    remove: removeCarBrand,
  } = useFieldArray({
    control: form.control,
    name: "carBrands",
  });

  const {
    fields: shopFeatureFields,
    append: appendShopFeature,
    remove: removeShopFeature,
  } = useFieldArray({
    control: form.control,
    name: "shopFeatures",
  });

  const {
    fields: serviceAreaFields,
    append: appendServiceArea,
    remove: removeServiceArea,
  } = useFieldArray({
    control: form.control,
    name: "serviceAreas",
  });

  const {
    fields: certificationFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray({
    control: form.control,
    name: "certifications",
  });

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    setIsSubmitting(true);
    const toastId = toast.loading("Creating car shop...");
    const carBrands = data.carBrands.map((item: { value: any }) =>
      typeof item === "string" ? item : item.value
    );
    const shopFeatures = data.shopFeatures.map((item: { value: any }) =>
      typeof item === "string" ? item : item.value
    );
    const certifications = data.carBrands.map((item: { value: any }) =>
      typeof item === "string" ? item : item.value
    );
    const serviceAreas = data.carBrands.map((item: { value: any }) =>
      typeof item === "string" ? item : item.value
    );

    const modifyData = {
      ...data,
      certifications,
      serviceAreas,
      shopFeatures,
      carBrands,
    };
    try {
      const formData = new FormData();

      // Append all form data
      formData.append("data", JSON.stringify(modifyData));

      // Append files
      files.forEach((file) => {
        formData.append("file", file);
      });

      const res = await createShop(formData).unwrap();

      if (res) {
        toast.success("Car shop created successfully!", { id: toastId });
        form.reset();
        setFiles([]);
      }
    } catch (error) {
      console.error("Error creating car shop:", error);
      toast.error("Failed to create car shop", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Memoize constant arrays for better performance
  const services = useMemo(() => [...CAR_SERVICES], []);
  const paymentMethods = useMemo(() => [...PAYMENT_METHODS], []);
  const daysOfWeek = useMemo(() => [...DAYS_OF_WEEK], []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-8">
        <img
          src="/logo.png"
          alt="Car Shop"
          width={80}
          height={100}
          className="rounded-lg"
          aria-hidden="true"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Register Your Car Shop
          </h1>
          <p className="text-gray-600">
            Fill in your shop details to get started
          </p>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          aria-label="Car shop registration form"
        >
          {/* Basic Information Section */}
          <section aria-labelledby="basic-info-heading">
            <h2 id="basic-info-heading" className="text-xl font-semibold">
              Basic Information
            </h2>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="shopName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shop Name*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Auto Experts"
                          aria-required="true"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ownerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Name*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John Doe"
                          aria-required="true"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="shopAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shop Address*</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="123 Main St, City, Country"
                        rows={3}
                        aria-required="true"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="+1234567890"
                          aria-required="true"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="customerServiceContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Service Contact</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="+1234567890" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://your-shop.com"
                          type="url"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="establishedYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Established Year*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="2020"
                          type="number"
                          min="1900"
                          max={new Date().getFullYear()}
                          aria-required="true"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description*</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Tell us about your car shop..."
                        rows={5}
                        aria-required="true"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          {/* Social Media Section */}
          <section aria-labelledby="social-media-heading">
            <h2 id="social-media-heading" className="text-xl font-semibold">
              Social Media
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <FormField
                control={form.control}
                name="socialMediaLinks.facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://facebook.com/yourpage"
                        value={field.value || ""}
                        type="url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialMediaLinks.instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://instagram.com/yourpage"
                        value={field.value || ""}
                        type="url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialMediaLinks.twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://twitter.com/yourpage"
                        value={field.value || ""}
                        type="url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialMediaLinks.linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://linkedin.com/company/yourcompany"
                        value={field.value || ""}
                        type="url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          {/* Operating Hours Section */}
          <section aria-labelledby="operating-hours-heading">
            <h2 id="operating-hours-heading" className="text-xl font-semibold">
              Operating Hours*
            </h2>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="operatingHours.open"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opening Time*</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} aria-required="true" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="operatingHours.close"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Closing Time*</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} aria-required="true" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormLabel>Days Open*</FormLabel>
                <div className="flex flex-wrap gap-4 mt-2">
                  {daysOfWeek.map((day) => (
                    <FormField
                      key={day}
                      control={form.control}
                      name="operatingHours.daysOpen"
                      render={({ field }) => {
                        const currentDays = field.value || [];
                        return (
                          <FormItem
                            key={day}
                            className="flex items-center gap-2"
                          >
                            <FormControl>
                              <Checkbox
                                checked={currentDays.includes(day)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...currentDays, day])
                                    : field.onChange(
                                        currentDays.filter(
                                          (value: string) => value !== day
                                        )
                                      );
                                }}
                                aria-label={`Open on ${day}`}
                              />
                            </FormControl>
                            <FormLabel className="!mt-0 cursor-pointer">
                              {day}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage>
                  {form.formState.errors.operatingHours?.daysOpen?.message}
                </FormMessage>
              </div>
            </div>
          </section>

          {/* Services & Features Section */}
          <section aria-labelledby="services-features-heading">
            <h2
              id="services-features-heading"
              className="text-xl font-semibold"
            >
              Services & Features
            </h2>
            <div className="space-y-6 mt-4">
              {/* Services Offered */}
              <div>
                <FormLabel>Services Offered*</FormLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {services.map((service) => (
                    <FormField
                      key={service}
                      control={form.control}
                      name="servicesOffered"
                      render={({ field }) => {
                        const currentValues = field.value || [];
                        return (
                          <FormItem className="flex items-center gap-2">
                            <FormControl>
                              <Checkbox
                                checked={currentValues.includes(service)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...currentValues,
                                        service,
                                      ])
                                    : field.onChange(
                                        currentValues.filter(
                                          (value: string) => value !== service
                                        )
                                      );
                                }}
                                aria-label={`Service: ${service}`}
                              />
                            </FormControl>
                            <FormLabel className="!mt-0 cursor-pointer">
                              {service}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage>
                  {form.formState.errors.servicesOffered?.message}
                </FormMessage>
              </div>

              {/* Payment Methods */}
              <div>
                <FormLabel>Payment Methods*</FormLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {paymentMethods.map((method) => (
                    <FormField
                      key={method}
                      control={form.control}
                      name="paymentMethods"
                      render={({ field }) => {
                        const currentValues = field.value || [];
                        return (
                          <FormItem className="flex items-center gap-2">
                            <FormControl>
                              <Checkbox
                                checked={currentValues.includes(method)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...currentValues, method])
                                    : field.onChange(
                                        currentValues.filter(
                                          (value: string) => value !== method
                                        )
                                      );
                                }}
                                aria-label={`Accepts ${method}`}
                              />
                            </FormControl>
                            <FormLabel className="!mt-0 cursor-pointer">
                              {method}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage>
                  {form.formState.errors.paymentMethods?.message}
                </FormMessage>
              </div>

              {/* Car Brands */}
              <div>
                <div className="flex justify-between items-center">
                  <FormLabel>Car Brands*</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendCarBrand({ value: "" })}
                    aria-label="Add car brand"
                  >
                    <CircleFadingPlus className="h-4 w-4 mr-2" />
                    Add Brand
                  </Button>
                </div>
                <div className="space-y-3 mt-2">
                  {carBrandFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`carBrands.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Brand {index + 1}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter car brand"
                                aria-required={index === 0}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {carBrandFields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCarBrand(index)}
                          className="text-red-500"
                          aria-label={`Remove brand ${index + 1}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Shop Features */}
              <div>
                <div className="flex justify-between items-center">
                  <FormLabel>Shop Features*</FormLabel>
                  <Button
                    type="button"
                    onClick={() => appendShopFeature({ value: "" })}
                    variant="outline"
                    size="sm"
                    aria-label="Add shop feature"
                  >
                    <CircleFadingPlus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </div>
                <div className="space-y-3 mt-2">
                  {shopFeatureFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`shopFeatures.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Feature {index + 1}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter shop feature"
                                aria-required={index === 0}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {shopFeatureFields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeShopFeature(index)}
                          className="text-red-500"
                          aria-label={`Remove feature ${index + 1}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Areas */}
              <div>
                <div className="flex justify-between items-center">
                  <FormLabel>Service Areas</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendServiceArea({ value: "" })}
                    aria-label="Add service area"
                  >
                    <CircleFadingPlus className="h-4 w-4 mr-2" />
                    Add Area
                  </Button>
                </div>
                <div className="space-y-3 mt-2">
                  {serviceAreaFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`serviceAreas.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Area {index + 1}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter service area"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {serviceAreaFields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeServiceArea(index)}
                          className="text-red-500"
                          aria-label={`Remove area ${index + 1}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <div className="flex justify-between items-center">
                  <FormLabel>Certifications</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendCertification({ value: "" })}
                    aria-label="Add certification"
                  >
                    <CircleFadingPlus className="h-4 w-4 mr-2" />
                    Add Certification
                  </Button>
                </div>
                <div className="space-y-3 mt-2">
                  {certificationFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`certifications.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Certification {index + 1}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter certification"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {certificationFields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCertification(index)}
                          className="text-red-500"
                          aria-label={`Remove certification ${index + 1}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Warranty Offered */}
              <FormField
                control={form.control}
                name="warrantyOffered"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-label="Warranty offered"
                      />
                    </FormControl>
                    <FormLabel className="!mt-0 cursor-pointer">
                      Do you offer warranties for your services/vehicles?
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </section>

          {/* Shop Logo Upload */}
          <section aria-labelledby="shop-logo-heading">
            <h2 id="shop-logo-heading" className="text-xl font-semibold">
              Shop Logo
            </h2>
            <div className="space-y-4 mt-4">
              <FileUpload onChange={handleFileUpload} />
              <p className="text-sm text-gray-500">
                Upload your shop logo (Recommended size: 300x300px, Max: 5MB)
              </p>
            </div>
          </section>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              type="submit"
              className="w-full bg-cyan-600"
              size="lg"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? "Creating Shop..." : "Create Car Shop"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCarShopForm;
