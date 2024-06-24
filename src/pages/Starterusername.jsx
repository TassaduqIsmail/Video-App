import React from 'react'

function Starterusername() {
  return (
    <div className='w-full h-full '>
    <center>
        
    <img src="whitelogo.png" className=' mt-40' alt="" />

    <p className='text-white text-2xl mt-20 font-bold'>Enter your username</p>

<div className='p-5'>
    <p className='text-[#A1A3A7] mb-2 font-thin mt-2 text-sm float-start '>Username</p>
<input type="text" value={"@"} className='text-white border-none h-6   w-full bg-[#110e0f]' />
</div>

    <p className='text-[#A1A3A7] text-xs font-thin  m-5 '>Usernames can contain only letters, numbers, underscores, and periods. Changing you username will also change your profile link.</p>
    <div className='p-5 mt-10'>
   
  <img className='mt-10' src='slide3.png'/>

  <div className='flex justify-between'>

<a href='uploadprofilepicture'
        type="button"
        className="mt-20  mb-5 text-white font-thin py-2  rounded-full"
        
      >
        Skip
      </a>

<a href='uploadprofilepicture'
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

export default Starterusername