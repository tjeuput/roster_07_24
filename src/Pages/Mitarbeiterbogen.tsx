import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Table, Input, Button, Popconfirm, Form, Select, InputNumber, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { invoke } from '@tauri-apps/api/tauri';

interface EmployeeForm {
  key: React.Key;
  employee_number: string;
  name: string;
  last_name: string;
  id_area: number;
  id_group: number;
  year_holiday: number | null;
}

const Mitarbeiterbogen = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<EmployeeForm[]>([]);
  const [editingKey, setEditingKey] = useState<React.Key>('');
  const [loading, setLoading] = useState(true);

  const tableRef = useRef<HTMLDivElement>(null);

  const fetchEmployee = async () => {
    try {
      const response = await invoke<string>("get_employees");

      if (response.startsWith("Error:")) {
        throw new Error(response);
      }

      const parsedResponse: Omit<EmployeeForm, 'key'>[] = JSON.parse(response);

      const employeesWithKeys = parsedResponse.map((e, idx) => ({
        ...e,
        key: idx,
        employee_number: e.employee_number || '',  // Handle potential null values
      }));

      setDataSource(employeesWithKeys);
      console.log(parsedResponse);
    } catch (error) {
      console.log("Error fetching employee form:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dataSource.length === 0) {
      fetchEmployee();
    } else {
      setLoading(false);
    }
  }, []);

  const isEditing = (record: EmployeeForm) => record.key === editingKey;

  const edit = (record: Partial<EmployeeForm> & { key: React.Key }) => {
    form.setFieldsValue({ firstName: '', lastName: '', idEmployee: '', area: '', group: '', yearlyHoliday: 0, ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as EmployeeForm;
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey('');
      }

      // Save the new employee record to the backend
      await invoke('set_employee', { 
        employee: {
          employee_number: row.employee_number,
          name: row.name,
          last_name: row.last_name,
          id_area: row.id_area,
          id_group: row.id_group,
          year_holiday: row.year_holiday
        }
      });
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const scrollToBottom = () => {
    if (tableRef.current) {
      const scrollContainer = tableRef.current.querySelector('.ant-table-body');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  const handleAdd = () => {
    const newKey = dataSource.length ? dataSource[dataSource.length - 1].key + 1 : 1;
    const newData: EmployeeForm = {
      key: newKey,
      employee_number: '',
      name: '',
      last_name: '',
      id_area: 1,
      id_group: 1,
      year_holiday: 0,
    };
    setDataSource((prevData) => {
      const newDataSource = [...prevData, newData];
      setTimeout(() => scrollToBottom(), 0);
      return newDataSource;
    });
    edit(newData);
  };

  const columns = useMemo(() => [
    {
      title: 'No',
      dataIndex: 'key',
      editable: false,
    },
    {
      title: 'Dienstausweisnummer',
      dataIndex: 'employee_number',
      editable: true,
    },
    {
      title: 'Vorname',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Nachname',
      dataIndex: 'last_name',
      editable: true,
    },
    {
      title: 'Bereich',
      dataIndex: 'id_area',
      editable: true,
      render: (text: number) => {
        const areas = { 1: 'BW', 2: 'HW', 3: 'A' };
        return (
          <Select defaultValue={areas[text as keyof typeof areas]} style={{ width: 120 }}>
            {Object.entries(areas).map(([id, name]) => (
              <Select.Option key={id} value={id}>{name}</Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: 'Gruppe',
      dataIndex: 'id_group',
      editable: true,
      render: (text: number) => {
        const groups = { 1: 'Yellow', 2: 'Blue', 3: 'Grey' };
        return (
          <Select defaultValue={groups[text as keyof typeof groups]} style={{ width: 120 }}>
            {Object.entries(groups).map(([id, name]) => (
              <Select.Option key={id} value={id}>{name}</Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: 'Jahresurlaub',
      dataIndex: 'year_holiday',
      editable: true,
      render: (text: number | null) => <InputNumber defaultValue={text || 0} />,
    },
    {
      title: 'Aktion',
      dataIndex: 'operation',
      render: (_: any, record: EmployeeForm) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Speichern
            </Button>
            <Popconfirm title="Sicher zu Abbrechen?" onConfirm={cancel}>
              <Button>Abbrechen</Button>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Button disabled={editingKey !== ''} onClick={() => edit(record)} style={{ marginRight: 8 }}>
              Edit
            </Button>
            <Popconfirm title="Sicher zu Löschen?" onConfirm={() => setDataSource(dataSource.filter((item) => item.key !== record.key))}>
              <Button>Delete</Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ], [dataSource, editingKey]);

  const mergedColumns = useMemo(() => columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: EmployeeForm) => ({
        record,
        inputType: col.dataIndex === 'yearlyHoliday' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  }), [columns, isEditing]);

  const EditableCell: React.FC<any> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      dataIndex === 'area' || dataIndex === 'group' ? (
        <Select>
          {dataIndex === 'area' ? (
            <>
              <Select.Option value={1}>BW</Select.Option>
              <Select.Option value={2}>HW</Select.Option>
              <Select.Option value={3}>A</Select.Option>
            </>
          ) : (
            <>
              <Select.Option value={1}>Yellow</Select.Option>
              <Select.Option value={2}>Blue</Select.Option>
              <Select.Option value={3}>Grey</Select.Option>
            </>
          )}
        </Select>
      ) : inputType === 'number' ? (
        <InputNumber />
      ) : (
        <Input />
      );
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[{ required: true, message: `Bitte ${title}! eintragen` }]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  return (
    <>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        <PlusOutlined /> Neuen Mitarbeiter hinzufügen
      </Button>
      <Spin spinning={loading}>
        <Form form={form} component={false}>
          <div ref={tableRef}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={dataSource}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{false}}
              scroll={{ y: 400 }}
            />
          </div>
        </Form>
      </Spin>
    </>
  );
};

export default Mitarbeiterbogen;
