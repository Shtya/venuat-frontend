
import * as yup from 'yup'


export const addServiceSchema = yup.object({
  name  : yup.string().required("errors.name"),
  icon  : yup.string().required("errors.icon"),
  price : yup.string().required("errors.price"),
  count : yup.string().required("errors.count"),
})