import AxiosInstance from '@/config/Axios';
import { useEffect, useState } from 'react';

export const hookOccasion = () => {

  const [occasion, setOccasion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setErrorState] = useState(null);

  const fetchOccasion = async () => {
    setLoading(true)
    try {
          const response = await AxiosInstance.get(`/occasion-type/on-venues`);
          setOccasion(response.data);

      } catch (error) {
          setErrorState(error.message || 'Failed to load venues');
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      fetchOccasion();
  }, []);



  return {occasion , loadingOccasion:loading };
};
