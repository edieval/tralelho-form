import React, { useState } from "react";
import { Form, Select } from "antd";

const { Option } = Select;

function MedicalForm() {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([{ value: null }]);

  const formLayout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 24
    }
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
    handleAdd();
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  return (
    <div className="App">
      <h1>Questionnaire de santé</h1>

      <Form
        {...formLayout}
        layout={"vertical"}
        form={form}
        name="control-hooks"
      >
        <button type="button" onClick={() => handleAdd()}>
          +
        </button>

        {fields.map((field, idx) => {
          return (
            <Form.Item label="Question 1" key={`${field}-${idx}`}>
              <Select defaultValue="1" style={{ width: 360 }} onChange={handleChange}>
                <Option value="1">Response 1</Option>
                <Option value="2">Response 2</Option>
                <Option value="3">Response 3</Option>
              </Select>
            </Form.Item>
          );
        })}
      </Form>
    </div>
  );
}
export default MedicalForm;
