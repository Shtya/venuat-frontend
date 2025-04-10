"use client"
import React, { useState } from 'react'
import Navbar from "@/components/atoms/Navbar"
import Footer from "@/components/atoms/Footer"
import { usePathname } from '@/navigation'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast'
import { GlobalProvider } from '@/context/GlobalContext'
import CanNotAccess from '@/components/atoms/CanNotAccess'


export default function Layout({children , params }) {
	const path = usePathname()
	const [show , setShow ] = useState(false)

	useEffect(()=> {
		if( ["/sign-in" , "/sign-up" , "/forget-my-password"]?.includes(path) || path?.startsWith("/sign-up")  ){
			setShow(false)
		}
		else setShow(true)
	},[path])
	

	useEffect(() => {
		AOS.init({
		  duration: 350, 
		  easing: 'ease-in-out', 
		  once: true, 
		});
	  }, []);
  return (
	<GlobalProvider>
	<div>
		{show && <Navbar />}
		<div  > {children} </div>
		{show && <Footer />}
		<Toaster position="top-center" reverseOrder={false} />
		<CanNotAccess />
	</div>
	</GlobalProvider>
  )
}
