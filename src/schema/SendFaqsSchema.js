
import * as yup from 'yup'


export const SendFaqsSchema = yup.object({
  msg: yup.string().required("errors.message"),
})