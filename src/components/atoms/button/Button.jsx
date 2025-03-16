'use client';
import { useRouter } from '@/navigation';
import Image from 'next/image';
import React from 'react';
import CanNotAccess from '../CanNotAccess';
import { useGlobalContext } from '@/context/GlobalContext';

export default function Button({style , checkAuth=false , cnName , isLoading , typeIcon , width, name, dataAos, rotate = true, disabled, onClick, icon, outline, showIcon , classname, href }) {
    const router = useRouter();
    const {setpath} = useGlobalContext()

    const handleClciks = () => {
         if(checkAuth){
            setpath("/reservation")
            if(!localStorage.getItem("user") ) return ; 
         }
         else setpath(null)
        onClick && onClick();
        href && router.push(href);

    };


    return (
        <div   className={`${width}`} data-aos={dataAos} >
            <div onClick={handleClciks} style={{style}} className={` ${classname} ${width} ${isLoading && "pointer-events-none text-secondry3 bg-primary2 border-primary2 "}  ${disabled == true && 'pointer-events-none text-secondry3 bg-primary3 border-primary3 '} text-[14px] gap-[10px] ${outline && 'bg-transparent  !text-primary1 hover:!text-white '} border-[2px] border-primary1 cursor-pointer hover:bg-primary2 duration-300 bg-primary1 min-h-[50px] max-sm:min-h-[40px]  text-white rounded-[40px] flex items-center justify-center text-center px-[20px]`}>
                {isLoading ? (
                    <div className={` w-5 h-5 border-2 ${!outline ? "border-white" : "border-primary1 "}  border-t-transparent rounded-full animate-spin`}></div>
                ) : (
                    <>
                        <span className={`${cnName}`} >{name}</span>
                        {showIcon ? typeIcon == "svg" ? icon : <Image className={`${rotate ? 'ltr:rotate-[180deg]' : ''}`} src={icon || '/assets/arrow-right.svg'} alt='' width={20} height={20} /> : null}
                    </>
                )}
            </div>
        </div>
    );
}
