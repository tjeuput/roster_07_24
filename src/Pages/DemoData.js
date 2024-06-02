"use strict";

const DemoData = {
    resources: [
       /*  { id: 'group1', name: 'Development Team', title: 'Development Team', parentId:null, groupOnly: true },
        { id: 'r1', name: 'Alice Smith', title: 'Alice', parentId: 'group1' },
        { id: 'r2', name: 'Bob Johnson', title: 'Bob', parentId: 'group1' },
        { id: 'group2', name: 'Team', title: 'Devopment Tem', groupOnly: true },
        { id: 'r3', name: 'Carol Taylor', title: 'Carol', parentId: 'group2', groupOnly: false },
        { id: 'r4', name: 'David Wilson', title: 'David', parentId: 'group1', groupOnly:false },
        { id: '115', name: 'Cosbee', title: '3', parent_id: '1', group_only: false },
        { id: 'group3', name: 'A', title: 'A', parent_id: null, group_only: true },
        { id: '296', name: 'Thacker', title: 'fr', parent_id: 'group3'  },
       
        { id: '105', name: 'Husband', title: 'um', parent_id: 'group2'  },
        { id: '139', name: 'Cotes', title: 'afr', parent_id: 'group2' },
        { id: '28', name: 'Molines', title: 'um', parent_id: 'group2' },
        { id: '55', name: 'Paolino', title: 'um', parent_id: 'group1' },
        { id: '151', name: 'Oherlihy', title: 'afr', parent_id: 'group2' } */
        { id: 'group1', name: 'BW', title: 'BW', parentId: null, group_only: true },
        { id: '115', name: 'Cosbee', title: '3', parentId: 'group1', group_only: false },
        { id: 'group3', name: 'A', title: 'A', parentId: null, group_only: true },
        { id: '296', name: 'Thacker', title: 'fr', parentId: 'group3', group_only: false },
        { id: 'group2', name: 'HW', title: 'HW', parentId: null, group_only: true },
        { id: '105', name: 'Husband', title: 'um', parentId: 'group2', group_only: false },
        { id: '139', name: 'Cotes', title: 'afr', parentId: 'group2', group_only: false },
        { id: '28', name: 'Molines', title: 'um', parentId: 'group2', group_only: false },
        { id: '55', name: 'Paolino', title: 'um', parentId: 'group1', group_only: false },
        { id: '151', name: 'Oherlihy', title: 'afr', parentId: 'group2', group_only: false },
      ],
      events: [
    /* { id: 5, start: '2024-05-01 09:00:00', end: '2024-05-01 12:00:00', resourceId: '105', title: 'Code Review', bgColor: '#D9D9D9' },
    { id: 6, start: '2024-05-02 09:00:00', end: '2024-05-02 12:00:00', resourceId: '139', title: 'Code Review', bgColor: '#D9D9D9' },
    { id: 7, start: '2024-05-03 09:00:00', end: '2024-05-03 12:00:00', resourceId: 'r1', title: 'Code Review', bgColor: '#D9D9D9' },
    { id: 3, start: '2024-05-01 13:00:00', end: '2024-05-01 15:00:00', resourceId: '28', title: 'Planning Session', bgColor: '#F45942' },
    { id: 2, start: '2024-05-02 11:00:00', end: '2024-05-02 14:00:00', resourceId: 'r3', title: 'Campaign Review', bgColor: '#F98441' },
    // Note: Removing the duplicate event for demonstration
    { id: 4, start: '2024-05-02 16:00:00', end: '2024-05-02 18:00:00', resourceId: '151', title: 'Market Research', bgColor: '#2986CC' }
    { id: "58", start: "2024-01-01 22:00:00", end: "2024-01-01 06:00:00", resourceId: "115", title: "3", bgColor: "#D60000" } */
    { id: 58, start: '2024-01-01 22:00:00', end: '2024-01-01 06:00:00', resourceId: '115', title: '3', bgColor: '#D60000' },
    { id: 526, start: '2024-01-01 00:00:00', end: '2024-01-01 23:59:59', resourceId: '296', title: 'fr', bgColor: '#00A0E3' },
    { id: 572, start: '2024-01-01 00:00:00', end: '2024-01-01 23:59:59', resourceId: '105', title: 'um', bgColor: '#000000' },
    { id: 792, start: '2024-01-02 00:00:00', end: '2024-01-02 23:59:59', resourceId: '139', title: 'afr', bgColor: '#0053A0' },
    { id: 134, start: '2024-01-02 00:00:00', end: '2024-01-02 23:59:59', resourceId: '28', title: 'um', bgColor: '#000000' },
    { id: 952, start: '2024-01-03 00:00:00', end: '2024-01-03 23:59:59', resourceId: '55', title: 'um', bgColor: '#000000' },
    { id: 659, start: '2024-01-03 22:00:00', end: '2024-01-03 06:00:00', resourceId: '151', title: 'afr', bgColor: '#0053A0' }
      ]
    };
    /* function mergeEvents(events) {
        // This function assumes events are sorted by start date
        events.sort((a, b) => new Date(a.start) - new Date(b.start));
    
        const mergedEvents = [];
    
        events.forEach(event => {
            // Check if there's an existing event in mergedEvents that can be merged
            const existingEvent = mergedEvents.find(e => 
                e.resourceId === event.resourceId && 
                e.title === event.title && 
                new Date(e.end) >= new Date(event.start)
            );
    
            if (existingEvent) {
                // Extend the existing event's end date if the current event extends beyond it
                existingEvent.end = new Date(Math.max(new Date(existingEvent.end), new Date(event.end))).toISOString();
            } else {
                // If no existing event is found, push a copy of the event (to avoid mutating the original)
                mergedEvents.push({ ...event });
            }
        });
    
        return mergedEvents;
    }
    DemoData.events = mergeEvents(DemoData.events);
    console.log(DemoData.events) */

export default DemoData;