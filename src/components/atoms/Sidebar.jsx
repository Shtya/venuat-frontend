"use client"
import AxiosInstance from '@/config/Axios'
import { ImgPlus, ImgUser, ImgUserPrimary } from '@/constants/imgs'
import { hookUser } from '@/hooks/hookUser'
import { useRouter } from '@/navigation'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useTranslations } from 'use-intl'

export default function Sidebar({getMe , loading , currentComponent ,handleCurrentPage}) {
	const t = useTranslations()
	const router = useRouter()
	const { user } = hookUser()

	const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (getMe?.avatar) {
            setPreview(getMe.avatar);
        }
    }, [loading]);

    const handleImage = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        await uploadImage(selectedFile);
    };

    // رفع الصورة إلى الـ backend
    const uploadImage = async (imageFile) => {
        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("avatar", imageFile);

            const response = await AxiosInstance.patch( `/users/${user?.id}` , formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data?.avatarUrl) {
                setPreview(response.data.avatarUrl);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setUploading(false);
        }
    };

  return (
	<div data-aos="fade-up" className='main-shadow h-fit pt-[20px] pb-[10px]  rounded-[20px] ' >
		<div className='mx-auto bg-primary3 hover:bg-opacity-50  duration-200 cursor-pointer rounded-[50%] flex items-center justify-center relative w-[80px] h-[80px] ' >
			
			<label  htmlFor="upload" className='w-full cursor-pointer h-full flex items-center justify-center ' >
				<input onChange={handleImage} className='hidden' type="file" name="" id="upload" />
				{preview 
					? <Image width={50} height={50} src={preview} alt="Selected" className=" w-full h-full rounded-[50%] object-cover " />
					: <Image className='w-[50px] h-[50px] '  src={ImgUserPrimary} alt='' width={90} height={90} />
				}
				<Image className=' cursor-pointer border-[1px] border-gray-100 group-hover:bg-opacity-50 duration-200 absolute bg-primary3 w-[35px] h-[35px] rounded-[50%] right-[-10px] bottom-0 ' src={ImgPlus} alt='' width={25} height={25} />
			</label>

			
		</div>

		<div className="h3 text-center mt-[10px] ">  { getMe?.full_name } </div>
		<div className="h4 text-center  text-secondry3 max-[300px]:hidden ">  { getMe?.email } </div>

		<hr className=' my-[10px] border-t-[1px] border-primary3 ' />

		<div onClick={()=> handleCurrentPage(1)} className={`h4 hover:bg-gray1 p-[10px] cursor-pointer duration-200 ${currentComponent == 1 && "text-primary1  !bg-primary3 border-r-[4px] border-primary1 "} `} > {t("personalInfo")} </div>
		<div onClick={()=> handleCurrentPage(2)} className={`h4 hover:bg-gray1 mt-[2px] p-[10px] cursor-pointer duration-200 ${currentComponent == 2 && "text-primary1  !bg-primary3 border-r-[4px] border-primary1 "} `} > {t("bookHalls")} </div>
		<div onClick={()=> handleCurrentPage(3)} className={`h4 hover:bg-gray1 mt-[2px] p-[10px] cursor-pointer duration-200 ${currentComponent == 3 && "text-primary1  !bg-primary3 border-r-[4px] border-primary1 "} `} > {t("sent_questions")} </div>

		<hr className=' my-[10px] border-t-[1px] border-primary3 ' />
		<div className={`h4 p-[10px] text-red-600 hover:bg-red-200 cursor-pointer hover:bg-opacity-60 duration-200  `} > {t("logout")} </div>

	</div>
  )
}
