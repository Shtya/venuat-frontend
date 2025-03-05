import * as yup from 'yup';

export const ReservationSchema = yup.object({
  check_in: yup.date().required("checkinDate"),
  check_out: yup.date().required("checkoutDate").min(yup.ref('check_in'), "checkoutDateAfterCheckin"),
  from_time: yup.string().required("fromTime"),
  to_time: yup.string().required("toTime")
    .test("is-after", "toTimeAfterFromTime", function (value) {
      return new Date(`1970-01-01T${value}`) > new Date(`1970-01-01T${this.parent.from_time}`);
    }),
});


