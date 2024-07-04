import React, { useMemo } from 'react';

interface DaysRowsProps {
    monthIndex: number;
    days: number;
    start: number;
    initialPeriod: (number | string)[];
    planned: number | null;
    parent: string;
    parentId: number | null;
}

//<div class="timeline-row-period d-${startIndex}" id="${groupParentId}_d${startIndex}_${day + 1}.${monthIndex+1}">${period[day]}</div>

const DaysRows: React.FC<DaysRowsProps> = React.memo((props) => {
    const { monthIndex, days, start, initialPeriod, planned, parent, parentId } = props;
    
    const groupParentId = planned === null ? parent : parentId + "_" + planned;

    const staticDaysProps = useMemo(() => {
        return Array.from({ length: days }, (_, day) => {
            const startIndex = (start + day) % 7;

            return {
                className: `timeline-row-period d-${startIndex}`,
                id: `${groupParentId}_d${startIndex}_${day + 1}.${monthIndex+1}`,
                key: `${monthIndex}-${day+1}-${monthIndex+1}`
            };
        });
    }, [monthIndex, days, start, groupParentId]);

    return (
        <>
            {staticDaysProps.map((props, index) => (
                <div {...props} key={props.key}>
                    {initialPeriod[index]}
                </div>
            ))}
        </>
    );
});

export default DaysRows;
