import LoadingAuth from '@/components/atoms/loading/LoadingAuth';
import AxiosInstance from '@/config/Axios';
import { Notification } from '@/config/Notification';
import { translated } from '@/config/translateText';
import { useRouter } from '@/navigation';
import { providerSchema } from '@/schema/ProviderSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

export const hookProvider = () => {
    const [step, setstep] = useState(1);
    const searchParams = useSearchParams();
    const t = useTranslations()

    const { register, trigger, control, handleSubmit, formState: { errors }, clearErrors, setError, getValues, setValue, watch, reset, } = useForm({
        resolver: yupResolver(providerSchema(step)),
        defaultValues: { 
            services: [{ value: '', price: '' }], 
            equipment: [{ value: '', price: '', count: '' }] ,
            faqs: [{ answer: '', question: '' }] ,
            policies: [{ name: '', description: ''}] ,
        },
    });

    //! update the params
    useEffect(() => {
        const queryStep = searchParams.get('step');
        if (queryStep && !isNaN(queryStep)) setstep(Number(queryStep));
    }, [searchParams]);



    // Helper function to get the valid step from localStorage
    const getStoredStep = () => {
        return Number(localStorage.getItem("currentStep")) || 1;
    };

    useEffect(() => {
        const queryStep = Number(searchParams.get("step"));

        if (!isNaN(queryStep) && queryStep <= getStoredStep()) {
            setstep(queryStep);
        } else {
            updateStep(getStoredStep());
        }
    }, [searchParams , step]);

    const updateStep = (newStep) => {
        const url = new URL(window.location.href);
        url.searchParams.set("step", newStep);
        window.history.pushState({}, "", url);
    };

    const ChagneStep = async (newStep) => {
        await localStorage.setItem("currentStep", newStep);
        if (newStep <= getStoredStep()) {
            setstep(newStep);
            updateStep(newStep);
        }
    };

    const nextStep = () => {
        const next = step + 1;
        setstep(next);
        localStorage.setItem("currentStep", next);
        updateStep(next);
    };

    // Function to go back a step
    const previousStep = () => {
        if (step > 1) {
            const prev = step - 1;
            setstep(prev);
            updateStep(prev);
        }
    };








    //! get the id of sign-up
    const [loading, setloading] = useState(false);

    const [vendorId, setvendorId] = useState(null);
    const [venueId, setvenueId] = useState(null);
    const [user, setuser] = useState(null);
    useEffect(() => {
        setvendorId(JSON.parse(localStorage.getItem('providerId')));
        setvenueId(JSON.parse(localStorage.getItem('venueId')));
        setuser(JSON.parse(localStorage.getItem('user')));
    }, [step]);


    //! check if the user is logged pass this step
    useEffect(() => {
        if ( step == 1 && user) {
            localStorage.setItem('providerId', user?.id);
            nextStep(2)
        }
    }, [step , user]);

    //! sign up  
    const SignUp = async (data) => {
        const handleData = {
            full_name: data?.name,
            email: data?.email,
            password: data?.password,
            phone: data?.phone,
            role: 'vendor',
            status: 'active',
        };
    
        setloading(true);
    
        try {
            // Step 1: Sign up the user
            const signUpResponse = await AxiosInstance.post(`/auth/signup`, handleData);
            Notification(signUpResponse.data?.message, 'success');
            
            localStorage.setItem('providerId', JSON.stringify(signUpResponse?.data?.user?.id));
            
            // Step 2: Automatically sign in the user with the same credentials
            const signInData = {
                email: data?.email,
                password: data?.password,
            };
    
            const signInResponse = await AxiosInstance.post(`/auth/signin`, signInData);
            
            localStorage.setItem('user', JSON.stringify(signInResponse.data)); // Assuming the token is returned in the response
            localStorage.setItem('accessToken', signInResponse.data?.accessToken); 
            localStorage.setItem('refreshToken', signInResponse.data?.refreshToken); 
            
            ChagneStep(2);
        } catch (err) {
            Notification(err.response?.data?.message || 'An error occurred', 'error');
        } finally {
            setloading(false);
            setValue("name" , null )
        }
    };

    //! Create Property 
    const CreateProperty = async (data , step) => {
        setloading(true);
        const formData = new FormData();

        formData.append('vendor_id', vendorId);
        formData.append('city_id', data?.city_idGET?.id)
        if (data?.file) {
            formData.append('file', data.file); // Append the file object
        }
        const nameTranslation = await translated(data?.name);
        const descriptionTranslation = await translated(data?.description);

        formData.append('name[ar]', nameTranslation.ar); // Arabic name
        formData.append('name[en]', nameTranslation.en); // English name
        formData.append('description[ar]', descriptionTranslation.ar); // Arabic description
        formData.append('description[en]', descriptionTranslation.en); // English description



        await AxiosInstance.patch(`/users/${vendorId}`, {role : "vendor"} ).then(res => {}).catch(err => console.log(err))
        await AxiosInstance.post(`/properties`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then( async res => {
                await AxiosInstance.post(`/venues`, {property : +res?.data?.id })
                .then(res => { 
                    localStorage.setItem('venueId', res?.data?.id);
                    Notification( t("Created_Successfully") , "success" );
                    ChagneStep(step);
                })
                .catch(err => {});
            })
            .catch(err => {});
            
        setloading(false);
    };
    
    //! Update Venue
    const UpdateVenue = async (data , step) => {
        setloading(true);
        await AxiosInstance.put(`/venues/${venueId}`, data )
        .then(res => { 
            ChagneStep(step)  
        })
        .catch(err => {})
        .finally(()=> {
            setloading(false);
            setValue("name" , null)
        })
    };

    //! add service to the venue 

    const addServiceToVenue = async (data , step) => {
        setloading(true);
        await AxiosInstance.post(`/venues/${venueId}/add-services`, {services : data} )
        .then(res => { 
            ChagneStep(step)  
        })
        .catch(err => {});
        setloading(false);
    };
    
    
    //! add equipment to the venue
    const addEquipmentToVenue = async (data , step) => {
        setloading(true);
        await AxiosInstance.post(`/venue-equipment/${venueId}/add-equipments`, {equipments : data} )
        .then(res => { 
            ChagneStep(step)  
        })
        .catch(err => {});
        setloading(false);
    };

    //! add images to the venue 
    const uploadVenueImages = async (images , step) => {
        const formData = new FormData();
        formData.append("venue_id", venueId);
    
        images.forEach((image) => {
            formData.append(`files`, image.file); // رفع كل صورة
        });
    
        setloading(true);
    
        try {
            await AxiosInstance.post(`/venue-gallery`, formData, { headers: { "Content-Type": "multipart/form-data" } });
            Notification( t("uploadImgeSuccess") , "success");
            ChagneStep(step)  
        } 
        catch (err) {} 
        finally { setloading(false)  }
    };


    //! add faqs to the venue 
    const addFaqsToVenue = async (data , step) => {
        const DATA = await Promise.all(
            data.faqs.map(async (e) => ({
                venue_id: venueId,
                question: await translated(e.question),
                answer: await translated(e.answer), // Fixed to use `e.answer`
            }))
        );
        
        try {
            const res = await AxiosInstance.post(`/venue-faq` , DATA );
            ChagneStep(step)  
        } 
        catch (err) {} 
        finally { setloading(false)  }
    };


    //! add policies to the venue 
    const addPoliciesToVenue = async (data , step) => {
        const DATA = await Promise.all(
            data.policies.map(async (e) => ({
                name: await translated(e.name),
                description: await translated(e.description), 
            }))
        );
        
        await AxiosInstance.post(`/policies/bulks` , DATA ).then((res) =>{
            const ids = res?.data?.map(item => item.id);
            AxiosInstance.post(`/venues/${venueId}/add-policies` , {"policy_ids" : ids} )
            .then((res) =>{ })
            .catch((err) =>{})
            .finally(()=> {
                ChagneStep(step)  
                setloading(false)
            })

        }).catch(err => {})
    };


    const submit = handleSubmit(async data => {
        setloading(true);
        const {lat , lng} = data
        const dataInfoHall = {
            name :  await translated(data?.name),
            occasion : data?.occasionGET?.id ,
            responsiblePersonName : data?.responsiblePersonName ,
            nearestMainAddress : data?.nearestMainAddress ,
            email : data?.email ,
            phone : data?.phone ,
        }
        const dataInfoHall2 = {
            area : +data?.areaInMeters ,
            max_capacity : +data?.maxPeople ,
            min_capacity : +data?.minPeople ,
            opens_at  : data?.openingTime ,
            closes_at : data?.closingTime ,
            price : +data?.price ,
            description : await translated(data?.description) ,
        }

        step == 1 && (await SignUp(data));
        step == 2 && (await CreateProperty(data, 3));
        step == 3 && (await UpdateVenue({type_place : data?.type_place?.value}, 4));
        step == 4 && (await UpdateVenue({is_multi_place : data?.is_multi_place?.value}, 5));
        step == 5 && (await UpdateVenue( dataInfoHall , 6));

        step == 6 && (await UpdateVenue({ lat: +lat , lng: +lng }, 7));
        step == 7 && (await addServiceToVenue(data?.services, 8));
        step == 8 && (await addEquipmentToVenue(data?.equipment, 9));
        step == 9 && (await UpdateVenue( dataInfoHall2 , 10));

        step == 10 && (await uploadVenueImages(data?.images, 11));
        step == 11 && (await addFaqsToVenue(data, 12));
        step == 12 && (await addPoliciesToVenue(data, 13));
        step == 13 && (await UpdateVenue({acceptTerms : data?.acceptTerms}, 14));

    });

    const { fields, append, remove } = useFieldArray({ control, name: 'services' });
    const { fields: equipmentFields, append: appendEquipment, remove: removeEquipment } = useFieldArray({ control, name: 'equipment' });
    const { fields: faqsFields, append: appendfaqs, remove: removefaqs } = useFieldArray({ control, name: 'faqs' });
    const { fields: policiesFields, append: appendpolicies, remove: removepolicies } = useFieldArray({ control, name: 'policies' });

    return {policiesFields ,appendpolicies , removepolicies , faqsFields , appendfaqs , removefaqs , loading, previousStep , step, setstep, equipmentFields, appendEquipment, removeEquipment, fields, append, remove, register, errors, trigger, clearErrors, setError, getValues, setValue, submit, watch, reset };
};
