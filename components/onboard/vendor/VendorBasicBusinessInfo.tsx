/** @format */

import { FC, useState, useEffect } from "react";
import CustomButton from "../../ui/custom/button";
import Image, { StaticImageData } from "next/image";
import instagram from "@/public/newimages/instagram.png";
import facebook from "@/public/newimages/facebook.png";
import tiktok from "@/public/newimages/tiktok.png";
import twitter from "@/public/newimages/twitter.png";
import snapchat from "@/public/newimages/snapchat.png";
import CustomSelect from "../../ui/custom/select";
import Link from "next/link";
import CustomInput from "@/components/ui/custom/custominput";
import { useForm, useWatch } from "react-hook-form";
import useMutateData from "@/hooks/useMutateData";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

// Types and Interfaces
interface SelectOption {
  id: number;
  value: string;
}

interface SocialMediaLinks {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  twitter?: string;
  snapchat?: string;
}

interface FormValues {
  businessName: string;
  vendorType: string;
  businessRegistrationNumber: string;
  businessEmail: string;
  businessPhone: string;
  website?: string;
  businessStreet: string;
  city: string;
  state?: string;
  country: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  twitter?: string;
  snapchat?: string;
}

interface SocialMediaField {
  id: keyof SocialMediaLinks;
  icon: StaticImageData;
  label: string;
  alt: string;
}

interface CountryConfig {
  label: string | null;
  required: boolean;
  data: SelectOption[];
}

interface VendorBasicBusinessInfoProps {
  onContinue: () => void;
  onBack: () => void;
}

// Static Data
const vendorTypeData: SelectOption[] = [
  { id: 1, value: "Catering" },
  { id: 2, value: "Decor" },
  { id: 3, value: "DJ" },
  { id: 4, value: "Photography" },
  { id: 5, value: "MC" },
  { id: 6, value: "Rentals" },
  { id: 7, value: "Others" },
];

const countryData: SelectOption[] = [
  { id: 1, value: "United Kingdom" },
  { id: 2, value: "United States" },
  { id: 3, value: "Canada" },
  { id: 4, value: "Netherlands" },
  { id: 5, value: "Sweden" },
  { id: 6, value: "Norway" },
  { id: 7, value: "Australia" },
  { id: 8, value: "Germany" },
  { id: 9, value: "France" },
  { id: 10, value: "Nigeria" },
];

const socialMediaFields: SocialMediaField[] = [
  {
    id: "instagram",
    icon: instagram,
    label: "Instagram",
    alt: "Instagram",
  },
  {
    id: "facebook",
    icon: facebook,
    label: "Facebook",
    alt: "Facebook",
  },
  {
    id: "tiktok",
    icon: tiktok,
    label: "TikTok",
    alt: "TikTok",
  },
  {
    id: "twitter",
    icon: twitter,
    label: "Twitter (X)",
    alt: "Twitter",
  },
  {
    id: "snapchat",
    icon: snapchat,
    label: "Snapchat",
    alt: "Snapchat",
  },
];

