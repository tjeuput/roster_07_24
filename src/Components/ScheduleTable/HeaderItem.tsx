import { Column } from 'react-table';
import {Months} from './Months';



interface FlexibleDataItem {
  [key: string]: string;
}


const generateHeader = (): Column<FlexibleDataItem>[] => {
  let prevValue = 1;
  
  return Months.map((month) => {
    const header = month.name;
    const accessor = `col${prevValue}`;
    
    prevValue += month.days;

    return { 
      Header: header,
      accessor: accessor
    };
  });
};

const HeaderItem = (): Column<FlexibleDataItem>[] => {
  return generateHeader();
};

export default HeaderItem;