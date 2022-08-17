import React, { useState, useEffect } from 'react';
import ContentList from './ContentList';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../redux/reducers/contentSlice';
import { FormGroup, Label, Col, Row, Input } from 'reactstrap';
export default function CreateContent() {
  const content = useSelector((state) => state.content);
  const [newtext, setText] = useState();

  let voices = window.speechSynthesis.getVoices();

  const [selLanguage, setSelLanguage] = useState();
  const [voice, setVoice] = useState([
    { voice: 'Male', code: '1' },
    { voice: 'Female', code: '2' },
    { voice: 'Child', code: '9' },
  ]);
  const [selVoice, setSelVoice] = useState(1);

  const onSelChange = (e) => {
    console.log(e.target.value);
    setSelLanguage(e.target.value);
  };
  const onSelVoiceChange = (e) => {
    console.log(e.target.value);
    setSelVoice(e.target.value);
  };

  const dispatch = useDispatch();
  const setTextArea = (e) => {
    setText(e.target.value);
  };

  return (
    <div style={{ backgroundColor: 'orange' }}>
      <h1>Create Content</h1>
      <FormGroup row>
        <Label for="exampleText" sm={12} lg={12}>
          Enter Your Content...
        </Label>
        <Col sm={12} lg={12}>
          <Input value={newtext} onChange={setTextArea} type="textarea" />
        </Col>
      </FormGroup>
      {/* <textarea rows="8" cols="20" value={newtext} onChange={setTextArea} /> */}
      <FormGroup>
        <Label for="exampleSelect">Select</Label>
        <Input id="voiceSelect" onChange={onSelChange} type="select">
          {voices &&
            voices.length > 0 &&
            voices.map((lang, key) => {
              return (
                <option key={lang.lang} value={lang.lang}>
                  {lang.name}
                </option>
              );
            })}
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="exampleSelect">Select</Label>
        <Input id="voice" onChange={onSelVoiceChange} type="select">
          {voice &&
            voice.length > 0 &&
            voice.map((lang, key) => {
              return (
                <option key={lang.voice} value={lang.code}>
                  {lang.voice}
                </option>
              );
            })}
        </Input>
      </FormGroup>

      <button
        type="button"
        onClick={() => {
          console.log({
            title: 'title of the content',
            text: newtext,
            language: selLanguage,
          });
          dispatch(
            addTodo({
              title: 'title of the content',
              text: newtext,
              language: selLanguage,
            })
          );
        }}
      >
        Save
      </button>
    </div>
  );
}
