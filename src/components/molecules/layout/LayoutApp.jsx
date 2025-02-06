"use client"
import React from 'react'
import Navbar from "@/components/atoms/Navbar"
import Footer from "@/components/atoms/Footer"
import { usePathname } from '@/navigation'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';


export default function Layout({children}) {
	const path = usePathname()
	const pages = ["sign-in", "sign-up" , "forget-my-password"];
	const isAuth = pages.some((route) => path.endsWith(route));
	

	useEffect(() => {
		AOS.init({
			offset: 0,
		  duration: 500, 
		  easing: 'ease-in-out', 
		  once: true, 
		});
	  }, []);
  return (
	<div>
		{!isAuth && <Navbar />}
		<div  > {children} </div>
		{!isAuth && <Footer />}
	</div>
  )
}
