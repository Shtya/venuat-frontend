// components/SocialAuth.js
import { useState } from 'react';
import { auth, googleProvider, facebookProvider, appleProvider } from '@/config/firebase';
import { signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import { ImgApple, ImgFacebook, ImgGoogle } from '@/constants/imgs';
import { useTranslations } from 'next-intl';
import AxiosInstance from '@/config/Axios';


const SocialAuth = () => {
    const [error, setError] = useState(null);
    const t = useTranslations()

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const token = await result.user.getIdToken();


            const response = AxiosInstance.post(`/auth/firebase-signin`, {token : JSON.stringify({ token })}   )
            const data = await response 
            console.log('User data from backend:', data);
        } catch (error) {
            setError(error.message);
        }
    };
    
    
    const handleGoogleRegister = async () => {
        try {
          // Sign in with the selected provider (Google, Facebook, Apple)
          const result = await signInWithPopup(auth, googleProvider);
      
          // Get the Firebase ID token
          const token = await result.user.getIdToken();
      
          // Send the token to the NestJS backend for registration
          const response = await AxiosInstance.post('/auth/firebase-register', { token });
      
          // Log the response from the backend
          console.log('User data from backend:', response.data);
      
          // Handle successful registration (e.g., redirect or show success message)
          if (response.data.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
      
            // Redirect the user to the dashboard or home page
            window.location.href = '/dashboard';
          }
        } catch (error) {
          // Handle errors
          setError(error.message || 'An error occurred during registration.');
          console.error('Error during social registration:', error);
        }
      };

    return (
        <div data-aos="fade-up" >
            {/* <div className='h3 text-center my-[20px]'>{t('passWithSocial')}</div> */}
            <div className='flex items-center gap-[10px] justify-center'>
                {/* <div className='w-[40px] h-[40px] bg-gray-50 flex items-center justify-center shadow-md rounded-[50%] cursor-pointer' onClick={() => handleSocialSignIn(appleProvider)}>
                    <Image src={ImgApple} alt='Apple' width={25} height={25} />
                </div>
                <div className='w-[40px] h-[40px] bg-gray-50 flex items-center justify-center shadow-md rounded-[50%] cursor-pointer' onClick={() => handleSocialSignIn(facebookProvider)}>
                    <Image src={ImgFacebook} alt='Facebook' width={25} height={25} />
                </div>
                <div className='w-[40px] h-[40px] bg-gray-50 flex items-center justify-center shadow-md rounded-[50%] cursor-pointer' onClick={() => handleSocialSignIn(googleProvider)}>
                    <Image src={ImgGoogle} alt='Google' width={25} height={25} />
                </div> */}


                {/* <div onClick={()=> handleSocialSignIn(googleProvider)} > sign in google </div>
                <div onClick={()=> handleSocialRegister(googleProvider)} > register google </div> */}

                {/* <button onClick={handleGoogleSignIn}>Sign in with Google</button>
                <button onClick={handleGoogleRegister}>Register with Google</button> */}

            </div>
            {/* {error && <p className='text-red-500 text-center mt-4'>{error}</p>} */}
        </div>
    );
};

export default SocialAuth;
