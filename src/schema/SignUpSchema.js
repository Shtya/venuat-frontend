
import * as yup from 'yup'


export const SignUpSchema = yup.object({
  name: yup.string().required("errors.name"),
  phone: yup.string().required("errors.phone"),
  email: yup.string().email("errors.invalidEmail").required("errors.email"),
  password: yup.string().required("errors.password"),
})