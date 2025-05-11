import Loader from "@/Component/Utils/Loader";
import { useGetSingleContactQuery } from "@/redux/features/auth/Admin/contact";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const DetailsContact = () => {
  const { _id } = useParams();
  const { data: contact, isLoading } = useGetSingleContactQuery(_id as string);

  if (isLoading) {
    return <Loader />;
  }

  if (!contact) {
    return <div className="text-center py-10">Contact not found</div>;
  }

  return (
    <div
      style={{ boxShadow: "1px 1px 10px" }}
      className="max-w-4xl mt-10 md:mt-16 mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Contact Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Full Name</h2>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {contact.name}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-500">Email Address</h2>
            <p className="mt-1 text-lg text-gray-900 break-all">
              {contact.email}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-500">Phone Number</h2>
            <p className="mt-1 text-lg text-gray-900">{contact.phone}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-medium text-gray-500">
              Physical Address
            </h2>
            <p className="mt-1 text-lg text-gray-900">{contact.address}</p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-500">Message</h2>
            <p className="mt-1 text-lg text-gray-900 whitespace-pre-line">
              {contact.message}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Created At</h2>
              <p className="mt-1 text-sm text-gray-900">
                {format(new Date(contact.createdAt), "PPpp")}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">
                Last Updated
              </h2>
              <p className="mt-1 text-sm text-gray-900">
                {format(new Date(contact.updatedAt), "PPpp")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <Button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-[#424242]"
        >
          Back to Contacts
        </Button>
      </div>
    </div>
  );
};

export default DetailsContact;
