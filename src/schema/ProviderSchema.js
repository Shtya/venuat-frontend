import * as yup from 'yup';

export const providerSchema = step => {
    let schemaFields = {};

    if (step == 1)
        schemaFields = {
            name: yup.string().required('errors.name'),
            phone: yup.string().required('errors.phone'),
            email: yup.string().email('errors.invalidEmail').required('errors.email'),
            password: yup.string().required('errors.password'),
        };

    if (step == 2)
        schemaFields = {
            city_id: yup.string().required('validation.city.required'),
            name: yup.string().required('validation.name.required').min(3, 'validation.name.min').max(100, 'validation.name.max'),
            description: yup.string().required('validation.description.required').min(10, 'validation.description.min').max(500, 'validation.description.max'),
            file: yup
                .mixed()
                .required('validation.file.required')
                .test('fileType', 'validation.file.fileType', value => {
                    if (!value) return false;
                    const supportedFormats = ['image/jpeg', 'image/png', "image/svg+xml" , 'image/gif'];
                    return supportedFormats.includes(value.type);
                }),
        };

    if (step == 5)
        schemaFields = {
            name: yup.string().required('validation.name.required'),
            occasion: yup.string().required('errors.typeEvent'),
            responsiblePersonName: yup.string().required('errors.responsiblePersonName'),
            nearestMainAddress: yup.string().required('errors.nearestMainAddress'),
            email: yup.string().required('errors.email'),
            phone: yup.string().required('errors.phone'),
        };

    if (step == 6)
        schemaFields = {
            lat: yup.string().required('validation.location.required'),
        };

    if (step == 7)
        schemaFields = {
            services: yup.array().of(
                yup.object().shape({
                    service: yup.string().required('errors.name'),
                    count: yup.string().required('errors.countequipment'),
                    price: yup.string().required('errors.price'),
                }),
            ),
        };

    if (step == 8)
        schemaFields = {
            equipment: yup.array().of(
                yup.object().shape({
                    equipment_id: yup.string().required('errors.nameequipment'),
                    count: yup.string().required('errors.countequipment'),
                    price: yup.string().required('errors.price'),
                    price_per: yup.string().default('hour'),
                }),
            ),
        };

    if (step == 9)
        schemaFields = {
            areaInMeters: yup.string().required('errors.meter'),
            minPeople: yup.string().required('errors.minPeople'),
            maxPeople: yup.string().required('errors.maxPeople'),
            openingTime: yup.string().required('errors.openingTime'),
            closingTime: yup
                .string()
                .required('errors.closingTime')
                .test('is-after-opening', 'closeTimeMustAfterOpen', function (value) {
                    const { openingTime } = this.parent;
                    if (!openingTime || !value) return true;
                    return value > openingTime;
                }),
            price: yup.string().required('errors.price'),
            description: yup.string().required('errors.description'),
        };

    if (step === 10) {
        schemaFields = {
            images: yup.array().of(
                    yup.mixed().test('fileType', 'validation.file.fileType', value => {
                        return value && value?.file?.type.startsWith('image/');
                    }),
                ).min(1, 'atLeastOne'),
        };
    }

    return yup.object(schemaFields);
};

/**
 * {

  freeBreakfast  : yup.string().required("errors.freeBreakfast") ,
  parkingSpace  : yup.string().required("errors.parkingSpace") ,
  freeLunch  : yup.string().required("errors.freeLunch") ,
  kidsArea  : yup.string().required("errors.kidsArea") ,
  

  


  
  
}
   */
