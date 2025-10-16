import React from 'react';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';
import CustomButton from '@/components/ui/custom/button';
import Link from 'next/link';

const OnboardingComplete: React.FC = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen ">
      <Image src="/newimages/completedLogo.png" alt="KOVIO" width={81.18} height={31.95} className="mb-8" />
     <Image src="/newimages/completedIcon.png" width={56} height={56} alt='Completed Icon' /> 
      <h1 className="text-[28px] lg:text-[32px] text-[#212327] font-semibold mb-2 mt-6">Onboarding Completed</h1>
      <p className="text-center max-w-md font-normal text-base leading-6 tracking-extra-wide text[#444B59] mb-6">
        Your profile will become visible to customers within 24-48 hours of verification by our Admin
      </p>

      <Link href={'/'}>
        <CustomButton className='mt-8' children={"Proceed to Homepage"}/>
      </Link>
    </div>
  );
};

export default OnboardingComplete;