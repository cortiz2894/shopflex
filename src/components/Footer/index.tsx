import Logo from '@/icons/Logo';
import React from 'react';

export default function Footer() {
  return (
    <div className="relative h-[70vh]" style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}>
      <div className="bg-[#242424] py-8 h-full w-full flex flex-col justify-between">
        <div className="fixed bottom-0 h-[70vh] px-12 w-full py-6 flex flex-col justify-between">
          <div className="flex justify-between w-full md:flex-row flex-col items-center md:items-start">
            <div className="w-full flex justify-center md:block md:w-auto">
              <div className="text-[#ffffff80] w-40 md:mr-10">
                <Logo />
              </div>
            </div>
            <div className="flex md:gap-20 gap-12 md:mt-0 mt-12">
              <div className="flex flex-col gap-2 items-center md:items-start">
                <h3 className="mb-2 uppercase text-[#ffffff80]">About</h3>
                <p className="text-sm md:text-base text-center md:text-start">Home</p>
                <p className="text-sm md:text-base text-center md:text-start">Projects</p>
                <p className="text-sm md:text-base text-center md:text-start">Our Mission</p>
                <p className="text-sm md:text-base text-center md:text-start">Contact Us</p>
              </div>
              <div className="flex flex-col gap-2 items-center md:items-start">
                <h3 className="mb-2 uppercase text-[#ffffff80]">Education</h3>
                <p className="text-sm md:text-base text-center md:text-start">News</p>
                <p className="text-sm md:text-base text-center md:text-start">Learn</p>
                <p className="text-sm md:text-base text-center md:text-start">Certification</p>
                <p className="text-sm md:text-base text-center md:text-start">Publications</p>
              </div>
              <div className="flex flex-col gap-2 items-center md:items-start">
                <h3 className="mb-2 uppercase text-[#ffffff80]">About</h3>
                <p className="text-sm md:text-base text-center md:text-start">About us</p>
                <p className="text-sm md:text-base text-center md:text-start">What customers say</p>
                <p className="text-sm md:text-base text-center md:text-start">Blog</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <p className="text-[#ffffff80] text-xs md:text-right text-center">2024 - POWERED BY SHOPFLEX</p>
          </div>
        </div>
      </div>
    </div>
  );
}
