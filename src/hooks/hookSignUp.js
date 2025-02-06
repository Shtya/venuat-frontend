import { SignUpSchema } from '@/schema/SignUpSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const hookSignUp = () => {
  const { register , trigger , handleSubmit,formState: { errors }, clearErrors, setError, getValues, setValue , watch, reset } = useForm({ resolver: yupResolver(SignUpSchema) });

  const submit = handleSubmit(async data => {
    console.log(data)
  });

  return { register, errors , trigger , clearErrors, setError, getValues, setValue, submit , watch, reset };
};
