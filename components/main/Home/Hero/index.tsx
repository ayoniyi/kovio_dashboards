
"use client";
import Image from "next/image";
import { Button } from "@/components/ui/shadcn/button";
import { homeData } from "@/Data";
import Link from "next/link";
import CustomButton from "@/components/ui/custom/button";
import { useState, useEffect, SetStateAction } from "react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const carouselImages = [
    {
      src: "/newimages/home/photographer.png",
      alt: "Photographer vendors",
      category: "Photographer vendors"
    },
    {
      src: "/newimages/home/1.jfif", 
      alt: "Event Venues",
      category: "Event Venues"
    },
    {
      src: "/newimages/home/2.jfif",
      alt: "Bouncers", 
      category: "Bouncers"
    },
    {
      src: "/newimages/home/3.jfif",
      alt: "Photography vendors",
      category: "Event Venues"
    },
    {
      src: "/newimages/home/4.jfif", 
      alt: "Event Venues",
      category: "Event Venues"
    },
    {
      src: "/newimages/home/5.jfif",
      alt: "Music vendors", 
      category: "Foods"
    }
  ];

  const slides = [];
  const imagesPerSlide = isMobile ? 1 : 3; 
  
  for (let i = 0; i < carouselImages.length; i += imagesPerSlide) {
    slides.push(carouselImages.slice(i, i + imagesPerSlide));
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, [isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide(
      currentSlide === 0 ? slides.length - 1 : currentSlide - 1
    );
  };

  const goToNext = () => {
    setCurrentSlide(
      currentSlide === slides.length - 1 ? 0 : currentSlide + 1
    );
  };

  return (
    <section className="w-full relative z-40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen flex flex-col">
      {/* Orange accent circle */}
      <div className="absolute top-14 lg:top-4 lg:left-80 w-32 lg:w-48 h-32 lg:h-48 bg-kv-primary rounded-full opacity-90 z-10"></div>
      
      {/* Main hero content */}
      <div className="flex-1 flex items-center justify-center px-4 z-20 sm:px-8 pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-[27px] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-gabaritoHeading leading-tight pb-3 md:pb-0">
             {homeData.hero.title}
           <span className="text-yellow-400">EASE</span>
          
          </h1>
          <p className="text-base text-gray-300 font-interTightText font-medium max-w-2xl mx-auto leading-relaxed px-4">
            {homeData.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
             
              <Link href={'/venues'} > 
                   <Button className="text-base w-full sm:w-auto font-interTightText rounded-full cursor-pointer shadow-none text-kv-semi-black px-10 h-12 text-base font-medium transition hover:opacity-90 flex items-center justify-center" variant="outline">
                      Find Your Venue
                   </Button>
            </Link>
            <Link href="/vendors" className="Jw-full sm:w-auto">
               <CustomButton className="justify-center font-interTightText" children={'Explore Vendors'}/>
            </Link>

            
          </div>
        </div>
      </div>

      {/* Image Carousel Section */}
      <div className="relative w-full container pb-16">
        <div className=" mx-auto">
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 relative">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[18rem] lg:h-[21rem]">
                    {slide.map((image, imageIndex) => (
                      <div key={imageIndex} className="relative rounded-3xl overflow-hidden group">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-lg font-semibold text-sm font-interTightText">{image.category}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 rounded-full p-2 shadow-lg transition-all duration-200 z-10"
              aria-label="Previous slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 rounded-full p-2 shadow-lg transition-all duration-200 z-10"
              aria-label="Next slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

           
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 lg:w-3 h-2 lg:h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide
                      ? "bg-kv-primary scale-110"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}