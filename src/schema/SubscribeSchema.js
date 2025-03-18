
import * as yup from 'yup'


export const SubscribeSchema = yup.object({
  subscribe: yup.string().email("errors.invalidEmail").required("errors.email"),
})