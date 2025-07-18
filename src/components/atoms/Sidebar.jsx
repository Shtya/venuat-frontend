'use client';
import AxiosInstance from '@/config/Axios';
import { ImgPlus, ImgUserPrimary } from '@/constants/imgs';
import { hookUser } from '@/hooks/hookUser';
import { useRouter } from '@/navigation';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'use-intl';
import Popup from '../molecules/Popup';
import LogoutPopup from '../popupComponent/LogouPopup';

export default function Sidebar({ getMe, loading, currentComponent, handleCurrentPage }) {
  const t = useTranslations();
  const router = useRouter();
  const { user } = hookUser();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (getMe?.avatar) {
      setPreview(getMe.avatar);
    }
  }, [loading]);

  const handleImage = async e => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    await uploadImage(selectedFile);
  };

  // رفع الصورة إلى الـ backend
  const uploadImage = async imageFile => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('avatar', imageFile);

      const response = await AxiosInstance.patch(`/users/${user?.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data?.avatarUrl) {
        setPreview(response.data.avatarUrl);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const [isOpenPopup, setisOpenPopup] = useState(false);

  const handleLogout = () => {
    // Remove any stored authentication tokens or user data
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.push('/sign-in');
  };

  return (
    <div data-aos="fade-up" className="bg-white rounded-lg shadow-md h-fit p-4 border border-gray-100">
      {/* Profile Picture */}
      <div className="flex flex-col items-center">
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

        {/* User Info */}
        <div className="h3 text-center mt-[10px] ">  { getMe?.full_name } </div>
		<div dir='ltr' className="h5 px-[5px] text-center flex items-center flex-wrap justify-center  text-secondry3  "> 
            <span> { getMe?.email?.split("@")[0] }</span>
            <span>@</span>
            <span> { getMe?.email?.split("@")[1] }</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6 space-y-1">
        <div onClick={() => handleCurrentPage(1)} className={`flex text-nowrap items-center px-4 py-3 rounded-lg cursor-pointer transition-colors ${currentComponent === 1 ? 'bg-primary3/10 text-primary1 font-medium border-r-4 border-primary1' : 'text-gray-700 hover:bg-gray-100'}`}>
          {t('personalInfo')}
        </div>

        <div onClick={() => handleCurrentPage(2)} className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-colors ${currentComponent === 2 ? 'bg-primary3/10 text-primary1 font-medium border-r-4 border-primary1' : 'text-gray-700 hover:bg-gray-100'}`}>
          {t('reservations')}
        </div>

        <div onClick={() => handleCurrentPage(3)} className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-colors ${currentComponent === 3 ? 'bg-primary3/10 text-primary1 font-medium border-r-4 border-primary1' : 'text-gray-700 hover:bg-gray-100'}`}>
          {t('messages')}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button onClick={() => setisOpenPopup(true)} className="w-full flex items-center justify-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          {t('logout')}
        </button>
      </div>

      {/* Logout Confirmation Popup */}
      <Popup title={t('logoutTitle')} isOpen={isOpenPopup} onClose={() => setisOpenPopup(false)} content={<LogoutPopup onClick={handleLogout} onClose={() => setisOpenPopup(false)} />} />
    </div>
  );
}
