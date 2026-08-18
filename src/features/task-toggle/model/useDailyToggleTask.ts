import { useState } from 'react';

import type { DailyStatus } from '@/entities/routine';
import dayjs from 'dayjs';

export default function useDailyToggleTask(
  daily_status: DailyStatus[] | undefined,
) {
  const today = dayjs().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState<string>();
  const defaultStatus =
    daily_status?.find((status) => status.date === today) ??
    daily_status?.[daily_status.length - 1];
  const selectedDayTaskStaus =
    daily_status?.find((status) => status.date === selectedDate) ?? defaultStatus;

  const setSelectedDayTaskStaus = (status: DailyStatus | undefined) => {
    setSelectedDate(status?.date);
  };

  return {
    selectedDayTaskStaus,
    setSelectedDayTaskStaus,
  };
}
