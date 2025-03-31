import Image from 'next/image'
import React from 'react'

const InputItem = ({type}) => {
  return (
    <div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4'>
      <Image src={type=='source'?'/source.png':'/dest.jpg'} width={20} height={20} alt='logo'/>
      <input type='text' placeholder={type=='source'?'Pickup Location':'Dropoff Point' }className='bg-transparent w-full outline-none'/>
    </div>
  )
}

export default InputItem
