import { providerSchema } from '@/schema/ProviderSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm , useFieldArray } from 'react-hook-form';

export const hookProvider = () => {
  const { register , trigger , control , handleSubmit,formState: { errors }, clearErrors, setError, getValues, setValue , watch, reset } = useForm({ 
      resolver: yupResolver(providerSchema) , 
      defaultValues:{ 
        services: [{ value: '', price: '' }] ,
        equipment: [{value : "" , price : "" , count : ""}],
        areaInMeters : "" ,
        minPeople : "" ,
        maxPeople : "" ,
        openingTime : "" ,
        closingTime : "" ,
        price : "" ,
      }});

  const { fields, append, remove } = useFieldArray({ control, name: 'services' });
  const { fields: equipmentFields, append: appendEquipment , remove: removeEquipment } = useFieldArray({control, name: 'equipment' });

  const submit = handleSubmit(async data => {
    console.log(data)
  }); 
  return {equipmentFields , appendEquipment , removeEquipment , fields, append, remove , register, errors , trigger , clearErrors, setError, getValues, setValue, submit , watch, reset };
};
