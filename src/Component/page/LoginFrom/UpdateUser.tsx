/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useGetMeQuery,
  useUpdateUserMutation,
} from "@/redux/features/auth/authApi";
import { z } from "zod";
import dayjs from "dayjs";

// Ant Design Components
import {
  Form,
  Input,
  Button,
  Card,
  Select,
  DatePicker,
  Upload,
  Divider,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { updateUserSchema } from "./updateUser.validaction";
import Loader from "@/Component/Utils/Loader";

type FormValues = z.infer<typeof updateUserSchema>;

const { Option } = Select;

const UpdateUser = () => {
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();
  const [files, setFiles] = useState<File[]>([]);
  const [form] = Form.useForm();
  const { data: meData, isLoading } = useGetMeQuery("me");

  useEffect(() => {
    if (meData && !form.getFieldsValue().firstName) {
      form.setFieldsValue({
        firstName: meData.firstName,
        lastName: meData.lastName,
        phoneNumber: meData.phoneNumber,
        birthDate: meData.birthDate ? dayjs(meData.birthDate) : null,
        address: {
          street: meData.address?.street,
          street2: meData.address?.street2 || "",
          city: meData.address?.city,
          state: meData.address?.state || "",
          district: meData.address?.district,
          subdistrict: meData.address?.subdistrict || "",
          village: meData.address?.village || "",
          union: meData.address?.union || "",
          postalCode: meData.address?.postalCode,
          country: meData.address?.country || "BD",
        },
      });
    }
  }, [meData, form]);

  if (isLoading) {
    return <Loader />;
  }

  const onFinish: SubmitHandler<FormValues> = async (data) => {
    const toastId = toast.loading("Updating user information...");
    console.log(data, files[0]);

    try {
      // Validate with Zod
      const validatedData = updateUserSchema.parse({
        ...data,
        birthDate: data.birthDate
          ? dayjs(data.birthDate).format("YYYY-MM-DD")
          : null,
      });

      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          phoneNumber: validatedData.phoneNumber,
          birthDate: validatedData.birthDate,
          address: validatedData.address,
        })
      );

      if (files.length > 0) {
        formData.append("file", files[0]);
      }

      const result = await updateUser(formData);

      if ("data" in result && result.data?.success) {
        toast.success(result.data?.message, { duration: 3000, id: toastId });
        navigate("/dashboard/profile");
      } else if ("error" in result) {
        // @ts-expect-error message
        throw new Error(result.error?.message || "Update failed");
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message).join(", ");
        toast.error(`Validation error: ${errorMessages}`, {
          duration: 3000,
          id: toastId,
        });
      } else {
        toast.error(error.message || "An error occurred during update", {
          duration: 3000,
          id: toastId,
        });
      }
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleFileChange = (info: any) => {
    if (info.fileList.length > 0) {
      setFiles([info.fileList[0].originFileObj]);
    } else {
      setFiles([]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card
        style={{ boxShadow: "10px 10px 20px" }}
        className="w-full max-w-4xl text-2xl shadow-xl"
      >
        <div className="flex justify-between">
          <h2 className="text-2xl mb-10 md:text-3xl font-bold">
            Update Your Profile
          </h2>
          <h2 className="text-xl mb-10 text-sky-800 font-medium">Secure</h2>
        </div>
        <Form form={form} onFinish={onFinish} layout="vertical">
          {/* Profile Image */}
          <Form.Item
            name="profileImage"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="Profile Image"
          >
            <Upload
              name="profileImage"
              listType="picture"
              beforeUpload={() => false}
              onChange={handleFileChange}
              maxCount={1}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Divider orientation="left" className="text-lg font-semibold">
            Personal Information
          </Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                  {
                    min: 2,
                    message: "First name must be at least 2 characters",
                  },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  { required: true, message: "Please input your last name!" },
                  {
                    min: 2,
                    message: "Last name must be at least 2 characters",
                  },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="email" label="Email">
                <Input placeholder="Email" disabled value={meData?.email} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Please enter only numbers",
                  },
                  {
                    min: 11,
                    message: "Phone number must be at least 11 digits",
                  },
                ]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="birthDate" label="Birth Date">
            <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
          </Form.Item>

          <Divider orientation="left" className="text-lg font-semibold">
            Address Information
          </Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={["address", "street"]}
                label="Street"
                rules={[
                  { required: true, message: "Please input your street!" },
                ]}
              >
                <Input placeholder="Street Address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={["address", "street2"]}
                label="Street 2 (Optional)"
              >
                <Input placeholder="Additional Street Address" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={["address", "city"]}
                label="City"
                rules={[{ required: true, message: "Please input your city!" }]}
              >
                <Input placeholder="City" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={["address", "district"]}
                label="District"
                rules={[
                  { required: true, message: "Please input your district!" },
                ]}
              >
                <Input placeholder="District" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={["address", "state"]} label="State (Optional)">
                <Input placeholder="State" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={["address", "subdistrict"]}
                label="Subdistrict (Optional)"
              >
                <Input placeholder="Subdistrict" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={["address", "postalCode"]}
                label="Postal Code"
                rules={[
                  { required: true, message: "Please input your postal code!" },
                  {
                    min: 4,
                    message: "Postal code must be at least 4 characters",
                  },
                ]}
              >
                <Input placeholder="Postal Code" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={["address", "country"]}
                label="Country"
                rules={[
                  { required: true, message: "Please select your country!" },
                ]}
              >
                <Select placeholder="Select country">
                  <Option value="BD">Bangladesh</Option>
                  <Option value="US">United States</Option>
                  <Option value="UK">United Kingdom</Option>
                  {/* Add more countries as needed */}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <button
              type="submit"
              className="px-6 py-2.5 w-full !mt-8 text-sm bg-cyan-900 hover:bg-cyan-600 text-white rounded active:bg-[#006bff]"
            >
              Update Profile
            </button>
          </Form.Item>

          <div className="text-center mt-4">
            <Link to="/profile" className="text-blue-600 hover:text-blue-800">
              Back to Profile
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateUser;
