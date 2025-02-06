
import * as yup from 'yup'


export const searchSchema = yup.object({
  date: yup.string().required("errors.date"),
  city: yup.string().required("errors.city"),
  visitor: yup.string().required("errors.veistor"),
  typeEvent: yup.string().required("errors.typeEvent"),
})