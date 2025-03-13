import AxiosInstance from '@/config/Axios';
import { Notification } from '@/config/Notification';
import {  useSearchParams } from 'next/navigation';
import { SignUpSchema } from '@/schema/SignUpSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from '@/navigation';
import { forgetSchema } from '@/schema/forgetSchema';

export const hookForgetPassword = () => {
    const t = useTranslations();
    const [step, setstep] = useState(1);


    const {register,trigger,handleSubmit,formState: { errors },clearErrors,setError,getValues,setValue,watch,reset,} = useForm({ resolver: yupResolver(forgetSchema(step)) });
    const router = useRouter();

    const getStoredStep = () =>  Number(localStorage.getItem("currentStep-forget")) || 1;
    const ChagneStep = async (newStep) => {
        localStorage.setItem("currentStep-forget", newStep);
        if (newStep <= getStoredStep()) {
            setstep(newStep);
        }
    };



    //! resend the verification email

    const resendGmailMsg = async () => {
            const email = localStorage.getItem('email');
            if (!email) {
                Notification(t('email_is_missing'), 'error');
                ChagneStep(1)
            }

        try {
            await AxiosInstance.post(`/auth/resend-forgot-password-otp`, { email:  email }).then(res => {
                Notification(res.data?.message, 'success');
            });
        } catch (error) {}

    };

    //! verify the OTP code

    const CheckCodeOTP = async code => {
        if (code.join('').length < 6) return Notification(t('verification_must_be_6_digits'), 'error');
        setLoading(true);
        const email = localStorage.getItem('email');
        if (!email) {
            Notification(t('email_is_missing'), 'error');
            ChagneStep(1)
        }
        try {
            await AxiosInstance.post(`/auth/check-otp`, { email: email, otp: code.join('') }).then(res => {
                Notification(res.data?.message, 'success');
                localStorage.setItem("code" , code.join('')  )
                ChagneStep(3);
            });
        } catch (error) {}
        setLoading(false);
    };


    //! post to  ( /auth/forgot-password )
    const ForgetPassword = (data)=> {
        AxiosInstance.post(`/auth/forgot-password`, { email: data?.email})
        .then(res => {
            Notification(res.data?.message, 'success');
            localStorage.setItem("email" , data?.email )
            ChagneStep(2)
        })

        .catch(err => {})
        .finally(()=> { setLoading(false) })
    }


    const EnterPassword = (data)=> {
        const handleData = {
            email : localStorage.getItem("email"),
            otp : localStorage.getItem("code"),
            newPassword : data?.newPassword ,
            confirmPassword : data?.confirmPassword ,
        } 

        
        AxiosInstance.post(`/auth/reset-password`, handleData)
        .then(res => {
            Notification(res.data?.message, 'success');
            router.push("/sign-in")
        })

        .catch(err => {})
        .finally(()=> { setLoading(false) })

    }


    const [loading, setLoading] = useState(false);

    const submit = handleSubmit(async data => {
        setLoading(true);
        step == 1 && (await ForgetPassword(data)); 
        step == 3 && (await EnterPassword(data)); 
    })
    



    return {  register, step , loading, errors, setstep, CheckCodeOTP , resendGmailMsg, getValues, setValue, submit, watch, reset,  };
};
