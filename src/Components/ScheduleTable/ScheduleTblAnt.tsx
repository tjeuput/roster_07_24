
import { Months, Days } from './helper';
import './ScheduleTblAnt.css'; 




const MonthsHeader = () => {
  let currentDay = 0;
  return Months.map((month, index) => {
 
    if (index === 0) {
      return {
        title: `${month.name}`,
        
        children: [
          {
            title: 'Um',
            dataIndex: 'um',
            key: 'um',
            width: 80,
            fixed:'left',
            children: [
              {
                title: 'Rest',
                dataIndex: 'rest',
                key: 'rest',
                width: 80,
                fixed:'left',
              
              }
            ]
          },
          {
            title: 'Um Plan',
            dataIndex: 'umPlanned',
            key: 'umPlanned',
            width: 80,
            fixed:'left',
            children: [
              {
                title: 'Rest Um',
                dataIndex: 'restUm',
                key: 'restUm',
                width: 80,
                fixed:'left',
             
             
              }
            ]
          },
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 80,
            fixed:'left',
            
          },
         
        ],
        
      } 
    } else {
      return {
        
        title: `${month.name}`,
        children: Array.from({ length: month.days }, (_, indexDay) => {
          const dayOfWeek = (month.start + indexDay) % 7;
          currentDay = currentDay + 1;
          return {
            title: Days[dayOfWeek],
            
            dataIndex: `${month.name.toLowerCase()}-${indexDay + 1}`,
            key: `${month.name.toLowerCase()}-${indexDay + 1}`,
            className: dayOfWeek=== 5 || dayOfWeek === 6 ? 'weekend-cell':undefined,
            width: 50,
            children: [
              {
                title: `${indexDay + 1}.${index + 1}`,
                dataIndex: `${currentDay}`,
                className: dayOfWeek === 5 || dayOfWeek === 6 ? 'weekend-cell' : undefined,
                width: 50

              }
            ]
          } 
        })
      } 
    }
  });
};

export default MonthsHeader;