import { forgetSchema } from '@/schema/forgetSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm , useFieldArray } from 'react-hook-form';

export const hookForgetPassword = () => {
  const { register , trigger , control , handleSubmit,formState: { errors }, clearErrors, setError, getValues, setValue , watch, reset } = useForm({ 
      resolver: yupResolver(forgetSchema) });


  const submit = handleSubmit(async data => {
    console.log(data)
  }); 
  return {register, errors , trigger , clearErrors, setError, getValues, setValue, submit , watch, reset };
};
