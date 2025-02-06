import ProgressSteps from '@/components/atoms/progress/ProgressSteps';
import RadioLabel from '@/components/atoms/radio/RadioLabel';
import { CountPlaceData, PlaceData, ServicesData } from '@/Dummy/dummy';
import { hookProvider } from '@/hooks/hookProvider';
import React, { useState } from 'react';
import Answer from './Answer';
import MapComponent from './Map';
import Services from './Services';
import SelectServices from './SelectServices';
import InformationAboutHall from './InformationAboutHall';
import DetailsAboutHall from './DetailsAboutHall';
import GalleryHall from './GallaryHall';
import AddEqupment from './AddEqupment';
import Finish from './Finish';
import AcceptConditions from './AcceptConditions';
import CircularProgressBar from '@/components/atoms/progress/CircularProgressBar';
import StepSignUp from './StepSign-up';

export default function StepsProvider() {
    const [step, setstep] = useState(0);
    const { register, errors, fields, append, remove, trigger, clearErrors, setError, getValues, setValue, submit, watch, reset, equipmentFields, appendEquipment, removeEquipment } = hookProvider();

    const valPlace = watch('place');

    return (
        <div className='  '>
            <ProgressSteps currentStep={step} setCurrentStep={setstep} totalSteps={12} />

            {step == 0 && <StepSignUp error={errors}register={register}setstep={setstep} /> }

            {step == 1 && <RadioLabel title='placeTitle' watch={watch} getValues={getValues} KEY={'place'} setstep={setstep} data={PlaceData} step={step} setValue={setValue} />}
            {step == 2 && <RadioLabel title='hallTitle' watch={watch} getValues={getValues} KEY={'countHalls'} setstep={setstep} data={valPlace == 'halls' ? CountPlaceData[0] : CountPlaceData[1]} step={step} setValue={setValue} />}
            {step == 3 && <Answer clearErrors={clearErrors} submit={submit} getValues={getValues} setstep={setstep} step={step} setValue={setValue} watch={watch} trigger={trigger} errors={errors} register={register} />}
            {step == 4 && <MapComponent submit={submit} getValues={getValues} setstep={setstep} step={step} setValue={setValue} watch={watch} trigger={trigger} errors={errors} register={register} />}
            {step == 5 && <Services watch={watch} KEY='SERVICES' clearErrors={clearErrors} errors={errors} trigger={trigger} submit={submit} getValues={getValues} data={ServicesData} setstep={setstep} step={step} setValue={setValue} />}
            {step == 6 && <SelectServices clearErrors={clearErrors} watch={watch} fields={fields} append={append} remove={remove} register={register} errors={errors} trigger={trigger} submit={submit} getValues={getValues} data={ServicesData} setstep={setstep} step={step} setValue={setValue} />}
            {step == 7 && <AddEqupment clearErrors={clearErrors} watch={watch} fields={equipmentFields} append={appendEquipment} remove={removeEquipment} register={register} errors={errors} trigger={trigger} submit={submit} getValues={getValues} data={ServicesData} setstep={setstep} step={step} setValue={setValue} />}
            {step == 8 && <InformationAboutHall clearErrors={clearErrors} watch={watch} fields={fields} append={append} remove={remove} register={register} errors={errors} trigger={trigger} submit={submit} getValues={getValues} data={ServicesData} setstep={setstep} step={step} setValue={setValue} />}
            {step == 9 && <DetailsAboutHall watch={watch} fields={fields} append={append} remove={remove} register={register} errors={errors} trigger={trigger} submit={submit} getValues={getValues} data={ServicesData} setstep={setstep} step={step} setValue={setValue} />}
            {step == 10 && <GalleryHall KEY='imgsGallery' watch={watch} fields={fields} append={append} remove={remove} register={register} errors={errors} trigger={trigger} submit={submit} getValues={getValues} data={ServicesData} setstep={setstep} step={step} setValue={setValue} />}
            {step == 11  && <AcceptConditions KEY='accetpCondition' watch={watch} fields={fields} append={append} remove={remove} register={register} errors={errors} trigger={trigger} submit={submit} getValues={getValues} data={ServicesData} setstep={setstep} step={step} setValue={setValue} />}
            {step == 12  && <Finish watch={watch} fields={fields} append={append} remove={remove} register={register} errors={errors} trigger={trigger} submit={submit} getValues={getValues} data={ServicesData} setstep={setstep} step={step} setValue={setValue} />}

            <CircularProgressBar percent={Math.ceil((step / 11) * 100)} />
        </div>
    );
}
