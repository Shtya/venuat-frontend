import AxiosInstance from '@/config/Axios';
import { useGlobalContext } from '@/context/GlobalContext';
import { useEffect, useState } from 'react';

export const hookServices = () => {

  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setErrorState] = useState(null);
  const {changeListen} = useGlobalContext()


  const fetchServices = async () => {
    setLoading(true)
    try {
          const response = await AxiosInstance.get(`/services/global-and-user?limit=10000`);
          setService(response.data);

      } catch (error) {
          setErrorState(error.message || 'Failed to load venues');
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      fetchServices();
  }, [changeListen]);



  return {service , loading };
};
