import ProgressSteps from '@/components/atoms/progress/ProgressSteps';
import RadioLabel from '@/components/atoms/radio/RadioLabel';
import { CountPlaceData, PlaceData  } from '@/Dummy/dummy';
import { hookProvider } from '@/hooks/hookProvider';
import React  from 'react';
import Answer from './Answer';
import MapComponent from './Map';
 import SelectServices from './SelectServices';
import InformationAboutHall from './InformationAboutHall';
import AddFaqs from './AddFaqs';
import GalleryHall from './GallaryHall';
import SelectEqupment from './AddEqupment';
import Finish from './Finish';
import AcceptConditions from './AcceptConditions';
import CircularProgressBar from '@/components/atoms/progress/CircularProgressBar';
import StepSignUp from './StepSign-up';
import CreateProperty from './CreateProperty';
import AddPolicies from './AddPolicies';

export default function AccountProvider() {
    const totalSteps = 14
    const {policiesFields , appendpolicies , removepolicies , faqsFields , appendfaqs , removefaqs , loading, step , previousStep , setstep , register, errors, fields, append, remove, trigger, clearErrors, getValues, setValue, submit, watch , equipmentFields, appendEquipment, removeEquipment } = hookProvider();
    const valPlace = watch('type_place');


    
    return (
        <div className=''>
            <ProgressSteps currentStep={step} setCurrentStep={setstep} totalSteps={totalSteps} />

            {step == 1 && <StepSignUp setValue={setValue} loading={loading} errors={errors} register={register} submit={submit} /> }
            {step == 2 && <CreateProperty previousStep={previousStep} title='createPropertyButton' trigger={trigger} submit={submit} register={register} errors={errors} watch={watch}  loading={loading}  setValue={setValue} />}

            {step == 3 && <RadioLabel previousStep={previousStep} loading={loading} submit={submit} title='placeTitle' watch={watch} getValues={getValues} KEY={'type_place'}     data={PlaceData} step={step} setValue={setValue} />}
            {step == 4 && <RadioLabel previousStep={previousStep} loading={loading} submit={submit} title={valPlace?.value == 'hall' ? 'hallTitle'  : "hotelTitle"} watch={watch} getValues={getValues} KEY={'is_multi_place'}  data={valPlace?.value == 'hall' ? CountPlaceData[0] : CountPlaceData[1]} step={step} setValue={setValue} />}
            
            
            {step == 5 && <Answer       previousStep={previousStep} loading={loading} submit={submit}  setValue={setValue} watch={watch} trigger={trigger} errors={errors} register={register} getValues={getValues} />}
            {step == 6 && <MapComponent previousStep={previousStep} loading={loading} submit={submit}  setValue={setValue} watch={watch} trigger={trigger} errors={errors} register={register} clearErrors={clearErrors}  />}
            
            {/* {step == 60 && <Services watch={watch} KEY='SERVICES' clearErrors={clearErrors} errors={errors} trigger={trigger} submit={submit} getValues={getValues} data={ServicesData} setstep={setstep} step={step} setValue={setValue} />} */}
            
            {step == 7 && <SelectServices       previousStep={previousStep} loading={loading} clearErrors={clearErrors} watch={watch} fields={fields} append={append} remove={remove} register={register} errors={errors} trigger={trigger} submit={submit} setValue={setValue} />}
            {step == 8 && <SelectEqupment       previousStep={previousStep} loading={loading} clearErrors={clearErrors} watch={watch} fields={equipmentFields} append={appendEquipment} remove={removeEquipment} register={register} errors={errors} trigger={trigger} submit={submit}  setValue={setValue} />}
            {step == 9 && <InformationAboutHall previousStep={previousStep} loading={loading} watch={watch}  register={register} errors={errors} trigger={trigger} submit={submit}  setValue={setValue} />}

            
            {step == 10 && <GalleryHall      previousStep={previousStep} loading={loading}  KEY='images' watch={watch} errors={errors} trigger={trigger} submit={submit} getValues={getValues} setValue={setValue} />}
            
            {step == 11 && <AddFaqs      previousStep={previousStep} loading={loading} clearErrors={clearErrors} watch={watch} fields={faqsFields} append={appendfaqs} remove={removefaqs} register={register} errors={errors} trigger={trigger} submit={submit} setValue={setValue} />}
            {step == 12 && <AddPolicies  previousStep={previousStep} loading={loading} clearErrors={clearErrors} watch={watch} fields={policiesFields} append={appendpolicies} remove={removepolicies} register={register} errors={errors} trigger={trigger} submit={submit} setValue={setValue} />}
            {step == 13 && <AcceptConditions previousStep={previousStep} loading={loading}  watch={watch}  register={register} submit={submit} setValue={setValue} />}
            
            {step == 14 && <Finish  />}

            <CircularProgressBar percent={Math.ceil(((step - 1)  / (totalSteps-1)) * 100)} />
        </div>
    );
}
