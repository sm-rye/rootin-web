import { useEffect, useState } from 'react';

import type { DailyStatus } from '@/entities/routine';
import dayjs from 'dayjs';

export default function useDailyToggleTask(
  daily_status: DailyStatus[] | undefined,
) {
  const today = dayjs().format('YYYY-MM-DD');

  const [selectedDayTaskStaus, setSelectedDayTaskStaus] = useState<
    DailyStatus | undefined
  >();

  useEffect(() => {
    if (daily_status) {
      // error 아마 수정 해야할 듯
      // 사유는 daily_status가 변경될 때마다 today로 리셋되지 않나..?

      const matchData = selectedDayTaskStaus?.date || today;
      const found = daily_status.find((d) => d.date === matchData);
      setSelectedDayTaskStaus(
        found ?? daily_status[daily_status.length - 1],
      );
    }
  }, [daily_status]);

  return {
    selectedDayTaskStaus,
    setSelectedDayTaskStaus,
  };
}
