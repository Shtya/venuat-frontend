import React from 'react'

export default function Divider({classname}) {
  return (
	<hr data-aos="zoom-in" className={`my-[10px] border-t-[1px] border-gray-100 ${classname} `} />

  )
}
