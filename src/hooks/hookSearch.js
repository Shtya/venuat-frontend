import { searchSchema } from '@/schema/SearchSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';

export const hookSearch = () => {
  const { register , trigger , handleSubmit,formState: { errors }, clearErrors, setError, getValues, setValue , watch, reset } = useForm({ resolver: yupResolver(searchSchema) });

  const submit = handleSubmit(async data => {
    console.log(data)
  });

  return { register, errors , trigger , clearErrors, setError, getValues, setValue, submit , watch, reset };
};
