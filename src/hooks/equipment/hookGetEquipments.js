import AxiosInstance from '@/config/Axios';
import { useGlobalContext } from '@/context/GlobalContext';
import { useEffect, useState } from 'react';

export const hookGetEquipments = () => {
    const {checkEndpoint} = useGlobalContext()
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setErrorState] = useState(null);

  const fetchServices = async () => {
    setLoading(true)
    try {
          const response = await AxiosInstance.get(`/equipment/global-and-user?limit=1000`);
          setEquipments(response.data);

      } catch (error) {
          setErrorState(error.message || 'Failed to load venues');
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      fetchServices();
  }, [checkEndpoint]);



  return {equipments , loading };
};
