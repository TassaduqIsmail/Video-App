import React from 'react'

function Creatorstool() {
  return (
    <div>
    <div className='flex justify-between m-2'>
<img src="backicon.png" alt="" />
<div className='flex items-center'>
<p className='text-white text-sm font-thin'>Creator’s tool</p>
</div>
<p className=''></p>
</div>

<div className='p-5 '>
<center>
     <div className='border border-[#4753ea] rounded-lg p-5 m-10'>
   
     <p className='text-[#a1a3a7] font-thin text-xs mb-4'>Balance</p>

        <p className='text-white   text-lg mb-4'>€  12.04 K</p>

        <div className='w-full h-0.5 bg-[#59585b] mb-4'></div>

        <button type='button'  className="text-[#00FF00] border border-[#4753ea] text-xs px-10 font-thin py-1 p-4 rounded-full ">WITHDRAW</button>
      




    </div>

    </center>
</div>

</div>
  )
}

export default Creatorstool