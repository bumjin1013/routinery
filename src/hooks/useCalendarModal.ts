import {useCallback} from "react";
import {Dayjs} from "dayjs";
import {useCalendar} from "./useCalendar";
import {useHabitStore} from "@/store/useHabitStore";

interface UseCalendarModalReturn {
  currentDate: Dayjs;
  selectedDate: Dayjs | null;
  setSelectedDate: (date: Dayjs | null) => void;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  handleDateSelect: (day: number) => void;
  handleConfirm: () => void;
  isConfirmDisabled: boolean;
}

export const useCalendarModal = (onClose: () => void): UseCalendarModalReturn => {
  const {currentDate, selectedDate, setSelectedDate, goToPreviousMonth, goToNextMonth} = useCalendar();
  const {setSelectedDate: setStoreSelectedDate} = useHabitStore();

  const handleDateSelect = useCallback(
    (day: number) => {
      const newSelectedDate = currentDate.date(day);
      setSelectedDate(newSelectedDate);
    },
    [currentDate, setSelectedDate],
  );

  const handleConfirm = useCallback(() => {
    if (selectedDate) {
      setStoreSelectedDate(selectedDate);
    }
    onClose();
  }, [selectedDate, setStoreSelectedDate, onClose]);

  const isConfirmDisabled = !selectedDate;

  return {
    currentDate,
    selectedDate,
    setSelectedDate,
    goToPreviousMonth,
    goToNextMonth,
    handleDateSelect,
    handleConfirm,
    isConfirmDisabled,
  };
};
