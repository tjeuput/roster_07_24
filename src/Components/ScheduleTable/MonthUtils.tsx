import React from 'react';
import {Month, Days} from './Months';


export const renderMonthDays = (months: Month[]) : React.ReactElement[] => {
    return months.map((month,index) => (
        <td key={index} 
        colSpan={month.days} >
            {month.name}
        </td>
    ));
        }

export const renderDaysDates = (months: Month[], days:Days): React.ReactElement[] => {
    let currentDayOfWeek = 0;
    return months.slice(1).flatMap((month, indexMonth)=>
        
        Array.from({length : month.days}, (_,dayIndex) => {
            const dayOfweek = (month.start + dayIndex) % 7; 
            currentDayOfWeek = dayOfweek;
            console.log(`months: ${month.name}`);
            return (
         
                <th key={`day-${indexMonth}-{dayIndex}`}>{days[currentDayOfWeek]}</th>
            
            )
            

        }));

};


