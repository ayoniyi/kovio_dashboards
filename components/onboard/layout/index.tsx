// import { AwaitedReactNode, FC, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';
import { onboardingSteps } from './links';

interface Step {
  number: number;
  label: string;
}

interface NavProps {
  currentStep: number;
 
}



const SideBar: FC<NavProps> = ({ currentStep }) => {


  return (
    <>
      <div className="hidden lg:flex flex-col bg-kv-venue-header text-white h-screen pr-10 fixed left-0 top-0">
        <Link href={'/'} className="mx-auto py-16">
          <Image src="/newimages/venuelogo.png" alt="KOVIO" width={114.51} height={44.16} />
        </Link>
        
        <div className="flex flex-col space-y-8 mt-8">
          {onboardingSteps.map((step) => (
            <div key={step.number} className="relative pl-10">
              <div className="flex items-center">
                <div className="relative">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${currentStep > step.number 
                      ? 'bg-[#E6F4EA] text-[#34A853]' 
                      : 'bg-white text-[#1C2636]'}`}
                  >
                    {currentStep > step.number ? (
                      <div className='bg-[#34A853] rounded-full h-7 w-7 flex items-center justify-center'>
                        <FaCheck className="w-3.5 h-3.5 text-white" />
                      </div>
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </div>
                  {/* {step.number < steps.length && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 h-8 border-l-2 border-dashed mb-1 border-gray-400"></div>
                  )} */}
                </div>
                <span className="ml-4 font-normal text-base leading-6">{step.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      
      <div className="mx-auto md:hidden justify-center items-center py-4 bg-white">
        <Image src="/newimages/logo.png" alt="KOVIO" width={116} height={146} className="my-4 mx-auto" />

        <div className="flex justify-between items-center w-full mt-4">
          {onboardingSteps.map((step, index) => (
            <div key={step.number} className="relative flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300
                ${currentStep > step.number 
                  ? 'bg-[#E6F4EA] text-[#34A853]' 
                  : 'bg-white text-[#1C2636] border border-gray-300'}`}
              >
                {currentStep > step.number ? (
                  <div className='bg-[#34A853] rounded-full h-6 w-6 flex items-center justify-center'>
                    <FaCheck className="w-3 h-3 text-white" />
                  </div>
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              {index < onboardingSteps.length - 1 && (
                <div className="w-8 h-0.5 border-t-2 border-dashed mx-1"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideBar;