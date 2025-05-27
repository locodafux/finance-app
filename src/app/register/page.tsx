
import Image from 'next/image';

export default function Register() {
  return (
   <div className="flex h-screen p-12">
    <div className="flex flex-col gap-y-2">
    <h1 className='mb-4'>uBrand</h1>
    <h1 className = 'font-semibold text-xl'>Start Your 14-Day Free Trial Today.</h1>
    <span className='text-sm text-gray-500 mb-2'>NO CREDIT CARD REQUIRED</span>
    <button className='bg-[#E3F3FB] rounded-full py-2 px-4 text-gray-700 mb-4'>Sign up with Google</button>
    <hr className='mb-4' />

    <div className="mb-2">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Email
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
      <p className="text-red-500 text-xs italic">Please choose a password.</p>
    </div>
      <button className='bg-[#E3F3FB] rounded-md py-2 px-4 text-gray-700 mb-4'>Sign up</button>
      <span className='text-xs text-gray-400 mb-6'>By Signing up to uBrand, means you agree to our Privacy Policy and Terms of Service</span>
      <span className='text-sm m-auto'>Already a Member <span className='font-semibold'>LOG IN</span></span>    
    </div>
   </div>
  );
}
