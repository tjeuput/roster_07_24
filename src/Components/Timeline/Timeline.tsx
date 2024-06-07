

import React, { useState, useEffect, useCallback } from 'react';
import './TimelineComponent.css'


interface Month  {
    name: string;
    days: number;
}

// Define the props expected by the Timeline component
interface TimelineData {
    resource: string;
    period: number[];
}

const months: Month[] = [
    {name: 'Januar', days: 31},
    {name: 'Februar', days: 29},
    {name: 'März', days: 31},
    {name: 'April', days: 30},
    {name: 'Mai', days: 31},
    {name: 'Juni', days: 30},
    {name: 'Juli', days: 31},
    {name: 'August', days: 31},
    {name: 'September', days: 30},
    {name: 'Oktober', days: 31},
    {name: 'November', days: 30},
    {name: 'Dezember', days: 31}
];

const generateMockTimestamps = (days: number): number[] =>{
    const startTimeStamp = new Date('2024-01-01').getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    return Array.from({length:days}, (_,i)=> startTimeStamp + i * oneDay);
}

const timelineData: TimelineData[] = [
    {resource: 'Test', period: generateMockTimestamps(366)},
    ]
const TimelineComponent: React.FC = () => {
    const[data, setData] = useState<TimelineData[]>([]);

    useEffect(() => {
        // Simulate fetching data
        setData(timelineData);
    }, []);
   
    const generateResourceRow = useCallback((resource: string, period: number[]) => {
        let rowHtml = `<div class="timeline-row-resource">${resource}</div>`;
        let dayIndex = 0;
    
        months.forEach((month, indexMonth) => {
          rowHtml += `<div class="timeline-row-period" id="month-${indexMonth + 1}">`;
          for (let day = 0; day < month.days; day++) {
            const date = new Date(period[dayIndex]);
            rowHtml += `<div class="timeline-day" id="day-${indexMonth + 1}-${day + 1}">${date.getDate()}</div>`;
            dayIndex++;
          }
          rowHtml += '</div>';
        });
    
        return rowHtml;
      }, []);

      useEffect(() => {
        const container = document.getElementById('timeline-container');
        if (container) {
          data.forEach((d) => {
            container.insertAdjacentHTML('beforeend', generateResourceRow(d.resource, d.period));
          });
        }
      }, [data, generateResourceRow]);
    
      return (
        <div id="timeline-container" className="timeline-container"></div>
      );
    };
    
export default TimelineComponent;
    
