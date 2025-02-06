

// import React, { useState } from 'react'

// export default function savePage() {
  
// 	const [currentComponent , setcurrentComponent] =useState(1)

// 	const handleCurrentPage = (number)=>{
// 		setcurrentComponent(number)
// 		const url = new URL(window.location);
// 		url.searchParams.set("page", number);
// 		window.history.pushState({}, "", url);
// 	}


// 	useEffect(() => {
// 		const urlParams = new URLSearchParams(window.location.search);
// 		const currentPageFromUrl = urlParams.get("page");

// 		if (currentPageFromUrl) {
// 		setcurrentComponent(parseInt(currentPageFromUrl));
// 		}
// 	}, []);

// }
