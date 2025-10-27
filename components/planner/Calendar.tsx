
import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/Icons';

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysOfWeek = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    const monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];

    const today = new Date();
    
    // For simplicity, this calendar just shows the current week.
    // A full implementation would require more complex date logic.
    const startOfWeek = new Date(currentDate);
    const dayOfWeek = currentDate.getDay(); // 0 (Sun) to 6 (Sat)
    const diff = currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // adjust when day is sunday
    startOfWeek.setDate(diff);

    const weekDates = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        return date;
    });

    const goToPreviousWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7);
        setCurrentDate(newDate);
    }

    const goToNextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7);
        setCurrentDate(newDate);
    }


  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100 h-full">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h3 className="text-base md:text-lg font-bold text-slate-800">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex items-center gap-1 md:gap-2">
            <button onClick={goToPreviousWeek} className="p-1 md:p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors">
                <ChevronLeftIcon className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button onClick={goToNextWeek} className="p-1 md:p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors">
                <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5" />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2 text-center text-xs md:text-sm font-medium text-slate-500">
        {daysOfWeek.map(day => <div key={day} className="py-1">{day}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2 mt-2">
        {weekDates.map((date, i) => {
             const isToday = date.toDateString() === today.toDateString();
             const isCurrentMonth = date.getMonth() === currentDate.getMonth();

            return (
                <div key={i} className={`p-1 md:p-2 rounded-lg flex flex-col items-center justify-center aspect-square ${isCurrentMonth ? 'text-slate-800' : 'text-slate-400'}`}>
                   <span className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full text-xs md:text-sm ${isToday ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-md' : ''}`}>
                     {date.getDate()}
                   </span>
                </div>
            )
        })}
      </div>
      <div className="mt-4 md:mt-6 text-center text-slate-400 border-2 border-dashed rounded-lg py-8 md:py-10">
        <p className="text-xs md:text-sm">Kéo thả lộ trình vào đây để lên lịch.</p>
        <p className="text-xs mt-1">(Tính năng sắp ra mắt)</p>
      </div>
    </div>
  );
};

export default Calendar;
