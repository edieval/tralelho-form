import React, { useState } from "react";
import { Form, Select, Radio } from "antd";

import tree from "./assets/tree.json";
import fr from "./assets/i18n/fr.json";
import ar from "./assets/i18n/ar_EG.json";

const { Option } = Select;
let path = ["35"];

const MedicalForm = () => {
  const [form] = Form.useForm();

  const startingQuestion = tree[0];

  let [fields, setFields] = useState([
    { object: startingQuestion, value: null },
  ]);

  let [locale, setLocale] = useState(fr);

  const formLayout = {
    labelCol: {
      span: 12,
    },
    wrapperCol: {
      span: 24,
    },
  };

  function removeChildrens(index) {
    fields = fields.slice(0, index + 1);
    setFields(fields);
    path = fields.map((field) => field.object.id);
  }

  function handleChange(responseId, questionIndex) {
    removeChildrens(questionIndex);
    handleAdd(responseId);
  }

  function findTreeLeaf(tree, arrayNode, paths) {
    if (!Array.isArray(arrayNode)) {
      return arrayNode;
    }
    const clonedPath = [...paths];
    const firstId = clonedPath.shift();
    let leaf = arrayNode.find((branch) => branch.id === firstId);
    if (!leaf) {
      leaf = tree.find((branch) => branch.id === firstId);
    }
    if (clonedPath.length === 0) {
      return leaf;
    } else {
      return findTreeLeaf(tree, leaf.answers, clonedPath);
    }
  }

  function changeLocale(e) {
    const localeValue = e.target.value;
    setLocale(localeValue);
  }

  function handleAdd(questionId) {
    path.push(questionId);
    const node = findTreeLeaf(tree, tree, path);
    if (node) {
      if (node.forward) {
        fields.push({
          object: findTreeLeaf(tree, tree, [node.forward]),
          value: null,
        });
      } else {
        fields.push({
          object: node,
          value: null,
        });
      }
      setFields(fields);
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
        <div className="change-locale">
          <Radio.Group value={locale} onChange={(e) => changeLocale(e)}>
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
            <Form.Item
              label={locale[field.object.question]}
              key={field.object.id}
            >
              {field.object.answers && field.object.answers.length > 0 && (
                <Select
                  style={{ width: 480 }}
                  onChange={(e) => handleChange(e, idx)}
                >
                  {field.object.answers.map((answer) => {
                    return (
                      <Option value={answer.id} key={answer.id}>
                        {locale[answer.id]}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
          );
        })}
      </Form>
    </div>
  );
};
export default MedicalForm;
