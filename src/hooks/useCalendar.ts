import {useState} from "react";
import dayjs, {Dayjs} from "dayjs";

interface UseCalendarReturn {
  currentDate: Dayjs;
  selectedDate: Dayjs | null;
  setSelectedDate: (date: Dayjs | null) => void;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
}

export const useCalendar = (initialDate?: Dayjs): UseCalendarReturn => {
  const [currentDate, setCurrentDate] = useState(initialDate || dayjs());
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const goToPreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month").startOf("month"));
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month").startOf("month"));
  };

  return {
    currentDate,
    selectedDate,
    setSelectedDate,
    goToPreviousMonth,
    goToNextMonth,
  };
};