// Define administrative divisions for different countries
const countryAdministrativeDivisions: Record<string, CountryConfig> = {
  "United States": {
    label: "State",
    required: true,
    data: [
      { id: 1, value: "Alabama" },
      { id: 2, value: "Alaska" },
      { id: 3, value: "Arizona" },
      { id: 4, value: "Arkansas" },
      { id: 5, value: "California" },
      { id: 6, value: "Colorado" },
      { id: 7, value: "Connecticut" },
      { id: 8, value: "Delaware" },
      { id: 9, value: "Florida" },
      { id: 10, value: "Georgia" },
      { id: 11, value: "Hawaii" },
      { id: 12, value: "Idaho" },
      { id: 13, value: "Illinois" },
      { id: 14, value: "Indiana" },
      { id: 15, value: "Iowa" },
      { id: 16, value: "Kansas" },
      { id: 17, value: "Kentucky" },
      { id: 18, value: "Louisiana" },
      { id: 19, value: "Maine" },
      { id: 20, value: "Maryland" },
      { id: 21, value: "Massachusetts" },
      { id: 22, value: "Michigan" },
      { id: 23, value: "Minnesota" },
      { id: 24, value: "Mississippi" },
      { id: 25, value: "Missouri" },
    ],
  },
  Canada: {
    label: "Province/Territory",
    required: true,
    data: [
      { id: 1, value: "Alberta" },
      { id: 2, value: "British Columbia" },
      { id: 3, value: "Manitoba" },
      { id: 4, value: "New Brunswick" },
      { id: 5, value: "Newfoundland and Labrador" },
      { id: 6, value: "Northwest Territories" },
      { id: 7, value: "Nova Scotia" },
      { id: 8, value: "Nunavut" },
      { id: 9, value: "Ontario" },
      { id: 10, value: "Prince Edward Island" },
      { id: 11, value: "Quebec" },
      { id: 12, value: "Saskatchewan" },
      { id: 13, value: "Yukon" },
    ],
  },
  Australia: {
    label: "State/Territory",
    required: true,
    data: [
      { id: 1, value: "Australian Capital Territory" },
      { id: 2, value: "New South Wales" },
      { id: 3, value: "Northern Territory" },
      { id: 4, value: "Queensland" },
      { id: 5, value: "South Australia" },
      { id: 6, value: "Tasmania" },
      { id: 7, value: "Victoria" },
      { id: 8, value: "Western Australia" },
    ],
  },
  Germany: {
    label: "State (Länder)",
    required: true,
    data: [
      { id: 1, value: "Baden-Württemberg" },
      { id: 2, value: "Bavaria" },
      { id: 3, value: "Berlin" },
      { id: 4, value: "Brandenburg" },
      { id: 5, value: "Bremen" },
      { id: 6, value: "Hamburg" },
      { id: 7, value: "Hesse" },
      { id: 8, value: "Lower Saxony" },
      { id: 9, value: "Mecklenburg-Vorpommern" },
      { id: 10, value: "North Rhine-Westphalia" },
      { id: 11, value: "Rhineland-Palatinate" },
      { id: 12, value: "Saarland" },
      { id: 13, value: "Saxony" },
      { id: 14, value: "Saxony-Anhalt" },
      { id: 15, value: "Schleswig-Holstein" },
      { id: 16, value: "Thuringia" },
    ],
  },
  Nigeria: {
    label: "State",
    required: true,
    data: [
      { id: 1, value: "Abia" },
      { id: 2, value: "Adamawa" },
      { id: 3, value: "Akwa Ibom" },
      { id: 4, value: "Anambra" },
      { id: 5, value: "Bauchi" },
      { id: 6, value: "Bayelsa" },
      { id: 7, value: "Benue" },
      { id: 8, value: "Borno" },
      { id: 9, value: "Cross River" },
      { id: 10, value: "Delta" },
      { id: 11, value: "Edo" },
    ],
  },
  // Countries that don't use states/provinces - only cities and postal codes
  "United Kingdom": {
    label: null,
    required: false,
    data: [],
  },
  Netherlands: {
    label: null,
    required: false,
    data: [],
  },
  Sweden: {
    label: null,
    required: false,
    data: [],
  },
  Norway: {
    label: null,
    required: false,
    data: [],
  },
  France: {
    label: null,
    required: false,
    data: [],
  },
};

