
export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center flex-col p-24">
      <h1 className="text-4xl mb-2"><span className="font-bold">Good morning,</span> Jane Doe!</h1>
      <h3 className="text-2xl mb-3">Welcome Back</h3>

      <div className=" flex flex-col lg:w-[60%] lg:h-full gap-y-4">
        <div className=" w-full flex gap-4 h-[40%]">
        <div className="w-[60%] h-full bg-[#181818] rounded-xl"></div>
        <div className="w-[40%] h-full bg-[#181818] rounded-xl"></div>
        </div>
        <div className=" w-full flex gap-4 h-[60%]">
        <div className="w-[60%] h-full bg-[#181818] rounded-xl"></div>
        <div className="flex flex-col w-[40%] h-full gap-4">
          <div className="w-full h-[60%] bg-[#181818] rounded-xl"></div>
          <div className="w-full h-[40%] bg-[#181818] rounded-xl"></div>
        </div>
        </div>
      </div>
    </div>
  );
}
