import { SignInSchema } from '@/schema/SignInSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const hookSignIn = () => {
  const { register , trigger , handleSubmit,formState: { errors }, clearErrors, setError, getValues, setValue , watch, reset } = useForm({ resolver: yupResolver(SignInSchema) });

  const submit = handleSubmit(async data => {
    console.log(data)
  });

  return { register, errors , trigger , clearErrors, setError, getValues, setValue, submit , watch, reset };
};
