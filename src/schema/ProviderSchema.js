
import * as yup from 'yup'


export const providerSchema = yup.object({
  hallName              : yup.string().required("errors.hallName") ,
  eventType             : yup.string().required("errors.eventType") ,
  responsiblePersonName : yup.string().required("errors.responsiblePersonName") ,
  nearestMainAddress    : yup.string().required("errors.nearestMainAddress") ,
  email                 : yup.string().email("errors.invalidEmail").required("errors.email") ,
  phoneNumber           :  yup.string().required("errors.phoneNumber"),

  freeBreakfast  : yup.string().required("errors.freeBreakfast") ,
  parkingSpace  : yup.string().required("errors.parkingSpace") ,
  freeLunch  : yup.string().required("errors.freeLunch") ,
  kidsArea  : yup.string().required("errors.kidsArea") ,
  

  areaInMeters : yup.string().required("errors.meter"),
  minPeople    : yup.string().required("errors.minPeople"),
  maxPeople    : yup.string().required("errors.maxPeople"),
  openingTime  : yup.string().required("errors.openingTime"),
  closingTime  : yup.string().required("errors.closingTime"),
  price        : yup.string().required("errors.price"),


  equipment: yup.array().of(
    yup.object().shape({
      value: yup.string().required('errors.nameequipment'),
      count: yup.string().required('errors.countequipment'),
      price: yup.string().required('errors.price'),
    })
  ),
  services: yup.array().of(
    yup.object().shape({
      value: yup.string().required('errors.name'),
      price: yup.string().required('errors.price'),
    })
  ),
})