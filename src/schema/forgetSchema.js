import * as yup from 'yup';

export const forgetSchema = step => {
    let schemaFields = {};

    if (step == 1)
        schemaFields = {
            // name: yup.string().required('errors.name'),
            // phone: yup.string().required('errors.phone'),
            email: yup.string().email('errors.invalidEmail').required('errors.email'),
            // password: yup.string().required('errors.password'),
        };


    if (step == 3)
        schemaFields = {
            newPassword: yup.string().required('errors.password'),
            confirmPassword: yup.string().required('errors.password'),
        };

    return yup.object(schemaFields);
};
