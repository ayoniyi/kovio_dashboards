import { FC } from 'react';
import CustomButton from "@/components/ui/custom/button";
import CustomSelect from '@/components/ui/custom/select';
import CustomInput from '@/components/ui/custom/custominput';
import { useForm } from "react-hook-form";

interface VenueDetailsProps {
   onContinue: (data: FormValues) => void;
  onBack: () => void;
}

interface FormValues {
  pricingPackage: string;
  role: string;
  availability: string;
  serviceOffered: string;
  customization:string;
}
const serviceOffered = [
  { id: "1", value: "Buffet" },
  { id: "2", value: "Plated Service" },
  { id: "3", value: "Small Chops" },
  { id: "4", value: "Others" },
]

const availability = [
  { id: "1", value: "Weekends Only" },
  { id: "2", value: "Open All Week" },
]

const pricingPackege = [
  { id: "1", value: "Starting Price" },
  { id: "2", value: "Range" }
]

const customization = [
  { id: "1", value: "Yes" },
  { id: "2", value: "No" },
]
const VenueDetails: FC<VenueDetailsProps> = ({ onContinue, onBack }) => {
  
  const {
      register,
      handleSubmit,
      formState: { errors },
      control,
    } = useForm<FormValues>();
  
    const onSubmit = (data: FormValues) => {
      onContinue(data);
    };
  
  return (
    <div className="py-6 lg:py-12 container mx-auto text-kv-venue-header">
      <h1 className="text-xl md:text-3xl font-bold leading-9 mb-8">Service Details</h1>
      
   <form onSubmit={handleSubmit(onSubmit)}> 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-normal leading-5 tracking-extra-wide">
        <div>
          <label htmlFor="ServiceOffered" className="block mb-2">
            Services Offered
          </label>
          <CustomSelect 
            data={serviceOffered}
            control={control}
            name='Services Offered'
            rules={{required: "Services Offered is required"}}
           error={errors.serviceOffered?.message}
             />
        </div>

          <CustomInput
            label='Coverage Area'
            type="text"
            id="address"
            placeholder="Enter"
            className="w-full p-3 border outline-none  rounded-full"
          />

        <div>
            <label htmlFor="city" className="block mb-2 text-sm font-medium">
           Availability
          </label>
         <CustomSelect
          name="Availability"
          control={control}
          data={availability}
          rules={{ required: "Availability is required" }}
          error={errors.availability?.message}
            />
            {errors.availability && (
              <p className="mt-1 text-sm text-red-500">{errors.availability.message}</p>
            )}
        </div>
        
          <CustomInput 
           label='Payment & Booking Policy'
           type='text'
           id="payment"
           placeholder='Payment & Booking Policy'
           className="w-full p-3 border outline-none rounded-full"
          />
        
        
        <div>
          <label htmlFor="city" className="block mb-2">
           Pricing Packages
          </label>
           <CustomSelect 
            name='pricing package'
            control={control}
            data={pricingPackege}
            rules={{require: "Package is required"}}
            error={errors.pricingPackage?.message}/>
            {errors.pricingPackage && (
              <p className="mt-1 text-sm text-red-500">{errors.pricingPackage.message}</p>
            )}
        </div>
        
        <div>
          <CustomInput
            label='Amount'
            type="text"
            id="address"
            placeholder="Enter"
            className="w-full p-3 border outline-none  rounded-full"
          />
        </div>
      
      <div>
          <label htmlFor="city" className="block mb-2">
          Customization Option (Do they take special request?)
          </label>
          <CustomSelect 
            name="Customization Option"
            control={control}
            data={customization}
            rules={{require: "Customization is required"}}
            error={errors.customization?.message}/>
            {errors.customization && (
              <p className="mt-1 text-sm text-red-500">{errors.customization.message}</p>
            )}
        </div>
         
    </div>

      <div className="mt-12 flex">
        <button
          onClick={onBack}
          className="px-6 py-3 font-medium text-base leading-6"
        >
          Go Back
        </button>
        
        <CustomButton children={"Continue"} type="submit"/>
      </div>
     </form>
    </div>
  );
};

export default VenueDetails;
     