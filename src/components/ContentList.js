import React, { useState, useEffect } from 'react';
import Speech from 'react-speech';
// import { data } from '../data/data.js';
// const fetch = require('node-fetch');
// import fetch from 'node-fetch';
// const getVoiceData = () => {
//   const url = 'https://api.lovo.ai/v1/conversion';
//   const data = {
//     text: 'hello world! my name is Martha Sage',
//     speaker_id: 'Martha Sage',
//     emphasis: '[0, 5]',
//     speed: 1,
//     pause: 0,
//     encoding: 'mp3',
//   };
//   const option = {
//     method: 'POST',
//     headers: {
//       apiKey:
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmEyNmRlM2JmNzMzMDAxMjY2MjUwMyIsImlhdCI6MTY2MDU2MTEyMTcxM30.sdLz_6D4DZSbg6cXObNRrKiwTNA47HQSRh51zCaO1Jw', // Your API key goes here
//       'Content-Type': 'application/json; charset=utf-8',
//     },
//     body: JSON.stringify(data),
//   };

//   fetch(url, option)
//     .then((res) => res.arrayBuffer())
//     .then((buffer) => {
//       //output filename goes below
//       console.log('sample created');
//       fs.appendFileSync('sample.mp3', Buffer.from(buffer));
//     })
//     .catch((error) => {
//       // error handling
//     });
// };
export const readText = function (text, voicetype = 83, lang) {
  let timer = null;
  let reading = false;
  if (!reading) {
    speechSynthesis.cancel();
    if (timer) {
      clearInterval(timer);
    }
    let msg = new SpeechSynthesisUtterance();
    let voices = window.speechSynthesis.getVoices();

    msg.voice = voices[voicetype];
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 1; //0 to 2
    msg.text = text;
    // msg.lang = 'en-US';
    msg.lang = lang;
    console.log(lang);

    msg.onerror = function (e) {
      speechSynthesis.cancel();
      reading = false;
      clearInterval(timer);
    };

    msg.onpause = function (e) {
      console.log('onpause in ' + e.elapsedTime + ' seconds.');
    };

    msg.onend = function (e) {
      // console.log('onend in ' + e.elapsedTime + ' seconds.');
      reading = false;
      clearInterval(timer);
    };

    speechSynthesis.onerror = function (e) {
      console.log('speechSynthesis onerror in ' + e.elapsedTime + ' seconds.');
      speechSynthesis.cancel();
      reading = false;
      clearInterval(timer);
    };

    speechSynthesis.speak(msg);

    timer = setInterval(function () {
      if (speechSynthesis.paused) {
        console.log('#continue');
        speechSynthesis.resume();
      }
    }, 100);

    reading = true;
  }
};
export default function ContentList({ data }) {
  const [languages, setLanguages] = useState([
    { language: 'English', code: 'en-us' },
    { language: 'kannada', code: 'kn-In' },
  ]);
  let voices = window.speechSynthesis.getVoices();

  const [selLanguage, setSelLanguage] = useState();
  const [voice, setVoice] = useState([
    { voice: 'Male', code: '1' },
    { voice: 'Female', code: '2' },
  ]);
  const [selVoice, setSelVoice] = useState();

  const style = {
    play: {
      button: {
        width: '28',
        height: '28',
        cursor: 'pointer',
        pointerEvents: 'none',
        outline: 'none',
        backgroundColor: 'yellow',
        border: 'solid 1px rgba(255,255,255,1)',
        borderRadius: 6,
      },
    },
  };
  const onSelChange = (e) => {
    console.log(e.target.value);
    setSelLanguage(e.target.value);
  };
  const onSelVoiceChange = (e) => {
    console.log(e.target.value);
    setSelVoice(e.target.value);
  };
  const Content = ({ item, count }) => {
    // i++;
    return (
      <div>
        <div>
          Content:{item.text}
          <button onClick={() => readText(item.text, selVoice, selLanguage)}>
            Play = {selVoice} - {selLanguage}
          </button>
          {/* <Speech
            text={item.text}
            styles={style.button}
            pitch="0.5"
            rate="0.5"
            volume="0.1"
            lang="en-GB"
            voice="Daniel"
            textAsButton={true}
          />
          <Speech
            text={item.text}
            styles={style.button}
            pitch="1"
            rate="1"
            volume="1"
            lang="en-Us"
            voice="Alice"
            voiceURI="native"
            textAsButton={true}
          /> */}
        </div>
        <div>Language:{item.language}</div>
      </div>
    );
  };
  let count = 0;
  // console.log(languages);
  return (
    <div>
      <h1>Content List</h1>
      {/* <button onClick={() => readText('hello world')}>Get Voice</button> */}
      {/* <button onClick={getLanguage}>get All Voice</button> */}
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
      <div>
        {data &&
          data.map((item, index) => {
            count++;
            return (
              <div key={index}>
                <Content item={item.content} count={count} />
                {/* <div>Created On:{item.created_at}</div> */}
              </div>
            );
          })}
      </div>
    </div>
  );
}
