
import * as yup from 'yup';

export const ReservationSchema = ({ endDate }) => {
  return yup.object({
    check_in: yup
      .date()
      .required("reservation-error1"),

    check_out: yup
      .date()
      .required("reservation-error2")
      .min(yup.ref('check_in'), "reservation-error3")
      .when([], {
        is: () => !!endDate,
        then: (schema) => schema.max(new Date(endDate), "reservation-error4"),
      }),

  });
};