const VendorBasicBusinessInfo: FC<VendorBasicBusinessInfoProps> = ({
  onContinue,
}) => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<FormValues>();

  const watchedCountry = useWatch({
    control,
    name: "country",
  });

  const [stateData, setStateData] = useState<SelectOption[]>([]);
  const [stateLabel, setStateLabel] = useState<string>("State");
  const [isStateRequired, setIsStateRequired] = useState<boolean>(false);
  const [showStateField, setShowStateField] = useState<boolean>(false);

  useEffect(() => {
    if (watchedCountry && countryAdministrativeDivisions[watchedCountry]) {
      const countryConfig = countryAdministrativeDivisions[watchedCountry];

      if (countryConfig.label) {
        setStateData(countryConfig.data);
        setStateLabel(countryConfig.label);
        setIsStateRequired(countryConfig.required);
        setShowStateField(true);
      } else {
        // Country doesn't use states/provinces
        setStateData([]);
        setShowStateField(false);
        setIsStateRequired(false);
      }

      // Clear the state field when country changes
      setValue("state", "");
    } else {
      // No country selected
      setStateData([]);
      setShowStateField(false);
      setIsStateRequired(false);
      setValue("state", "");
    }
  }, [watchedCountry, setValue]);

  const { mutate, isLoading } = useMutateData({
    url: "/user-service/onboarding/setup-profile",
    method: "POST",
    onSuccess: (d) => {
      console.log(d);

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

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    const payload = {
      business_name: data.businessName,
      business_email: data.businessEmail,
      business_type: data.vendorType,
      registration_number: data.businessRegistrationNumber, // Add if your form has this field
      phone_number: data.businessPhone,
      website: data.website || null, // Convert empty string to null
      street: data.businessStreet,
      city: data.city,
      country: data.country,
      state: data.state || null,
      instagram: data.instagram || null,
      facebook: data.facebook || null,
      x: data.twitter || null, // Map twitter to x
      tiktok: data.tiktok || null,
      snapchat: data.snapchat || null,
      user_id: session?.user?.id,
    };

    mutate(payload);
  };

  return (
    <div className="py-6 lg:py-12 container mx-auto text-kv-venue-header">
      <h1 className="text-xl md:text-3xl font-bold mb-8">
        Basic Business Information 1
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <CustomInput
              label="Business Name"
              type="text"
              id="businessName"
              placeholder="Enter"
              className="w-full"
              {...register("businessName", {
                required: "Business name is required",
              })}
              error={errors.businessName?.message}
            />
          </div>
          <div>
            <CustomInput
              label="Business Reg No"
              type="text"
              id="businessRegistrationNumber"
              placeholder="Enter"
              className="w-full"
              {...register("businessRegistrationNumber", {
                required: "Business Reg No is required",
              })}
              error={errors.businessRegistrationNumber?.message}
            />
          </div>

          {/* Vendor Type */}
          <div>
            <label
              htmlFor="vendorType"
              className="block mb-2 text-sm font-medium"
            >
              Vendor Type
            </label>

            <CustomSelect
              name="vendorType"
              control={control}
              placeholder="Select Vendor Type"
              rules={{ required: "Vendor type is required" }}
              error={errors.vendorType?.message}
              data={vendorTypeData}
            />
          </div>

          {/* Business Email */}
          <div>
            <CustomInput
              label="Business Email"
              type="email"
              id="email"
              placeholder="Enter"
              className="w-full"
              {...register("businessEmail", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={errors.businessEmail?.message}
            />
          </div>

          {/* Business Phone Number */}
          <div>
            <CustomInput
              label="Business Phone Number"
              type="tel"
              id="businessPhone"
              placeholder="Enter"
              className="w-full"
              {...register("businessPhone", {
                required: "Phone number is required",
              })}
              error={errors.businessPhone?.message}
            />
          </div>

          <div>
            <CustomInput
              label="Website"
              type="url"
              id="website"
              placeholder="Enter"
              className="w-full"
              {...register("website")}
              error={errors.website?.message}
            />
          </div>

          {/* Business Street */}
          <div>
            <CustomInput
              label="Business Street"
              type="text"
              id="businessStreet"
              placeholder="Enter"
              className="w-full"
              {...register("businessStreet", {
                required: "Street address is required",
              })}
              error={errors.businessStreet?.message}
            />
          </div>

          {/* City */}
          <div>
            <CustomInput
              label="City"
              type="text"
              id="city"
              placeholder="Enter"
              className="w-full"
              {...register("city", { required: "City is required" })}
              error={errors.city?.message}
            />
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block mb-2 text-sm font-medium">
              Country
            </label>
            <CustomSelect
              name="country"
              control={control}
              placeholder="Select Country"
              rules={{ required: "Country is required" }}
              error={errors.country?.message}
              data={countryData}
            />
          </div>

          {/* State - Only show if country uses states/provinces */}
          {showStateField && (
            <div>
              <label htmlFor="state" className="block mb-2 text-sm font-medium">
                State/City
              </label>
              <CustomSelect
                name="state"
                control={control}
                placeholder={`Select ${stateLabel}`}
                rules={
                  isStateRequired
                    ? { required: `${stateLabel} is required` }
                    : {}
                }
                error={errors.state?.message}
                data={stateData}
                disabled={!watchedCountry || stateData.length === 0}
              />
            </div>
          )}

          {/* Social Media Inputs with Icons */}
          {socialMediaFields.map((social) => (
            <div key={social.id}>
              <label
                htmlFor={social.id}
                className="block mb-2 text-sm font-medium"
              >
                {social.label} (Optional)
              </label>
              <div className="relative">
                <div className="absolute z-10 inset-y-0 left-3 flex items-center pointer-events-none">
                  <Image
                    src={social.icon}
                    alt={social.alt}
                    width={20}
                    height={20}
                  />
                </div>
                <CustomInput
                  type="text"
                  id={social.id}
                  placeholder={`${social.label} handle`}
                  className="w-full pl-10"
                  {...register(social.id)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center">
          <Link href="/">
            <button
              type="button"
              className="px-6 py-3 font-medium text-base leading-6"
            >
              Go Back
            </button>
          </Link>
          <CustomButton
            isLoading={isLoading}
            disabled={isLoading}
            type="submit"
          >
            Continue
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default VendorBasicBusinessInfo;
