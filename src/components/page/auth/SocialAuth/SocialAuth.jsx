import React, { useEffect } from 'react';
import { auth, googleProvider, facebookProvider, signInWithPopup } from '@/config/firebase';
import AxiosInstance from '@/config/Axios';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ImgApple, ImgFacebook, ImgGoogle } from '@/constants/imgs';

const SocialAuth = () => {
    const router = useRouter();
    const t = useTranslations();

    useEffect(() => {
        if (typeof window !== "undefined" && window.AppleID) {
            window.AppleID.auth.init({
                clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
                scope: "name email",
                redirectURI: process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI,
                usePopup: true,
            });
        }
    }, []);
    

    const handleSocialLogin = async (providerName) => {
        try {
            let provider;
            let token;

            if (providerName === 'google') {
                provider = googleProvider;
            } else if (providerName === 'facebook') {
                provider = facebookProvider;
            } else if (providerName === 'apple') {
                const response = await window.AppleID.auth.signIn();
                token = response.authorization.id_token;
            }

            if (provider) {
                const result = await signInWithPopup(auth, provider);
                token = await result.user.getIdToken();
            }

            AxiosInstance.post(`/auth/${providerName}-login`, { token })
                .then((res) => {
                    const { accessToken, refreshToken, ...user } = res.data;
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    localStorage.setItem('user', JSON.stringify(user));
                    router.push('/');
                })
                .catch((err) => {
                    console.error(`${providerName} Login Error:`, err?.response);
                });
        } catch (error) {
            console.error('Login Popup Error:', error);
        }
    };

    return (
        <div data-aos='fade-up'>
            <div className='h3 text-center my-[20px]'>{t('passWithSocial')}</div>
            <div className='flex items-center gap-[10px] justify-center'>

                <div onClick={() => handleSocialLogin('google')} className=' duration-300 w-[400px] h-[50px] border border-[#aaa/20] bg-gray-50 flex items-center justify-center shadow-sm hover:shadow-md rounded-[30px] cursor-pointer'>
                    {t("log-with-gmail")}
                    <Image src={ImgGoogle} alt='Google' width={25} height={25} />
                </div>
            </div>
        </div>
    );
};

export default SocialAuth;
