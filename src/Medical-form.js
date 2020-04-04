import React, { useState } from "react";
import { Form, Select, Radio } from "antd";

import tree from "./assets/tree.json";
import fr from "./assets/i18n/fr.json";
import ar from "./assets/i18n/ar_EG.json";

const { Option } = Select;

const MedicalForm = () => {
  const [form] = Form.useForm();
  const startingQuestion = tree[0];

  let [fields, setFields] = useState([
    { object: startingQuestion, value: null }
  ]);
  let [locale, setLocale] = useState(fr);

  const formLayout = {
    labelCol: {
      span: 12
    },
    wrapperCol: {
      span: 24
    }
  };

  function removeChildrens(index) {
    fields = fields.slice(0, index + 1);
    setFields(fields);
  }

  function handleChange(responseId, questionIndex) {
    removeChildrens(questionIndex);
    handleAdd(responseId);
  }

  function handleAdd(questionId) {
    const question = tree.find(branch => branch.id === questionId);
    if (question) {
      fields.push({
        object: tree.find(branch => branch.id === questionId),
        value: null
      });
      setFields(fields);
    }
  }

  function changeLocale(e) {
    const localeValue = e.target.value;
    setLocale(localeValue);
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
        <div className="change-locale">
          <Radio.Group value={locale} onChange={e => changeLocale(e)}>
            <Radio.Button key="fr" value={fr}>
              Français
            </Radio.Button>
            <Radio.Button key="ar" value={ar}>
              عربي
            </Radio.Button>
          </Radio.Group>
        </div>

        {fields.map((field, idx) => {
          return (
            <Form.Item label={locale[field.object.id]} key={field.object.id}>
              <Select
                style={{ width: 480 }}
                onChange={e => handleChange(e, idx)}
              >
                {field.object.questions.map((questionId, idy) => {
                  return (
                    <Option value={questionId} key={questionId}>
                      {locale[questionId]}
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
};
export default MedicalForm;
