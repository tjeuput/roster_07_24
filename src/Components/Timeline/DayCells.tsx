import React, { useMemo } from 'react';
import './TimelineComponent.css';

interface TimelineData {
  id: string;
  resource: string;
  period: (number | string)[];
  parent: string;
  parentId: string | number | null;
  planned: number | null;
}

interface Months {
  name: string;
  start: number;
  days: number;
}

interface DayCellsProps {
  timelineData: TimelineData[];
  months: Months[];
}

const DayCells: React.FC<DayCellsProps> = ({ timelineData, months }) => {
  const generateDayCells = useMemo(
    () => (monthIndex: number, days: number, start: number, period: (number | string)[], groupParentId: string | number): JSX.Element[] => {
      const dayCells: JSX.Element[] = [];
      for (let day = 0; day < days; day++) {
        const startIndex = (start + day) % 7;
        dayCells.push(
          <div className={`timeline-row-period d-${startIndex}`} id={`${groupParentId}_d${startIndex}_${day + 1}.${monthIndex + 1}`} key={`${monthIndex}-${day}`}>
            {period[day]}
          </div>
        );
      }
      return dayCells;
    },
    []
  );

  const generateRowOfResource = useMemo(
    () => (data: TimelineData): JSX.Element => {
      const { resource, period, parent, parentId, planned } = data;
      const isGroup = resource.toLowerCase().includes('group');
      const groupParentId = planned === null ? parent : `${parentId}_${planned}`;

      return (
        <div key={data.id} className={`timeline-row ${isGroup ? 'collapsible' : parent}`} id={`${!isGroup ? `${parentId}_${planned}_${parent}` : parent}`}>
          <div className={`timeline-row-resource ${isGroup ? 'collapsible' : ''}`}>
            {!planned && !isGroup ? '>' + resource : resource}
          </div>
          {months.map((month, indexMonth) => (
            <div className={`timeline-row-period ${!isGroup ? parent : 'header'}`} id={`${groupParentId}_${indexMonth + 1}`} key={indexMonth}>
              {generateDayCells(indexMonth, month.days, month.start, period, groupParentId)}
            </div>
          ))}
        </div>
      );
    },
    [generateDayCells, months]
  );

  const dayCells: JSX.Element[] = useMemo(() => {
    return timelineData.map((data) => generateRowOfResource(data));
  }, [timelineData, generateRowOfResource]);

  return <div className="timeline-container">{dayCells}</div>;
};

export default DayCells;
