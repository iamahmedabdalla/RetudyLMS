import React from 'react';
import 'antd/dist/antd.css';
import { Badge, Calendar } from 'antd';

const CalendarPage = () => {
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
      };

  return (
    <>
        <Calendar onPanelChange={onPanelChange} />
    </>
  )
}

export default CalendarPage

{/* <div className="flex flex-col p-4 dark:text-white bg-white dark:border dark:border-sky-500 dark:bg-slate-900 rounded-lg shadow-lg">
        <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-center">
                <div className="flex flex-row justify-center items-center bg-sky-500 dark:bg-sky-500 rounded-lg w-10 h-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
                <h1 className="text-xl font-bold ml-4">December 2021</h1>
            </div>
            <div className="flex flex-row justify-center items-center">
                <div className="flex flex-row justify-center items-center bg-sky-500 dark:bg-sky-500 rounded-lg w-10 h-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
        <div className="flex flex-row justify-between items-center mt-4">
            <div className="flex flex-row justify-center items-center">
                <h1 className="text-md font-bold">S</h1>
            </div>
            <div className="flex flex-row justify-center items-center">
                <h1 className="text-md font-bold">M</h1>
            </div>
            <div className="flex flex-row justify-center items-center">
                <h1 className="text-md font-bold">T</h1>
            </div>
            <div className="flex flex-row justify-center items-center">
                <h1 className="text-md font-bold">W</h1>
            </div>
            <div className="flex flex-row justify-center items-center">
                <h1 className="text-md font-bold">T</h1>
            </div>
            <div className="flex flex-row justify-center items-center">
                <h1 className="text-md font-bold">F</h1>
            </div>
            <div className="flex flex-row justify-center items-center">
                <h1 className="text-md font-bold">S</h1>
            </div>
        </div>
        <div className="flex flex-row justify-between items-center mt-4">
            <div className="flex flex-row justify-center items-center">
                <h1 className="text-md font-bold">1</h1>
            </div>
            <div className="flex flex-row justify-center items-center">
                <h1 className="text-md font-bold">2</h1>
            </div>
            <div className="flex flex-row justify-center items-center">
                <h1 className="text-md font-bold">3</h1>
            </div>
            <div className="flex flex-row justify-center items-center">
                <h1 className="text-md font-bold">4</h1>
            </div>
            <div className="flex flex-row justify-center items-center">
                <h1 className="text-md font-bold">5</h1>
            </div>
            <div className="flex flex-row justify-center items-center">
                <h1 className="text-md font-bold">6</h1>
            </div>
            <div className="flex flex-row justify-center items-center">
                <h1 className="text-md font-bold">7</h1>
            </div>
        </div>
        <div className="flex flex-row justify-between items-center mt-4">
            <div className="flex flex-row justify-center items-center">
                <h1 className="text-md font-bold">8</h1>
            </div>
        </div>

    </div> */}