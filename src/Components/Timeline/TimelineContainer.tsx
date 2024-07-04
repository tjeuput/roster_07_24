import React from 'react';
import HeaderTimeline from './HeaderTimeline';
import Resources from './Resources';
import MonthRows from './MonthRows';
import DaysRows from './DaysRows';
import './TimelineComponent.css';

const months = [
    { name: 'Januar', start: 1, days: 31 },
    { name: 'Februar', start: 4, days: 29 },
    { name: 'März', start: 5, days: 31 },
    { name: 'April', start: 1, days: 30 },
    { name: 'Mai', start: 3, days: 31 },
    { name: 'Juni', start: 6, days: 30 },
    { name: 'Juli', start: 1, days: 31 },
    { name: 'August', start: 4, days: 31 },
    { name: 'September', start: 0, days: 30 },
    { name: 'Oktober', start: 2, days: 31 },
    { name: 'November', start: 5, days: 30 },
    { name: 'Dezember', start: 0, days: 31 }
];

const timelineData = [
    {id:"1", resource: 'group1', period: Array(366).fill(0), parent: 'group1', parentId:null, planned: null,}, 
    {id:"2", resource: 'Mitarbeiter 1', period: Array(366).fill(0), parent: 'group1', parentId:2 ,planned: 0,},
    {id:"3", resource: 'R:30; Um:25', period: Array(366).fill(0), parent: 'group1', parentId:2,  planned: 1,},
    {id:"4", resource: 'Mitarbeiter 2', period: Array(366).fill(0), parent: 'group1', parentId:4 ,planned: 0,},
    {id:"5", resource: 'R:30; Um:25', period: Array(366).fill(0), parent: 'group1', parentId:4,  planned: 1,},
    {id:"6", resource: 'Mitarbeiter 3', period: Array(366).fill(0), parent: 'group1', parentId:6 ,planned: 0,},
    {id:"7", resource: 'R:30; Um:25', period: Array(366).fill(0), parent: 'group1', parentId:6,  planned: 1,},
    {id:"8", resource: 'group2', period: Array(366).fill(0), parent: 'group2', parentId:null, planned: null},
    {id:"9", resource: 'Mitarbeiter 4', period: Array(366).fill(0), parent: 'group2', parentId:10, planned: 0},
    {id:"10", resource: 'R:30; Um:25', period: Array(366).fill(0), parent: 'group2', parentId:10, planned: 1},
    {id:"12", resource: 'Mitarbeiter 5', period: Array(366).fill(0), parent: 'group2', parentId:12,  planned: 0,},
    {id:"13", resource: 'R:30; Um:25', period: Array(366).fill(0), parent: 'group2', parentId:12 ,planned: 1,},
    {id:"14", resource: 'Mitarbeiter 6', period: Array(366).fill(0), parent: 'group2', parentId:14,  planned: 0,},
    {id:"15", resource: 'R:30; Um:25', period: Array(366).fill(0), parent: 'group2', parentId:14,  planned: 1,},
    {id:"16", resource: 'group3', period: Array(366).fill(0), parent: 'group3', parentId:null, planned: null},
    {id:"17", resource: 'Mitarbeiter 7', period: Array(366).fill(0), parent: 'group3', parentId:17, planned: 0},
    {id:"18", resource: 'R:30; Um:25', period: Array(366).fill(0), parent: 'group3', parentId:17, planned: 1},
    {id:"19", resource: 'Mitarbeiter 8', period: Array(366).fill(0), parent: 'group3', parentId:19 ,planned: 0,},
    {id:"20", resource: 'R:30; Um:25', period: Array(366).fill(0), parent: 'group3', parentId:19,  planned: 1,},
    {id:"21", resource: 'Mitarbeiter 9', period: Array(366).fill(0), parent: 'group3', parentId:21 ,planned: 0,},
    {id:"22", resource: 'R:30; Um:25', period: Array(366).fill(0), parent: 'group3', parentId:21,  planned: 1,},
     
];

const TimelineContainer: React.FC = () => {
    return (
        <div id="timeline-container">
            <HeaderTimeline />
            {timelineData.map((timeline) => (
                <React.Fragment key={timeline.id}>
                    <Resources
                        resource={timeline.resource}
                        parent={timeline.parent}
                        parentId={timeline.parentId}
                        planned={timeline.planned}
                    />
                    {months.map((month, monthIndex) => (
                        <MonthRows
                            key={`${timeline.id}-${monthIndex}`}
                            indexMonth={monthIndex}
                            parent={timeline.parent}
                            parentId={timeline.parentId}
                            planned={timeline.planned}
                            resource={timeline.resource}
                           
                        >
                            <DaysRows
                                monthIndex={monthIndex}
                                days={month.days}
                                start={month.start}
                                initialPeriod={timeline.period}
                                planned={timeline.planned}
                                parent={timeline.parent}
                                parentId={timeline.parentId}
                               
                            />
                        </MonthRows>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
};

export default TimelineContainer;
