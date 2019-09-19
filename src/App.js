import React, {Component} from 'react';
import './App.css';

import {validate, createControl} from './utils/form';

import FormGroup from "./components/FormGroup";
import Button from "./components/Button";
import DragAndDrop from "./components/DragAndDrop";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormValid: false,
      formControls: {
        subject: createControl({
          label: 'Тема письма',
          placeholder: 'Тест'
        }, {required: true}),
        nameFrom: createControl({
          label: 'Имя отправителя',
          placeholder: 'Иван'
        }, {required: true}),
        emailFrom: createControl({
          label: 'E-mail отправителя',
          placeholder: 'example@web.com',
          errorMessage: 'Введите корректный e-mail адрес.'
        }, {required: true, email: true}),
        nameTo: createControl({
          label: 'Имя получателя',
          placeholder: 'Василий'
        }, {required: true}),
        emailTo: createControl({
          label: 'E-mail получателя',
          placeholder: 'test@web.com',
          errorMessage: 'Введите корректный e-mail адрес.'
        }, {required: true, email: true}),
        message: createControl({
          type: 'textarea',
          label: 'Сообщение',
          placeholder: 'Привет! Как дела?',
          minLength: 15,
          maxLength: 150
        }, {required: true}),
        files: createControl({
          type: 'file',
          label: 'Выберите файл или перетащите мышкой',
          renderCallback: element => {
            return(
              <DragAndDrop handleDrop={this.handleDrop}>
                {element}
                <div id="file-preview" />
                {/*{this.state.files.map(file => (*/}
                {/*  <span>{file.name}</span>*/}
                {/*))}*/}
              </DragAndDrop>
            )
          },
          onChange: event => {
            this.handleFileUpload(event.target.files)
          }
        })
      },
      files: []
    };
  }

  handleFileUpload = files => {
    console.log(files);
    this.setState({ files: files });
  };

  handleDrop = files => {
    this.handleFileUpload(files)
  };

  onChangeHandler(event, controlName) {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.value = event.target.value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    });

    this.setState({
      formControls,
      isFormValid
    })
  };

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <FormGroup
          key={controlName + index}
          id={controlName}
          placeholder={control.placeholder}
          label={control.label}
          value={control.value}
          valid={control.valid}
          shouldValidate={!!control.validation}
          touched={control.touched}
          type={control.type}
          errorMessage={control.errorMessage}
          onChange={event => control.onChange(event) || this.onChangeHandler(event, controlName)}
          renderCallback={control.renderCallback}
        />
      )
    })
  }

  submitHandler = event => {
    event.preventDefault();

    let data = {};

    Object.keys(this.state.formControls).map(controlName => {
      const control = this.state.formControls[controlName];
      return data[controlName] = control.value;
    });

    console.log(data);
  };

  render() {
    return (
      <div className="App">
        <form style={{
          width: '80%',
          flex: '0 0 80%'
        }}>
          {this.renderControls()}
          <Button type="submit" onClick={this.submitHandler}>Отправить</Button>
        </form>
      </div>
    );
  }
}

export default App;
