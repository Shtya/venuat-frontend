import * as yup from 'yup';

export const MyAccountSchema = step => {
    let schemaFields = {};

    if (step == 'info')
        schemaFields = {
            fullName: yup.string().optional(),
            phoneNumber: yup.string().optional(),
        };

    if (step == 'password')
        schemaFields = {
            currentPassword: yup.string().required('errors.currentPassword'),
            password: yup.string().required('errors.password').min(8, 'errors.passwordMinLength'),
            confirmPassword: yup.string().required('errors.confirmPassword').oneOf([yup.ref('password'), null], 'errors.passwordMismatch'),
        };

    return yup.object(schemaFields);
};
