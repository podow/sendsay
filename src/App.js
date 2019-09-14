import React from 'react';
import './App.css';
import FormGroup from "./components/FormGroup";
import Button from "./components/Button";

function App() {
  return (
    <div className="App">
        <form style={{
            width: '80%',
            flex: '0 0 80%'
        }}>
          <FormGroup label="Тема письма" placeholder="Тест" id="subject" />
          <FormGroup label="Имя отправителя" placeholder="Иван" id="nameFrom" />
          <FormGroup label="E-mail отправителя" placeholder="example@web.com" id="emailFrom" />
          <FormGroup label="Имя получателя" placeholder="Василий" id="nameTo" />
          <FormGroup label="E-mail получателя" placeholder="test@web.com" id="emailTo" />
          <FormGroup label="Сообщение" type="textarea" placeholder="Привет! Как дела?" id="message" />
          <FormGroup label="Прикрепленные файлы" type="file" id="file" />
          <Button>Отправить</Button>
        </form>
    </div>
  );
}

export default App;
