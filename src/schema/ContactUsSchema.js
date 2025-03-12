
import * as yup from 'yup'


export const ContactUsSchema = yup.object({
  email: yup.string().email("errors.invalidEmail").required("errors.email"),
  fullName: yup.string().required("errors.name"),
  message: yup.string().required("errors.message"),
  phone: yup.string().required("errors.phone"),
})