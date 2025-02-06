import { ContactUsSchema } from '@/schema/ContactUsSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const hookContactUs = () => {
  const { register , trigger , handleSubmit,formState: { errors }, clearErrors, setError, getValues, setValue , watch, reset } = useForm({ resolver: yupResolver(ContactUsSchema) });

  const submit = handleSubmit(async data => {
    console.log(data)
  });

  return { register, errors , trigger , clearErrors, setError, getValues, setValue, submit , watch, reset };
};
