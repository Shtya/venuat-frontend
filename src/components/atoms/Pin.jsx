import React from 'react'

export default function Pin() {
  return (
	<div class="relative w-10 h-10 flex items-center justify-center">
		<div class="absolute w-20 h-20 bg-blue-500 opacity-20 rounded-full animate-ping"></div>

		<div class="w-[10px] h-[10px] bg-blue-700 rounded-full"></div>
	</div>


  )
}
