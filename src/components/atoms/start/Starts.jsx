"uae client"
import React from 'react'
import Image from "next/image"
import { Star } from 'lucide-react'

export default function Starts({countFill , countEmpty , color}) {
  return (
	<div className='flex items-start gap-[3px]  ' >
		{Array.from({length : countFill}).map((e,i)=> <Image key={i} className='cursor-pointer'  src="/assets/start-fill.svg" alt="" width={25} height={25} /> )  }
		{Array.from({length : countEmpty}).map((e,i)=> color == "white" ? <Star key={i} /> : <Image key={i} className='cursor-pointer'  src="/assets/start-empty.svg" alt="" width={25} height={25} /> )  }
	</div>
  )
}
