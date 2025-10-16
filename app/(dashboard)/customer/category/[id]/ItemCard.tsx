import Image from "next/image";
import style from "./ItemCard.module.scss";
import cater from "@/public/assets/item.png";
import CustomButton from "@/components/ui/custom/button";

const ItemCard = ({ category }: any) => {
  return (
    <div className={style.card}>
      <div className={style.imgBx}>
        <Image
          // src={
          //   category?.imageUrl?.includes("http")
          //     ? cater
          //     : category?.imageUrl || cater
          // }
          src={cater}
          alt="item"
          width={200}
          height={200}
        />
      </div>
      <div className={style.contentBx}>
        <h3>{category?.name || "Amazing Catering Services"}</h3>
        <div className={style.desc}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_127_7446)">
              <path
                d="M8.99991 0.0317383C7.01537 0.0339216 5.11272 0.823195 3.70936 2.22641C2.30601 3.62963 1.51654 5.5322 1.51416 7.51674C1.51416 9.44424 3.00666 12.4607 5.95041 16.4822C6.30086 16.9623 6.7597 17.3529 7.28961 17.6222C7.81952 17.8914 8.40552 18.0318 8.99991 18.0318C9.59431 18.0318 10.1803 17.8914 10.7102 17.6222C11.2401 17.3529 11.699 16.9623 12.0494 16.4822C14.9932 12.4607 16.4857 9.44424 16.4857 7.51674C16.4833 5.5322 15.6938 3.62963 14.2905 2.22641C12.8871 0.823195 10.9845 0.0339216 8.99991 0.0317383ZM8.99991 10.5002C8.40657 10.5002 7.82655 10.3243 7.3332 9.99465C6.83985 9.665 6.45533 9.19647 6.22827 8.64829C6.00121 8.10011 5.9418 7.49691 6.05755 6.91497C6.17331 6.33302 6.45903 5.79848 6.87859 5.37892C7.29815 4.95936 7.8327 4.67364 8.41464 4.55788C8.99658 4.44213 9.59978 4.50154 10.148 4.7286C10.6961 4.95566 11.1647 5.34018 11.4943 5.83353C11.824 6.32688 11.9999 6.9069 11.9999 7.50024C11.9999 8.29589 11.6838 9.05895 11.1212 9.62156C10.5586 10.1842 9.79556 10.5002 8.99991 10.5002Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_127_7446">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <p className="ml-1 capitalize">
            {category?.location || "Ikeja, Lagos"}
          </p>
        </div>
        <div className={style.desc}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.75 4.5H3.75C3.10575 4.5 2.496 4.221 2.07375 3.75075C2.48625 3.29025 3.0855 3 3.75 3H17.25C18.231 2.9955 18.2302 1.50375 17.25 1.5H3.75C1.67925 1.5 0 3.17925 0 5.25V12.75C0 14.8208 1.67925 16.5 3.75 16.5H15.75C16.9928 16.5 18 15.4928 18 14.25V6.75C18 5.50725 16.9928 4.5 15.75 4.5ZM15 11.25C14.019 11.2455 14.019 9.7545 15 9.75C15.981 9.7545 15.981 11.2455 15 11.25Z"
              fill="#111827"
            />
          </svg>

          <p className="ml-1.5 ">From NGN {category?.price || "500,000"}</p>
        </div>
        <div className={style.btns}>
          <CustomButton type="submit" children="Book Now" className="w-2/5  " />
          <CustomButton
            type="button"
            //onClick={handleFilterReset}
            children="Negotiate"
            className="w-2/5 ml-2.5 text-black bg-[#F9FAFB] hover:bg-[#F9FAFB] hover:text-black border border-black"
          />
          <div className="cursor-pointer w-2/5 ml-5 text-black bg-[#F9FAFB]  ">
            <p>View Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
