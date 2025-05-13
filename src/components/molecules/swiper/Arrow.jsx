import React from 'react'

export default function Arrow() {
  return (
	<div data-aos='zoom-out' className='relative flex items-center gap-[10px] ltr:flex-row-reverse ' >
      	<button className={`w-[40px] h-[40px] bg-primary1 stroke-white hover:bg-primary2 hover:stroke-white duration-100 custom-prev `} >  <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.83333 1.33268L8.5 7.99935L1.83333 14.666" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>  </button>
		<button className={`w-[40px] h-[40px] bg-primary1 stroke-white hover:bg-primary2 hover:stroke-white duration-100 custom-next `}>   <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.16667 1.33268L1.5 7.99935L8.16667 14.666" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
	</div>
  )
}
