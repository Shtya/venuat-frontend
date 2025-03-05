import { useState, useEffect } from 'react';
import AxiosInstance from '@/config/Axios';
import { useForm } from 'react-hook-form';
import { ContactUsSchema } from '@/schema/ContactUsSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { MyAccountSchema } from '@/schema/MyAccountSchema';
import { hookUser } from './hookUser';
import { Notification } from '@/config/Notification';
import { useTranslations } from 'next-intl';

export const hookMyAccount = () => {
    const t = useTranslations();
    const [stepName, setStepName] = useState();
    const { register, trigger, handleSubmit, formState: { errors }, clearErrors, setError, getValues, setValue, watch, reset, } = useForm({ resolver: yupResolver(MyAccountSchema(stepName)) });
    const { user } = hookUser();

    const [loadingInfo, setLoadingInfo] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);

    const SubmitStep = async stepName => {
        await setStepName(stepName);
    };

    const submit = handleSubmit(async data => {
        const passwordData = {
            email: user?.email,
            currentPassword: data?.currentPassword,
            newPassword: data?.password,
            confirmPassword: data?.confirmPassword,
        };
        const infoData = {
            full_name: data?.full_name,
            phone: data?.phone_number,
        };

        
        if (stepName == 'info') {
            setLoadingInfo(true);
            if (data?.full_name === user?.full_name)  delete infoData.full_name;
            if (data?.phone_number === user?.phone)  delete infoData.phone;
            await AxiosInstance.patch(`/users/${user?.id}`, infoData)
                .then(res => {
                    Notification(t('account_update_confirmation'), 'success');
                })
                .catch(err => console.log(err));
            setLoadingInfo(false);
        }

        if (stepName == 'password') {
            setLoadingPassword(true);
            await AxiosInstance.post(`/auth/reset-password`, passwordData)
                .then(res => {
                    Notification(res?.data?.message, 'success');
                })
                .catch(err => console.log(err));
            setLoadingPassword(false);
        }

        setStepName(null);
    });

    useEffect(() => {
        if (stepName) submit();
    }, [stepName]);

    const [getMe, setGetMe] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setErrorState] = useState(null);

    const fetchVenues = async () => {
        try {
            const response = await AxiosInstance.get('/users/me');
            setGetMe(response.data);
        } catch (error) {
            setErrorState(error.message || 'Failed to load venues');
        } finally {
            setLoading(false);
        }
    };



    //! FAQs ...........................................
    const [faqs, setfaqs] = useState();
    const [loadingfaqs, setLoadingfaqs] = useState(true);

    const fetchfaqs = async () => {
        try {
            const response = await AxiosInstance.get(`venue-faq/questions-user?field:user_id=${user?.id}`);
            setfaqs(response.data.data);

        } catch (error) {
            setErrorState(error.message || 'Failed to load faqss');
        } finally {
            setLoadingfaqs(false);
        }
    };

    useEffect(() => {
        if(user) fetchfaqs()
    }, [user]);

    useEffect(() => {
        fetchVenues();
    }, []);

    return {faqs , loadingfaqs , loadingInfo, user, loadingPassword, register, errors, getValues, setValue, SubmitStep, watch, getMe, loading, error };
};
