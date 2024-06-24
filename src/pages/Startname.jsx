import React, { useState } from 'react'

function Startname() {
  
  return (
    <div className='w-full h-full '>
    <center>
        
    <img src="whitelogo.png" className=' mt-40' alt="" />

    <p className='text-white text-2xl mt-20 font-bold'>Enter your name</p>

<div className='p-5'>
    <p className='text-[#A1A3A7] mb-2 font-thin mt-2 text-sm float-start '>Name</p>
<input type="text" value={""} className='text-white border-none h-6   w-full bg-[#110e0f]' />
<p className='text-[#A1A3A7] text-xs font-thin  float-start'>0/30</p>
   
</div>

     <div className='p-5 mt-10'>
   
  <img className='mt-10' src='slide2.png'/>

  <div className='flex justify-between'>

<a href="starterusername"
        type="button"
        className="mt-20  mb-5 text-white font-thin py-2  rounded-full"
        
      >
        Skip
      </a>

<a href="starterusername"
        type="button"
        className="mt-20 bg-[#3640c2]  mb-5 text-white font-bold p-4  rounded-full"
       
      >
        <img src='whiteplayicon.png' />
      </a>

</div>


    </div>
    </center>
</div>
  )
}

export default Startname