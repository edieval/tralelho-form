import React, { useState } from "react";
import { Form, Select } from "antd";

import tree from "./assets/tree.json";
import fr from "./assets/i18n/fr.json";

const { Option } = Select;

function MedicalForm() {
  const [form] = Form.useForm();
  const startingQuestion = tree[0];

  const [fields, setFields] = useState([
    { object: startingQuestion, value: null }
  ]);
  // console.log(fr[startingQuestion.id]);

  const formLayout = {
    labelCol: {
      span: 12
    },
    wrapperCol: {
      span: 24
    }
  };

  function handleChange(questionId) {
    console.log(`selected ${questionId}`);
    handleAdd(questionId);
  }

  function handleAdd(questionId) {
    const values = [...fields];
    const question = tree.find(branch => branch.id === questionId);
    if (question) {
      values.push({
        object: tree.find(branch => branch.id === questionId),
        value: null
      });
      setFields(values);
    }
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
        {fields.map((field, idx) => {
          return (
            <Form.Item label={fr[field.object.id]} key={`${field}-${idx}`}>
              <Select style={{ width: 360 }} onChange={handleChange}>
                {field.object.questions.map((questionId, idy) => {
                  return (
                    <Option value={questionId} key={`${questionId}-${idy}`}>
                      {fr[questionId]}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          );
        })}
      </Form>
    </div>
  );
}
export default MedicalForm;
