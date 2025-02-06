
import * as yup from 'yup'


export const SignInSchema = yup.object({
  email: yup.string().email("errors.invalidEmail").required("errors.email"),
  password: yup.string().required("errors.password"),
})