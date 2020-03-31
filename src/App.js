import React from "react";
import "./App.css";
import { Row } from 'antd';
import MedicalForm from "./Medical-form";

function App() {
  return (
    <div className="App">
      <Row type="flex" justify="center" align="middle">
        <MedicalForm></MedicalForm>
      </Row>
    </div>
  );
}

export default App;
