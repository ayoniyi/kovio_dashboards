"use client";
/** @format */

import { useForm } from "react-hook-form";
import useMutateData from "@/hooks/useMutateData";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CustomButton from "@/components/ui/custom/button";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import CustomInput from "@/components/ui/custom/custominput";
import { Textarea } from "@/components/ui/shadcn/textarea";

interface FormValues {
  email: string;
}

interface Response {
  description: string;
  responseBody: {
    firstName: string;
    lastName: string;
    email: string;
  };
}
export default function BookNowPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [time, setTime] = useState("00:00");
  const [location, setLocation] = useState<string>("");
  const [services, setServices] = useState<string>("");
  const [guestSize, setGuestSize] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // Function to handle booking
  const handleBooking = () => {
    console.log({
      selectedDate,
      time,
      location,
      services,
      guestSize,
    });
    // Add your booking logic here
  };

  // Get current month and year
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthName = monthNames[currentMonth.getMonth()];
  const currentYear = currentMonth.getFullYear();

  // Calendar navigation
  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();

    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();

    // Days from previous month
    const prevMonthDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      const prevDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        0 - (firstDayOfMonth - i - 1)
      );
      prevMonthDays.push({
        date: prevDate,
        isPrevMonth: true,
        isSelected: false,
        isHighlighted: false,
      });
    }

    // Current month days
    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        i
      );
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected =
        selectedDate && selectedDate.toDateString() === date.toDateString();

      // Highlighted dates (blue backgrounds in the UI)
      const highlightedDays = [
        10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
      ];
      const isHighlighted = highlightedDays.includes(i);

      currentMonthDays.push({
        date,
        isToday,
        isSelected,
        isHighlighted,
      });
    }

    // Next month days (to fill the remaining slots)
    const totalDaysDisplayed = 42; // 6 rows x 7 days
    const nextMonthDays = [];
    const remainingDays =
      totalDaysDisplayed - (prevMonthDays.length + currentMonthDays.length);

    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        i
      );
      nextMonthDays.push({
        date: nextDate,
        isNextMonth: true,
        isSelected: false,
        isHighlighted: false,
      });
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const calendarDays = generateCalendarDays();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const router = useRouter();
  const { mutate, isLoading } = useMutateData({
    url: "/user-service/onboarding/request-password-reset",
    method: "POST",
    onSuccess: (d: Response) => {
      console.log(d);

      router.push(`/`);
    },
    onError: (e) => {
      toast({
        title: "Error",
        description: e.message,
        variant: "destructive",
      });
    },
  });

  const submit = (data: FormValues) => {
    mutate({
      email: data.email,
    });
  };
  return (
    <div className="mx-auto">
      <Link
        href=""
        onClick={(e) => {
          e.preventDefault();
          window.history.back();
        }}
        className=" mb-3 lg:mb-8 flex items-center text-sm leading-5 tracking-extral-wide text-[#374151] mr-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7"></path>
        </svg>
        <span className="ml-1">Go back</span>
      </Link>

      <h1 className="text-xl font-gabaritoHeading mb-3 lg:mb-8 lg:text-2xl font-semibold text-center lg:text-left tracking-extra-wide text-black">
        Book Vendor
      </h1>

      <div className="grid lg:grid-cols-2 gap-6 bg-white lg:rounded-3xl shadow-sm lg:border p-4">
        {/* Custom Calendar section */}
        <div className="flex flex-col">
          {/* Calendar header */}
          <div className="flex justify-between items-center mb-4">
            <button onClick={goToPreviousMonth} className="p-1">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="text-sm lg:text-lg font-medium">
              {`${currentMonthName} ${currentYear}`}
            </div>
            <button onClick={goToNextMonth} className="p-1">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Custom calendar */}
          <div className="border rounded-xl p-4">
            {/* Days of week */}
            <div className="grid grid-cols-7 mb-2">
              {daysOfWeek.map((day, index) => (
                <div
                  key={index}
                  className="text-center text-sm font-medium text-gray-500"
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(day.date)}
                className={`
                    h-9 w-9 rounded-full font-normal flex items-center justify-center text-sm
                    ${day.isPrevMonth || day.isNextMonth ? "text-blue-500" : ""}
                    ${day.isSelected ? "bg-[#1354DC]  text-white" : ""}
                    ${
                      !day.isSelected && day.isToday
                        ? "font-bold text-blue-400"
                        : ""
                    }
                    ${
                      !day.isSelected && day.isHighlighted
                        ? "bg-[#075DC126] text-blue-500"
                        : ""
                    }                  `}
              >
                {day.date.getDate()}
              </button>
            ))}
          </div>

          {/* Time input */}
          <div className="mt-6">
            <label htmlFor="time" className="text-sm font-medium mb-2 block">
              Time
            </label>
            <div className="relative">
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-full border border-gray-300  outline-none py-2 pl-10 pr-4"
              />
              <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Form inputs */}
        <div className="space-y-6 text-sm font-medium leading-5 tracking-extra-wide mb-2 block text-kv-venue-header">
          <div>
            <label htmlFor="location">Event Location</label>

            <Textarea
              id="services"
              placeholder="Enter"
              // value={services}
              // onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setServices(e.target.value)}
              className="resize-none h-24"
            />
          </div>

          <div>
            <label
              htmlFor="services"
              className="text-sm font-medium mb-2 block"
            >
              Services Needed
            </label>

            <Textarea
              id="services"
              placeholder="Enter"
              // onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setServices(e.target.value)}
              className="resize-none h-24"
            />
          </div>

          <div>
            <CustomInput
              label="Size Of Guest"
              id="guestSize"
              className="rounded-full outline-none"
              placeholder="Enter"
              value={guestSize}
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setGuestSize(e.target.value)}
            />
          </div>

          <div className="flex justify-center lg:justify-end gap-4 pt-6">
            <CustomButton
              className="bg-[#F9FAFB] w-full lg:w-auto hover:bg-[#F9FAFB] border border-black text-kv-venue-header hover:text-[#1F2937]"
              children="Cancel"
            />
            <CustomButton
              onClick={handleBooking}
              className="w-full lg:w-auto"
              children={"Book"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
