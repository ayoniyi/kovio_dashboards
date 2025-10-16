import React from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import CustomSelect from '@/components/ui/custom/select'
import CustomButton from '@/components/ui/custom/button'
import CustomInput from '@/components/ui/custom/custominput'
import { FC } from "react"
import { get } from "@/utilities/apiclient";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";


interface AddAdminProps {
  onContinue: () => void;
  onBack: () => void;
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const roleData = [
        { id: '1', value: "Super Admin" },
        { id: '2', value: "Adminf" },
       
    ]

const AddAdmin: FC<AddAdminProps> =({onContinue,onBack}) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await get<{ success: boolean }>(
        "/endpoint will be here sha",
        data
      );
console.log(res);

  
        onContinue();
      
    } catch (error: any) {

      console.log(error);
      
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className='py-6 px-3 lg:px-6'>
         <h1 className="text-2xl text-kv-venue-header font-semibold mb-6 tracking-extra-wide">Booking details</h1>
      
      <div className="mb-6">
        <Link href="/vendor/settings/add-admin" className="flex items-center text-gray-500 hover:text-gray-700">
          <ChevronLeft size={20} className="mr-1" />
          <span className="text-sm font-medium">Go back</span>
        </Link>
      </div>




    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-5 font-medium">

        <CustomInput
         label="First Name"
         type="text"
         id="firstName"
         className="rounded-full"
         placeholder="Enter"
         error={errors.firstName?.message}
         {...register("firstName", { required: "First name is required" })}
                  />

        <CustomInput
            label="Last Name"
            type="text"
            id="lastName"
            className="rounded-full"
            placeholder="Enter"
            error={errors.lastName?.message}
            {...register("lastName", { required: "Last name is required" })}
          />

          <CustomInput
            label="Email"
            type="email"
            id="email"
            className="rounded-full"
            placeholder="Enter"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
        
        <div>
           <label htmlFor="role" className="block mb-2 text-sm font-medium">
              Role
            </label>
             <CustomSelect
              data={roleData}
              control={control}
              name="role"
              rules={{ required: "Role is required" }}
              error={errors.role?.message}
            /> 
        </div>
    </div>
    </form>

    <div className="flex justify-center lg:justify-end border-t py-6 gap-4">
                <CustomButton className="bg-[#F9FAFB] text-kv-venue-header border border-[#D1D5DB] hover:bg-[#D1D5DB]" children='Cancel' />
                <CustomButton children='Add Amin' />
    
            </div>
    </div>
  )
}
