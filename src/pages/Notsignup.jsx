import React from 'react'
import Appbar from '../components/Appbar'

function Notsignup() {
  return (
    <div>
        <div className='flex gap-2 m-2'>
        <img src="backicon.png" alt="" />
            <p className='text-white text-sm font-thin'>Login to subscribe</p>
            </div>
         

    <center>
     <div className='border border-[#4753ea] rounded-lg p-5 m-10'>
        <div className='rounded-full h-28 w-28'>
<img src="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" className='mt-5 rounded-full' alt="" />
</div>


        <p className='text-white font-thin  text-lg'>Christine Hay</p>
        <p className='text-[#a1a3a7] font-thin text-xs '>@christine_hay</p>


    <div className='flex justify-center gap-10 mt-10'>

        <div >
            <p className='text-white'>2.4M</p>
            <p className='text-[#a1a3a7] font-extralight'>Likes</p>
        </div>

        <div >
            <p className='text-white font-bold'>17.5K</p>
            <p  className='text-[#a1a3a7] font-extralight '>Subscribers</p>
        </div>

        <div >
            <p className='text-white font-bold'>4.7</p>
            <p className='text-[#a1a3a7] font-extralight'>Rating</p>
        </div>
        
    </div>


    </div>

    </center>

   
    <div className='flex gap-3 justify-center mb-5'>
        <img src="facebook.png" alt="" />
        <img src="google.png" alt="" />
        <img src="apple.png" alt="" />
    </div>


    <div className='flex justify-center items-center mb-5'>
<hr className='bg-[#727574] w-1/3 h-0.5' />
<p className='text-[#727574] mx-2 font-bold'>OR</p>
<hr className='bg-[#727574] w-1/3 h-0.5' />
</div>

<form className='p-3'>
    
    <div className='flex flex-col gap-3 mb-3'>
        <label className='text-white'>Your email</label>
        <input type="text" className='border-b h-6 border-white p-2 bg-[#110e0f]' />
    </div>

    <div className='flex flex-col gap-3'>
        <label className='text-white'>Password</label>
        <input type="text" className='h-6  border-b border-white p-2 bg-[#110e0f]' />
    </div>

    <center>

    <button type='submit' className="mt-20 mb-2 text-white font-bold py-2 px-32 rounded-full" style={{ backgroundImage: 'linear-gradient(to bottom, #3640c2, black)' }}>Login</button><br/>

 <a className='text-white text-xs mb-2' href="#">Don’t have an account? <span className='text-white font-bold'>Sign up</span></a>
</center>


</form>


</div>
  )
}

export default Notsignup