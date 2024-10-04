import Logo from '@/icons/Logo';
import React from 'react';

export default function Footer() {
  return (
    <div className="relative h-[70vh]" style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}>
      <div className="bg-[#242424] py-8 h-full w-full flex flex-col justify-between">
        <div className="fixed bottom-0 h-[70vh] px-12 w-full py-6 flex flex-col justify-between">
          <div className="flex justify-between w-full">
            <div>
              <div className="text-[#ffffff80] w-40 mr-10">
                <Logo />
              </div>
            </div>
            <div className="flex gap-20">
              <div className="flex flex-col gap-2">
                <h3 className="mb-2 uppercase text-[#ffffff80]">About</h3>
                <p>Home</p>
                <p>Projects</p>
                <p>Our Mission</p>
                <p>Contact Us</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="mb-2 uppercase text-[#ffffff80]">Education</h3>
                <p>News</p>
                <p>Learn</p>
                <p>Certification</p>
                <p>Publications</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="mb-2 uppercase text-[#ffffff80]">About</h3>
                <p>About us</p>
                <p>What customers say</p>
                <p>Blog</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <p className="text-[#ffffff80] text-xs text-right">2024 - POWERED BY SHOPFLEX</p>
          </div>
        </div>
      </div>
    </div>
  );
}
