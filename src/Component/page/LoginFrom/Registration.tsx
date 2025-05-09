/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegistrationMutation } from "@/redux/features/auth/authApi";
import { z } from "zod";

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
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UploadOutlined,
} from "@ant-design/icons";
import { registrationSchema } from "./registraction.validaction";

type FormValues = z.infer<typeof registrationSchema>;

const { Option } = Select;

const Registration = () => {
  const navigate = useNavigate();
  const [registration] = useRegistrationMutation();
  const [files, setFiles] = useState<File[]>([]);
  const [form] = Form.useForm();

  const onFinish: SubmitHandler<FormValues> = async (data) => {
    const toastId = toast.loading("Registering user...");

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      if (files.length > 0) {
        formData.append("file", files[0]);
      } else {
        throw new Error("Profile image is required");
      }

      const result = await registration(formData);

      if ("data" in result && result.data?.success) {
        toast.success(result.data?.message, { duration: 3000, id: toastId });
        navigate("/login");
        form.resetFields();
      } else if ("error" in result) {
        // @ts-expect-error message
        throw new Error(result.error?.message || "Registration failed");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during registration", {
        duration: 3000,
        id: toastId,
      });
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
    <div className="min-h-screen flex items-center justify-center  p-4">
      <Card
        style={{ boxShadow: "10px 10px 20px" }}
        className="w-full max-w-4xl text-2xl shadow-xl "
      >
        <div className="flex justify-between">
          <h2 className="text-2xl mb-10  md:text-3xl font-bold">
            Create Your Account
          </h2>
          <h2 className="text-xl mb-10 text-sky-800 font-medium">Secure</h2>
        </div>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            role: "user",
            isActive: true,
            address: {
              country: "BD",
            },
          }}
        >
          {/* Profile Image */}
          <Form.Item
            name="profileImage"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="Profile Image"
            rules={[
              { required: true, message: "Please upload a profile image" },
            ]}
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
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Email" />
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

          <Form.Item
            name="birthDate"
            label="Birth Date"
            rules={[
              { required: true, message: "Please select your birth date" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Divider orientation="left" className="text-lg font-semibold">
            Password
          </Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters",
                  },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Confirm Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left" className="text-lg font-semibold">
            Address Information
          </Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={["address", "street"]}
                label="Street"
                rules={[{ required: true, message: "Please input street!" }]}
              >
                <Input placeholder="Street" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["address", "street2"]} label="Street 2">
                <Input placeholder="Street 2" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={["address", "city"]}
                label="City"
                rules={[{ required: true, message: "Please input city!" }]}
              >
                <Input placeholder="City" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={["address", "district"]}
                label="District"
                rules={[{ required: true, message: "Please input district!" }]}
              >
                <Input placeholder="District" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={["address", "subdistrict"]} label="Subdistrict">
                <Input placeholder="Subdistrict" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["address", "village"]} label="Village">
                <Input placeholder="Village" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={["address", "union"]} label="Union">
                <Input placeholder="Union" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={["address", "postalCode"]}
                label="Postal Code"
                rules={[
                  { required: true, message: "Please input postal code!" },
                  {
                    min: 4,
                    message: "Postal code must be at least 4 characters",
                  },
                ]}
              >
                <Input placeholder="Postal Code" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={["address", "state"]} label="State/Division">
                <Input placeholder="State/Division" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={["address", "country"]}
                label="Country"
                rules={[{ required: true, message: "Please select country!" }]}
              >
                <Select placeholder="Select country">
                  <Option value="BD">Bangladesh</Option>
                  <Option value="IN">India</Option>
                  <Option value="US">United States</Option>
                  <Option value="UK">United Kingdom</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <button
              type="submit"
              className="px-6 py-2.5 w-full !mt-8 text-sm bg-[#424242] hover:bg-[#424242da] text-white rounded active:bg-[#006bff]"
            >
              Register
            </button>
          </Form.Item>

          <div className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-800">
              Login here
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Registration;
