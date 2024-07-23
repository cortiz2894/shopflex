import Image from "next/image";

export default function Home() {
  return (
    <main 
    // className="flex px-12"
    >
      <div className="h-[80vh] w-full header-overlay overflow-hidden relative">
          <Image 
            src={`/images/bg-shopflex.jpg`}
            layout='fill'
            objectFit='cover'
            alt='clothes'
          />
      </div>
    </main>
  );
}
