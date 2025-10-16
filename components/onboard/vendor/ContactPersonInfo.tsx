/** @format */

import { FC } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "@/components/ui/custom/button";
import CustomSelect from "@/components/ui/custom/select";
import CustomInput from "@/components/ui/custom/custominput";
import useMutateData from "@/hooks/useMutateData";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

interface ContactPersonInfoProps {
  onContinue: () => void;
  onBack: () => void;
}

interface FormValues{
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: string;
}

const roleData = [
  { id: "1", value: "Manager" },
  { id: "2", value: "Staff" },
  { id: "3", value: "CEO" },
  { id: "4", value: "Developer" },
  { id: "5", value: "Designer" },
];

const ContactPersonInfo: FC<ContactPersonInfoProps> = ({
  onContinue,
  onBack,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>();

  const {data:session } = useSession()

    const { mutate, isLoading } = useMutateData({
      url: "/user-service/contact-person/setup-contact",
      method: "POST",
      onSuccess: (d) => {
        // console.log(d);

        onContinue();
      },
      onError: (e) => {
        console.log(e);

        toast({
          title: "Error",
          description: e.message,
          variant: "destructive",
        });
      },
    });
  const onSubmit = (data: FormValues) => {

     const payload = {
       vendor_id: session?.user?.id,
       first_name: data.firstName,
       last_name: data.lastName,
       email: data.email,
       role: data.role,
       phone_number: data.phoneNumber,
     };

  
  mutate(payload)
  
  };

  return (
    <div className="py-6 lg:py-12 container mx-auto text-kv-venue-header">
      <h1 className="text-xl md:text-3xl font-gabaritoHeading font-bold mb-8 leading-9">
        Contact Person Information
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-5 font-medium">
          <CustomInput
            label="First Name"
            type="text"
            id="firstName"
            placeholder="Enter"
            className="w-full p-3 border outline-none rounded-full"
            {...register("firstName", { required: "First name is required" })}
             error={errors.firstName?.message}
          />
      
          <CustomInput
            label="Last Name"
            type="text"
            id="lastName"
            placeholder="Enter"
            className="w-full p-3 border outline-none rounded-full"
            {...register("lastName", { required: "Last name is required" })}
            error={errors.lastName?.message}
          />

          <CustomInput
            label="Email"
            type="email"
            id="email"
            placeholder="Enter"
            className="w-full p-3 border outline-none rounded-full"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={errors.email?.message}
          />

          <div>
            <label htmlFor="role" className="block mb-2">
              Role
            </label>
            <CustomSelect
              name="role"
              control={control}
              data={roleData}
              rules={{ required: "Role is required" }}
              error={errors.role?.message}
            />
            {errors.role && (
              <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          <CustomInput
            label="Phone Number"
            type="tel"
            id="phoneNumber"
            placeholder="Enter"
            className="w-full p-3 border outline-none rounded-full"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Invalid phone number (10-15 digits)",
              },
            })}
            error={errors.phoneNumber?.message}
          />
        </div>

        <div className="mt-12 flex items-center">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 font-medium text-base leading-6"
          >
            Go Back
          </button>

          <CustomButton isLoading={isLoading} disabled={isLoading} type="submit">Continue</CustomButton>
        </div>
      </form>
    </div>
  );
};

export default ContactPersonInfo;
