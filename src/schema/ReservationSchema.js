import * as yup from 'yup';

export const ReservationSchema = ({ startDate, endDate }) => {

  if(!startDate || !endDate) return
  return yup.object({
    check_in: yup
      .date()
      .required("checkinDate")
      .min(new Date(startDate), "checkinDateBeforeStart"),
    check_out: yup
      .date()
      .required("checkoutDate")
      .min(yup.ref('check_in'), "checkoutDateAfterCheckin")
      .max(new Date(endDate), "checkoutDateAfterEnd"),


      from_time: yup.string().required("fromTime"),
  to_time: yup.string().required("toTime")
    .test("is-after", "toTimeAfterFromTime", function (value) {
      return new Date(`1970-01-01T${value}`) > new Date(`1970-01-01T${this.parent.from_time}`);
    }),

  });
};
