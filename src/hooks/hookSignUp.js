import AxiosInstance from '@/config/Axios';
import { Notification } from '@/config/Notification';
import {  useSearchParams } from 'next/navigation';
import { SignUpSchema } from '@/schema/SignUpSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from '@/navigation';

export const hookSignUp = () => {
    const t = useTranslations();
    const {register,trigger,handleSubmit,formState: { errors },clearErrors,setError,getValues,setValue,watch,reset,} = useForm({ resolver: yupResolver(SignUpSchema) });
    const searchParams = useSearchParams();
    const router = useRouter();

    const [step, setstep] = useState(1);
    const [loading, setLoading] = useState(false);


    //! add in query parameters
    useEffect(() => {
        const queryStep = searchParams.get('step');
        if (queryStep && !isNaN(queryStep)) {
            setstep(Number(queryStep));
        }
    }, [searchParams]);

    const updateStepInURL = newStep => {
        const url = new URL(window.location.href);
        url.searchParams.set('step', newStep);
        window.history.pushState({}, '', url);
    };

    const handleStepChange = newStep => {
        setstep(newStep);
        updateStepInURL(newStep);
    };




    //! sign-up ( client )
    const submit = handleSubmit(async data => {
        setLoading(true);
        localStorage.setItem('email', data?.email);
        try {
            await AxiosInstance.post(`/auth/signup`, {
                full_name: data?.name,
                email: data?.email,
                password: data?.password,
                phone: data?.phone,
                role: 'user',
            }).then(res => {
                Notification(res.data?.message, 'success');
                setTimeout(() => {
                    setstep(2);
                    updateStepInURL(2);
                }, 1000);
            });
        } catch (error) {}
        setLoading(false);
    });


    //! resend the verification email
    const [loadingMsgGmail, setloadingMsgGmail] = useState(false);
    const resendGmailMsg = async () => {
        setloadingMsgGmail(true)
            const email = localStorage.getItem('email');
            if (!email) {
                Notification(t('email_is_missing'), 'error');
                return router.push('/sign-up/client?step=1');
            }

        try {
            await AxiosInstance.post(`/auth/resend-otp`, { email:  email }).then(res => {
                Notification(res.data?.message, 'success');
            });
        } catch (error) {}
        setloadingMsgGmail(false)
    };

    //! verify the OTP code
    const [loadingCheckOTP, setloadingCheckOTP] = useState(false);
    const CheckCodeOTP = async code => {
        if (code.join('').length < 6) return Notification(t('verification_must_be_6_digits'), 'error');
        setloadingCheckOTP(true);
        const email = localStorage.getItem('email');
        if (!email) {
            Notification(t('email_is_missing'), 'error');
            return router.push('/sign-up/client?step=1');
        }
        try {
            await AxiosInstance.post(`/auth/verify-otp`, { email: email, otp: code.join('') }).then(res => {
                Notification(res.data?.message, 'success');
                setTimeout(() => {
                    setstep(3);
                    updateStepInURL(3);
                }, 1000);
            });
        } catch (error) {}
        setloadingCheckOTP(false);
    };



    return { loadingMsgGmail , step, setstep, register, loading, errors, trigger, clearErrors, setError, getValues, setValue, submit, watch, reset, handleStepChange, resendGmailMsg, loadingCheckOTP, CheckCodeOTP, };
};
