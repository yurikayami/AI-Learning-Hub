
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
    <div className="bg-white p-6 rounded-xl shadow-sm h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex items-center gap-2">
            <button onClick={goToPreviousWeek} className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors">
                <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button onClick={goToNextWeek} className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors">
                <ChevronRightIcon className="w-5 h-5" />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-slate-500">
        {daysOfWeek.map(day => <div key={day}>{day}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-2 mt-2">
        {weekDates.map((date, i) => {
             const isToday = date.toDateString() === today.toDateString();
             const isCurrentMonth = date.getMonth() === currentDate.getMonth();

            return (
                <div key={i} className={`p-2 rounded-lg flex flex-col items-center justify-center aspect-square ${isCurrentMonth ? 'text-slate-800' : 'text-slate-400'}`}>
                   <span className={`w-8 h-8 flex items-center justify-center rounded-full ${isToday ? 'bg-indigo-600 text-white font-bold' : ''}`}>
                     {date.getDate()}
                   </span>
                </div>
            )
        })}
      </div>
      <div className="mt-6 text-center text-slate-400 border-2 border-dashed rounded-lg py-10">
        <p>Kéo thả lộ trình vào đây để lên lịch.</p>
        <p className="text-xs">(Tính năng sắp ra mắt)</p>
      </div>
    </div>
  );
};

export default Calendar;
