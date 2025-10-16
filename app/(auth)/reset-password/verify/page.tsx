import UserVerification from "@/components/auth/userverification";
import Image from "next/image";
import logo from "../../../../public/newimages/logo.png";
import bg from "../../../../public/newimages/authimg.png";
import Link from "next/link";
import VerifyPasswordReset from "@/components/auth/verifypasswordreset";

interface PageProps {
  searchParams: {
    email?: string;
  };
}
export default function VefifyPasswordReset({ searchParams }: PageProps) {
  const email = searchParams.email || "";

  if (!email) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-red-500">Email is missing</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block w-1/2 relative">
        <Image
          className="object-cover"
          src={bg}
          alt="Background"
          fill
          priority
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href={"/"}>
              <Image
                src={logo}
                alt="Kovio Logo"
                className="mx-auto mb-6 w-[82.05px] h-[30.57px] lg:w-[94.41px] lg:h-[37.77px]"
              />
            </Link>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Email Verifcation{" "}
            </h2>
            <p className="text-gray-500 mt-2">
              Enter the code sent to your email
            </p>
          </div>
          <VerifyPasswordReset email={decodeURIComponent(email)} />
        </div>
      </div>
    </div>
  );
}
