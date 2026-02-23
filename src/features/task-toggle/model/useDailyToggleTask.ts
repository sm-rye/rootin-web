import { useEffect, useRef, useState } from 'react';

import type { DailyStatus } from '@/entities/routine';
import dayjs from 'dayjs';

export default function useDailyToggleTask(
  daily_status: DailyStatus[] | undefined,
) {
  const today = dayjs().format('YYYY-MM-DD');
  const initializedRef = useRef(false);

  const [selectedDayTaskStaus, setSelectedDayTaskStaus] = useState<
    DailyStatus | undefined
  >();

  useEffect(() => {
    if (!daily_status) return;

    if (!initializedRef.current) {
      // 최초 1회만 today 기준으로 초기화
      const found = daily_status.find((d) => d.date === today);
      setSelectedDayTaskStaus(found ?? daily_status[daily_status.length - 1]);
      initializedRef.current = true;
      return;
    }

    // 이후에는 선택된 날짜를 유지하며 최신 데이터로 동기화
    const currentDate = selectedDayTaskStaus?.date;
    if (currentDate) {
      const updated = daily_status.find((d) => d.date === currentDate);
      if (updated) setSelectedDayTaskStaus(updated);
    }
  }, [daily_status]);

  return {
    selectedDayTaskStaus,
    setSelectedDayTaskStaus,
  };
}
