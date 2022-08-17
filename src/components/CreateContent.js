import React, { useState, useEffect } from 'react';
import ContentList from './ContentList';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../redux/reducers/contentSlice';

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
    <div>
      <h1>Create Content</h1>
      <textarea rows="8" cols="20" value={newtext} onChange={setTextArea} />
      <select id="voiceSelect" onChange={onSelChange}>
        {voices &&
          voices.length > 0 &&
          voices.map((lang, key) => {
            return (
              <option key={lang.lang} value={lang.lang}>
                {lang.name}
              </option>
            );
          })}
      </select>
      <select id="voice" onChange={onSelVoiceChange}>
        {voice &&
          voice.length > 0 &&
          voice.map((lang, key) => {
            return (
              <option key={lang.voice} value={lang.code}>
                {lang.voice}
              </option>
            );
          })}
      </select>
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
