import React from 'react';

interface MonthRowsProps {
    indexMonth: number;
    parent: string;
    parentId: number | null;
    planned: number | null;
    resource: string;
    children?: React.ReactNode;
}

const MonthRows: React.FC<MonthRowsProps> = React.memo((props) => {
    const { indexMonth, parent, parentId, planned, resource, children } = props;

    const isGroup = resource.toLowerCase().includes('group');

    const className = `timeline-row-period ${!isGroup ? parent : 'header'}`;
    const id = `${parentId}_${planned}_${parent}_${indexMonth + 1}`;

    return (
        <div className={className} id={id}>
            {children}
        </div>
    );
});
export default MonthRows;
