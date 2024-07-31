import React, { useMemo, useState } from 'react';
import { Column, useTable } from 'react-table';
import HeaderItem from './HeaderItem';
import generateDayKeys from './Employee';
import { Modal } from 'antd';
import './ScheduleTbl.css';
import 'antd/dist/reset.css';
import {Months, Employees } from './helper';

const ScheduleTbl: React.FC<ScheduleTblProps> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
 

  const data = useMemo(
    () => generateDayKeys(Months,Employees),
     
    [Months,Employees]
  );

  const showModal = (row, event) => {
    setSelectedRow(row.original);
    setModalPosition({ top: event.clientY, left: event.clientX });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = React.useMemo<Column<TableData>[]>(() => HeaderItem(), []);

  const tableSchedule = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableSchedule;

  return (
    <div className="table-container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => {
                const props = column.getHeaderProps();
                return (
                  <th
                    {...props}
                    className={column.id === 'Mitarbeiter' ? 'sticky-column' : ''}
                  >
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} onClick={(event) => showModal(row, event)} className="clickable-row">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal
        title="Row Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: modalPosition.top, left: modalPosition.left, position: 'absolute' }}
      >
        <pre>buttons to change shift</pre>
      </Modal>
    </div>
  );
};

export default ScheduleTbl;