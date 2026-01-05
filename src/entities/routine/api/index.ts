import api from '@/lib/axios';

const ROUTINES = '/routines';

export const getAllRoutines = async () => {
  try {
    const res = await api.get(`${ROUTINES}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getRoutineDetail = async (id: string) => {
  try {
    const res = await api.get(`${ROUTINES}/:${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
