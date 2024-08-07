import React, { useState } from 'react';
import { Table, Form, Input, Select, InputNumber, Button, message } from 'antd';
import { invoke } from '@tauri-apps/api/tauri';

const { Option } = Select;

const EmployeeForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const columns = [
    {
      title: 'Dienstausweisnummer',
      dataIndex: 'employee_number',
      key: 'employee_number',
      width:350,
      render: (_, record) => ( // what is record?
        <Form.Item
          name="employee_number"
          rules={[{ required: true, message: 'Bitte Dienstausweisnummer eingeben!' }]}
        >
          <Input />
        </Form.Item>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Bitte Vorname eingeben' }]}
        >
          <Input />
        </Form.Item>
      ),
    },
    {
      title: 'Nachname',
      dataIndex: 'last_name',
      key: 'last_name',
      render: (_, record) => (
        <Form.Item
          name="last_name"
          rules={[{ required: true, message: 'Bitte Nachname eingeben!' }]}
        >
          <Input />
        </Form.Item>
      ),
    },
    {
      title: 'Id Bereich',
      dataIndex: 'id_area',
      key: 'id_area',
      width: 50,
      render: (_, record) => (
        <Form.Item
          name="id_area"
          rules={[{ required: true, message: 'Bitte Id Bereich eingeben!' }]}
        >
          <Select>
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: 'Id Gruppe',
      dataIndex: 'id_group',
      key: 'id_group',
      width: 50,
      render: (_, record) => (
        <Form.Item
          name="id_group"
          rules={[{ required: true, message: 'Bitte Id Gruppe eingeben!' }]}
        >
          <Select>
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: 'Jahresurlaub Anzahl',
      dataIndex: 'year_holiday',
      key: 'year_holiday',
      render: (_, record) => (
        <Form.Item
          name="year_holiday"
          rules={[{ required: true, message: 'Bitte Jahresurlaub Anzahl eingeben!' }]}
        >
          <InputNumber min={0} />
        </Form.Item>
      ),
    },
  ];

  const onFinish = async (values) => { // where do values come from
    console.log('Form values (stringified):', JSON.stringify(values, null, 2));
    setLoading(true);
    try {
      await invoke('add_employee', { employee: values });
      
      messageApi.success('Success message');
      form.resetFields();
    } catch (error) {
        messageApi.error('Mitarbeiter kann nicht hinzugefügt werden: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} > 
      <Table
        columns={columns}
        dataSource={[{}]}
        pagination={false}
        rowKey={() => 'employee_form'}
      />
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Neu Mitarbeiter hinzufügen
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmployeeForm;