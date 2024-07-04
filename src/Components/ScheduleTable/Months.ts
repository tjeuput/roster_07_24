export interface Month{
    name: string;
    start: number;
    days: number;
}

export type Days = string[];
    


export const Months: Month[] = [
{name: '2024', start: 1, days: 2 },
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

export const Days: Days= ['So','Mo','Di', 'Mi', 'Do', 'Fr', 'Sa' ];
