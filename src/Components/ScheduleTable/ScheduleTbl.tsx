import React, { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import HeaderItem from './HeaderItem';
import './ScheduleTbl.css'
import {renderDaysDates, renderMonthDays} from './MonthUtils';
import {Months, Days} from './Months';
import { Header } from 'antd/es/layout/layout';




const ScheduleTbl: React.FC<ScheduleTblProps> = () => {
    const data = useMemo(
        () => [
            {
                col1: 'Hello',
                col2: 'World',
            },
            {
                col1: 'react-table',
                col2: 'rocks',
            },
            {
                col1: 'whatever',
                col2: 'you want',
            },
        ],
        []
    );




    /* const columns = React.useMemo<Column<FlexibleDataItem>[]>(
        () => HeaderItem(),
        []
      ); */
      const columns = React.useMemo(
        () => [
          {
            Header: "2024",
            accessor: "2024",
            columns: [
              {
                Header: "1",
                accessor: "day-1"
              },
              {
                Header: "2",
                accessor: "day-2"
              }
            ]
          },
          {
            Header: "Januar",
            accessor: "Januar",
            columns: [
              {
                Header: "1",
                accessor: "day-1"
              },
              {
                Header: "2",
                accessor: "day-2"
              },
              {
                Header: "3",
                accessor: "day-3"
              },
              {
                Header: "4",
                accessor: "day-4"
              },
              {
                Header: "5",
                accessor: "day-5"
              },
              {
                Header: "6",
                accessor: "day-6"
              },
              {
                Header: "7",
                accessor: "day-7"
              },
              {
                Header: "8",
                accessor: "day-8"
              },
              {
                Header: "9",
                accessor: "day-9"
              },
              {
                Header: "10",
                accessor: "day-10"
              },
              {
                Header: "11",
                accessor: "day-11"
              },
              {
                Header: "12",
                accessor: "day-12"
              },
              {
                Header: "13",
                accessor: "day-13"
              },
              {
                Header: "14",
                accessor: "day-14"
              },
              {
                Header: "15",
                accessor: "day-15"
              },
              {
                Header: "16",
                accessor: "day-16"
              },
              {
                Header: "17",
                accessor: "day-17"
              },
              {
                Header: "18",
                accessor: "day-18"
              },
              {
                Header: "19",
                accessor: "day-19"
              },
              {
                Header: "20",
                accessor: "day-20"
              },
              {
                Header: "21",
                accessor: "day-21"
              },
              {
                Header: "22",
                accessor: "day-22"
              },
              {
                Header: "23",
                accessor: "day-23"
              },
              {
                Header: "24",
                accessor: "day-24"
              },
              {
                Header: "25",
                accessor: "day-25"
              },
              {
                Header: "26",
                accessor: "day-26"
              },
              {
                Header: "27",
                accessor: "day-27"
              },
              {
                Header: "28",
                accessor: "day-28"
              },
              {
                Header: "29",
                accessor: "day-29"
              },
              {
                Header: "30",
                accessor: "day-30"
              },
              {
                Header: "31",
                accessor: "day-31"
              }
            ]
          },
          {
            Header: "Februar",
            accessor: "Februar",
            columns: [
              {
                Header: "1",
                accessor: "day-1"
              },
              {
                Header: "2",
                accessor: "day-2"
              },
              {
                Header: "3",
                accessor: "day-3"
              },
              {
                Header: "4",
                accessor: "day-4"
              },
              {
                Header: "5",
                accessor: "day-5"
              },
              {
                Header: "6",
                accessor: "day-6"
              },
              {
                Header: "7",
                accessor: "day-7"
              },
              {
                Header: "8",
                accessor: "day-8"
              },
              {
                Header: "9",
                accessor: "day-9"
              },
              {
                Header: "10",
                accessor: "day-10"
              },
              {
                Header: "11",
                accessor: "day-11"
              },
              {
                Header: "12",
                accessor: "day-12"
              },
              {
                Header: "13",
                accessor: "day-13"
              },
              {
                Header: "14",
                accessor: "day-14"
              },
              {
                Header: "15",
                accessor: "day-15"
              },
              {
                Header: "16",
                accessor: "day-16"
              },
              {
                Header: "17",
                accessor: "day-17"
              },
              {
                Header: "18",
                accessor: "day-18"
              },
              {
                Header: "19",
                accessor: "day-19"
              },
              {
                Header: "20",
                accessor: "day-20"
              },
              {
                Header: "21",
                accessor: "day-21"
              },
              {
                Header: "22",
                accessor: "day-22"
              },
              {
                Header: "23",
                accessor: "day-23"
              },
              {
                Header: "24",
                accessor: "day-24"
              },
              {
                Header: "25",
                accessor: "day-25"
              },
              {
                Header: "26",
                accessor: "day-26"
              },
              {
                Header: "27",
                accessor: "day-27"
              },
              {
                Header: "28",
                accessor: "day-28"
              },
              {
                Header: "29",
                accessor: "day-29"
              }
            ]
          },
          {
            Header: "März",
            accessor: "März",
            columns: [
              {
                Header: "1",
                accessor: "day-1"
              },
              {
                Header: "2",
                accessor: "day-2"
              },
              {
                Header: "3",
                accessor: "day-3"
              },
              {
                Header: "4",
                accessor: "day-4"
              },
              {
                Header: "5",
                accessor: "day-5"
              },
              {
                Header: "6",
                accessor: "day-6"
              },
              {
                Header: "7",
                accessor: "day-7"
              },
              {
                Header: "8",
                accessor: "day-8"
              },
              {
                Header: "9",
                accessor: "day-9"
              },
              {
                Header: "10",
                accessor: "day-10"
              },
              {
                Header: "11",
                accessor: "day-11"
              },
              {
                Header: "12",
                accessor: "day-12"
              },
              {
                Header: "13",
                accessor: "day-13"
              },
              {
                Header: "14",
                accessor: "day-14"
              },
              {
                Header: "15",
                accessor: "day-15"
              },
              {
                Header: "16",
                accessor: "day-16"
              },
              {
                Header: "17",
                accessor: "day-17"
              },
              {
                Header: "18",
                accessor: "day-18"
              },
              {
                Header: "19",
                accessor: "day-19"
              },
              {
                Header: "20",
                accessor: "day-20"
              },
              {
                Header: "21",
                accessor: "day-21"
              },
              {
                Header: "22",
                accessor: "day-22"
              },
              {
                Header: "23",
                accessor: "day-23"
              },
              {
                Header: "24",
                accessor: "day-24"
              },
              {
                Header: "25",
                accessor: "day-25"
              },
              {
                Header: "26",
                accessor: "day-26"
              },
              {
                Header: "27",
                accessor: "day-27"
              },
              {
                Header: "28",
                accessor: "day-28"
              },
              {
                Header: "29",
                accessor: "day-29"
              },
              {
                Header: "30",
                accessor: "day-30"
              },
              {
                Header: "31",
                accessor: "day-31"
              }
            ]
          },
          {
            Header: "April",
            accessor: "April",
            columns: [
              {
                Header: "1",
                accessor: "day-1"
              },
              {
                Header: "2",
                accessor: "day-2"
              },
              {
                Header: "3",
                accessor: "day-3"
              },
              {
                Header: "4",
                accessor: "day-4"
              },
              {
                Header: "5",
                accessor: "day-5"
              },
              {
                Header: "6",
                accessor: "day-6"
              },
              {
                Header: "7",
                accessor: "day-7"
              },
              {
                Header: "8",
                accessor: "day-8"
              },
              {
                Header: "9",
                accessor: "day-9"
              },
              {
                Header: "10",
                accessor: "day-10"
              },
              {
                Header: "11",
                accessor: "day-11"
              },
              {
                Header: "12",
                accessor: "day-12"
              },
              {
                Header: "13",
                accessor: "day-13"
              },
              {
                Header: "14",
                accessor: "day-14"
              },
              {
                Header: "15",
                accessor: "day-15"
              },
              {
                Header: "16",
                accessor: "day-16"
              },
              {
                Header: "17",
                accessor: "day-17"
              },
              {
                Header: "18",
                accessor: "day-18"
              },
              {
                Header: "19",
                accessor: "day-19"
              },
              {
                Header: "20",
                accessor: "day-20"
              },
              {
                Header: "21",
                accessor: "day-21"
              },
              {
                Header: "22",
                accessor: "day-22"
              },
              {
                Header: "23",
                accessor: "day-23"
              },
              {
                Header: "24",
                accessor: "day-24"
              },
              {
                Header: "25",
                accessor: "day-25"
              },
              {
                Header: "26",
                accessor: "day-26"
              },
              {
                Header: "27",
                accessor: "day-27"
              },
              {
                Header: "28",
                accessor: "day-28"
              },
              {
                Header: "29",
                accessor: "day-29"
              },
              {
                Header: "30",
                accessor: "day-30"
              }
            ]
          },
          {
            Header: "Mai",
            accessor: "Mai",
            columns: [
              {
                Header: "1",
                accessor: "day-1"
              },
              {
                Header: "2",
                accessor: "day-2"
              },
              {
                Header: "3",
                accessor: "day-3"
              },
              {
                Header: "4",
                accessor: "day-4"
              },
              {
                Header: "5",
                accessor: "day-5"
              },
              {
                Header: "6",
                accessor: "day-6"
              },
              {
                Header: "7",
                accessor: "day-7"
              },
              {
                Header: "8",
                accessor: "day-8"
              },
              {
                Header: "9",
                accessor: "day-9"
              },
              {
                Header: "10",
                accessor: "day-10"
              },
              {
                Header: "11",
                accessor: "day-11"
              },
              {
                Header: "12",
                accessor: "day-12"
              },
              {
                Header: "13",
                accessor: "day-13"
              },
              {
                Header: "14",
                accessor: "day-14"
              },
              {
                Header: "15",
                accessor: "day-15"
              },
              {
                Header: "16",
                accessor: "day-16"
              },
              {
                Header: "17",
                accessor: "day-17"
              },
              {
                Header: "18",
                accessor: "day-18"
              },
              {
                Header: "19",
                accessor: "day-19"
              },
              {
                Header: "20",
                accessor: "day-20"
              },
              {
                Header: "21",
                accessor: "day-21"
              },
              {
                Header: "22",
                accessor: "day-22"
              },
              {
                Header: "23",
                accessor: "day-23"
              },
              {
                Header: "24",
                accessor: "day-24"
              },
              {
                Header: "25",
                accessor: "day-25"
              },
              {
                Header: "26",
                accessor: "day-26"
              },
              {
                Header: "27",
                accessor: "day-27"
              },
              {
                Header: "28",
                accessor: "day-28"
              },
              {
                Header: "29",
                accessor: "day-29"
              },
              {
                Header: "30",
                accessor: "day-30"
              },
              {
                Header: "31",
                accessor: "day-31"
              }
            ]
          },
          {
            Header: "Juni",
            accessor: "Juni",
            columns: [
              {
                Header: "1",
                accessor: "day-1"
              },
              {
                Header: "2",
                accessor: "day-2"
              },
              {
                Header: "3",
                accessor: "day-3"
              },
              {
                Header: "4",
                accessor: "day-4"
              },
              {
                Header: "5",
                accessor: "day-5"
              },
              {
                Header: "6",
                accessor: "day-6"
              },
              {
                Header: "7",
                accessor: "day-7"
              },
              {
                Header: "8",
                accessor: "day-8"
              },
              {
                Header: "9",
                accessor: "day-9"
              },
              {
                Header: "10",
                accessor: "day-10"
              },
              {
                Header: "11",
                accessor: "day-11"
              },
              {
                Header: "12",
                accessor: "day-12"
              },
              {
                Header: "13",
                accessor: "day-13"
              },
              {
                Header: "14",
                accessor: "day-14"
              },
              {
                Header: "15",
                accessor: "day-15"
              },
              {
                Header: "16",
                accessor: "day-16"
              },
              {
                Header: "17",
                accessor: "day-17"
              },
              {
                Header: "18",
                accessor: "day-18"
              },
              {
                Header: "19",
                accessor: "day-19"
              },
              {
                Header: "20",
                accessor: "day-20"
              },
              {
                Header: "21",
                accessor: "day-21"
              },
              {
                Header: "22",
                accessor: "day-22"
              },
              {
                Header: "23",
                accessor: "day-23"
              },
              {
                Header: "24",
                accessor: "day-24"
              },
              {
                Header: "25",
                accessor: "day-25"
              },
              {
                Header: "26",
                accessor: "day-26"
              },
              {
                Header: "27",
                accessor: "day-27"
              },
              {
                Header: "28",
                accessor: "day-28"
              },
              {
                Header: "29",
                accessor: "day-29"
              },
              {
                Header: "30",
                accessor: "day-30"
              }
            ]
          },
          {
            Header: "Juli",
            accessor: "Juli",
            columns: [
              {
                Header: "1",
                accessor: "day-1"
              },
              {
                Header: "2",
                accessor: "day-2"
              },
              {
                Header: "3",
                accessor: "day-3"
              },
              {
                Header: "4",
                accessor: "day-4"
              },
              {
                Header: "5",
                accessor: "day-5"
              },
              {
                Header: "6",
                accessor: "day-6"
              },
              {
                Header: "7",
                accessor: "day-7"
              },
              {
                Header: "8",
                accessor: "day-8"
              },
              {
                Header: "9",
                accessor: "day-9"
              },
              {
                Header: "10",
                accessor: "day-10"
              },
              {
                Header: "11",
                accessor: "day-11"
              },
              {
                Header: "12",
                accessor: "day-12"
              },
              {
                Header: "13",
                accessor: "day-13"
              },
              {
                Header: "14",
                accessor: "day-14"
              },
              {
                Header: "15",
                accessor: "day-15"
              },
              {
                Header: "16",
                accessor: "day-16"
              },
              {
                Header: "17",
                accessor: "day-17"
              },
              {
                Header: "18",
                accessor: "day-18"
              },
              {
                Header: "19",
                accessor: "day-19"
              },
              {
                Header: "20",
                accessor: "day-20"
              },
              {
                Header: "21",
                accessor: "day-21"
              },
              {
                Header: "22",
                accessor: "day-22"
              },
              {
                Header: "23",
                accessor: "day-23"
              },
              {
                Header: "24",
                accessor: "day-24"
              },
              {
                Header: "25",
                accessor: "day-25"
              },
              {
                Header: "26",
                accessor: "day-26"
              },
              {
                Header: "27",
                accessor: "day-27"
              },
              {
                Header: "28",
                accessor: "day-28"
              },
              {
                Header: "29",
                accessor: "day-29"
              },
              {
                Header: "30",
                accessor: "day-30"
              },
              {
                Header: "31",
                accessor: "day-31"
              }
            ]
          },
          {
            Header: "August",
            accessor: "August",
            columns: [
              {
                Header: "1",
                accessor: "day-1"
              },
              {
                Header: "2",
                accessor: "day-2"
              },
              {
                Header: "3",
                accessor: "day-3"
              },
              {
                Header: "4",
                accessor: "day-4"
              },
              {
                Header: "5",
                accessor: "day-5"
              },
              {
                Header: "6",
                accessor: "day-6"
              },
              {
                Header: "7",
                accessor: "day-7"
              },
              {
                Header: "8",
                accessor: "day-8"
              },
              {
                Header: "9",
                accessor: "day-9"
              },
              {
                Header: "10",
                accessor: "day-10"
              },
              {
                Header: "11",
                accessor: "day-11"
              },
              {
                Header: "12",
                accessor: "day-12"
              },
              {
                Header: "13",
                accessor: "day-13"
              },
              {
                Header: "14",
                accessor: "day-14"
              },
              {
                Header: "15",
                accessor: "day-15"
              },
              {
                Header: "16",
                accessor: "day-16"
              },
              {
                Header: "17",
                accessor: "day-17"
              },
              {
                Header: "18",
                accessor: "day-18"
              },
              {
                Header: "19",
                accessor: "day-19"
              },
              {
                Header: "20",
                accessor: "day-20"
              },
              {
                Header: "21",
                accessor: "day-21"
              },
              {
                Header: "22",
                accessor: "day-22"
              },
              {
                Header: "23",
                accessor: "day-23"
              },
              {
                Header: "24",
                accessor: "day-24"
              },
              {
                Header: "25",
                accessor: "day-25"
              },
              {
                Header: "26",
                accessor: "day-26"
              },
              {
                Header: "27",
                accessor: "day-27"
              },
              {
                Header: "28",
                accessor: "day-28"
              },
              {
                Header: "29",
                accessor: "day-29"
              },
              {
                Header: "30",
                accessor: "day-30"
              },
              {
                Header: "31",
                accessor: "day-31"
              }
            ]
          },
          {
            Header: "September",
            accessor: "September",
            columns: [
              {
                Header: "1",
                accessor: "day-1"
              },
              {
                Header: "2",
                accessor: "day-2"
              },
              {
                Header: "3",
                accessor: "day-3"
              },
              {
                Header: "4",
                accessor: "day-4"
              },
              {
                Header: "5",
                accessor: "day-5"
              },
              {
                Header: "6",
                accessor: "day-6"
              },
              {
                Header: "7",
                accessor: "day-7"
              },
              {
                Header: "8",
                accessor: "day-8"
              },
              {
                Header: "9",
                accessor: "day-9"
              },
              {
                Header: "10",
                accessor: "day-10"
              },
              {
                Header: "11",
                accessor: "day-11"
              },
              {
                Header: "12",
                accessor: "day-12"
              },
              {
                Header: "13",
                accessor: "day-13"
              },
              {
                Header: "14",
                accessor: "day-14"
              },
              {
                Header: "15",
                accessor: "day-15"
              },
              {
                Header: "16",
                accessor: "day-16"
              },
              {
                Header: "17",
                accessor: "day-17"
              },
              {
                Header: "18",
                accessor: "day-18"
              },
              {
                Header: "19",
                accessor: "day-19"
              },
              {
                Header: "20",
                accessor: "day-20"
              },
              {
                Header: "21",
                accessor: "day-21"
              },
              {
                Header: "22",
                accessor: "day-22"
              },
              {
                Header: "23",
                accessor: "day-23"
              },
              {
                Header: "24",
                accessor: "day-24"
              },
              {
                Header: "25",
                accessor: "day-25"
              },
              {
                Header: "26",
                accessor: "day-26"
              },
              {
                Header: "27",
                accessor: "day-27"
              },
              {
                Header: "28",
                accessor: "day-28"
              },
              {
                Header: "29",
                accessor: "day-29"
              },
              {
                Header: "30",
                accessor: "day-30"
              }
            ]
          },
          {
            Header: "Oktober",
            accessor: "Oktober",
            columns: [
              {
                Header: "1",
                accessor: "day-1"
              },
              {
                Header: "2",
                accessor: "day-2"
              },
              {
                Header: "3",
                accessor: "day-3"
              },
              {
                Header: "4",
                accessor: "day-4"
              },
              {
                Header: "5",
                accessor: "day-5"
              },
              {
                Header: "6",
                accessor: "day-6"
              },
              {
                Header: "7",
                accessor: "day-7"
              },
              {
                Header: "8",
                accessor: "day-8"
              },
              {
                Header: "9",
                accessor: "day-9"
              },
              {
                Header: "10",
                accessor: "day-10"
              },
              {
                Header: "11",
                accessor: "day-11"
              },
              {
                Header: "12",
                accessor: "day-12"
              },
              {
                Header: "13",
                accessor: "day-13"
              },
              {
                Header: "14",
                accessor: "day-14"
              },
              {
                Header: "15",
                accessor: "day-15"
              },
              {
                Header: "16",
                accessor: "day-16"
              },
              {
                Header: "17",
                accessor: "day-17"
              },
              {
                Header: "18",
                accessor: "day-18"
              },
              {
                Header: "19",
                accessor: "day-19"
              },
              {
                Header: "20",
                accessor: "day-20"
              },
              {
                Header: "21",
                accessor: "day-21"
              },
              {
                Header: "22",
                accessor: "day-22"
              },
              {
                Header: "23",
                accessor: "day-23"
              },
              {
                Header: "24",
                accessor: "day-24"
              },
              {
                Header: "25",
                accessor: "day-25"
              },
              {
                Header: "26",
                accessor: "day-26"
              },
              {
                Header: "27",
                accessor: "day-27"
              },
              {
                Header: "28",
                accessor: "day-28"
              },
              {
                Header: "29",
                accessor: "day-29"
              },
              {
                Header: "30",
                accessor: "day-30"
              },
              {
                Header: "31",
                accessor: "day-31"
              }
            ]
          },
          {
            Header: "November",
            accessor: "November",
            columns: [
              {
                Header: "1",
                accessor: "day-1"
              },
              {
                Header: "2",
                accessor: "day-2"
              },
              {
                Header: "3",
                accessor: "day-3"
              },
              {
                Header: "4",
                accessor: "day-4"
              },
              {
                Header: "5",
                accessor: "day-5"
              },
              {
                Header: "6",
                accessor: "day-6"
              },
              {
                Header: "7",
                accessor: "day-7"
              },
              {
                Header: "8",
                accessor: "day-8"
              },
              {
                Header: "9",
                accessor: "day-9"
              },
              {
                Header: "10",
                accessor: "day-10"
              },
              {
                Header: "11",
                accessor: "day-11"
              },
              {
                Header: "12",
                accessor: "day-12"
              },
              {
                Header: "13",
                accessor: "day-13"
              },
              {
                Header: "14",
                accessor: "day-14"
              },
              {
                Header: "15",
                accessor: "day-15"
              },
              {
                Header: "16",
                accessor: "day-16"
              },
              {
                Header: "17",
                accessor: "day-17"
              },
              {
                Header: "18",
                accessor: "day-18"
              },
              {
                Header: "19",
                accessor: "day-19"
              },
              {
                Header: "20",
                accessor: "day-20"
              },
              {
                Header: "21",
                accessor: "day-21"
              },
              {
                Header: "22",
                accessor: "day-22"
              },
              {
                Header: "23",
                accessor: "day-23"
              },
              {
                Header: "24",
                accessor: "day-24"
              },
              {
                Header: "25",
                accessor: "day-25"
              },
              {
                Header: "26",
                accessor: "day-26"
              },
              {
                Header: "27",
                accessor: "day-27"
              },
              {
                Header: "28",
                accessor: "day-28"
              },
              {
                Header: "29",
                accessor: "day-29"
              },
              {
                Header: "30",
                accessor: "day-30"
              }
            ]
          },
          {
            Header: "Dezember",
            accessor: "Dezember",
            columns: [
              {
                Header: "1",
                accessor: "day-1"
              },
              {
                Header: "2",
                accessor: "day-2"
              },
              {
                Header: "3",
                accessor: "day-3"
              },
              {
                Header: "4",
                accessor: "day-4"
              },
              {
                Header: "5",
                accessor: "day-5"
              },
              {
                Header: "6",
                accessor: "day-6"
              },
              {
                Header: "7",
                accessor: "day-7"
              },
              {
                Header: "8",
                accessor: "day-8"
              },
              {
                Header: "9",
                accessor: "day-9"
              },
              {
                Header: "10",
                accessor: "day-10"
              },
              {
                Header: "11",
                accessor: "day-11"
              },
              {
                Header: "12",
                accessor: "day-12"
              },
              {
                Header: "13",
                accessor: "day-13"
              },
              {
                Header: "14",
                accessor: "day-14"
              },
              {
                Header: "15",
                accessor: "day-15"
              },
              {
                Header: "16",
                accessor: "day-16"
              },
              {
                Header: "17",
                accessor: "day-17"
              },
              {
                Header: "18",
                accessor: "day-18"
              },
              {
                Header: "19",
                accessor: "day-19"
              },
              {
                Header: "20",
                accessor: "day-20"
              },
              {
                Header: "21",
                accessor: "day-21"
              },
              {
                Header: "22",
                accessor: "day-22"
              },
              {
                Header: "23",
                accessor: "day-23"
              },
              {
                Header: "24",
                accessor: "day-24"
              },
              {
                Header: "25",
                accessor: "day-25"
              },
              {
                Header: "26",
                accessor: "day-26"
              },
              {
                Header: "27",
                accessor: "day-27"
              },
              {
                Header: "28",
                accessor: "day-28"
              },
              {
                Header: "29",
                accessor: "day-29"
              },
              {
                Header: "30",
                accessor: "day-30"
              },
              {
                Header: "31",
                accessor: "day-31"
              }
            ]
          }
        ],[])

const tableSchedule = useTable({ columns,  data });

const {
    getTableProps,
    headerGroups,
} = tableSchedule;

return (
  
    <table {...getTableProps()}>
    
    <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  
                  {column.render(Header)}
                </th>
              ))}
            </tr>
          ))}
        </thead>



        <tbody >


        </tbody>
    </table>
);
};

export default ScheduleTbl;