import React from 'react';
// import { data } from '../data/data.js';
const fetch = require('node-fetch');
import fetch from 'node-fetch';
const getVoiceData = () => {
  const url = 'https://api.lovo.ai/v1/conversion';
  const data = {
    text: 'hello world! my name is Martha Sage',
    speaker_id: 'Martha Sage',
    emphasis: '[0, 5]',
    speed: 1,
    pause: 0,
    encoding: 'mp3',
  };
  const option = {
    method: 'POST',
    headers: {
      apiKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmEyNmRlM2JmNzMzMDAxMjY2MjUwMyIsImlhdCI6MTY2MDU2MTEyMTcxM30.sdLz_6D4DZSbg6cXObNRrKiwTNA47HQSRh51zCaO1Jw', // Your API key goes here
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  };

  fetch(url, option)
    .then((res) => res.arrayBuffer())
    .then((buffer) => {
      //output filename goes below
      console.log('sample created');
      fs.appendFileSync('sample.mp3', Buffer.from(buffer));
    })
    .catch((error) => {
      // error handling
    });
};

export default function ContentList({ data }) {
  console.log(data);
  const playText = () => {
    console.log('hello world');
    getVoiceData();
  };
  const Content = ({ item }, index) => {
    return (
      <div>
        <div>
          Content:
          {/* {item.title.toUpperCase()} */}
          {item.text}
          <button type="button" onClick={playText}>
            Play
          </button>
        </div>
        <div>Language:{item.language}</div>
      </div>
    );
  };
  return (
    <div>
      <h1>Content List</h1>
      <div>
        {data &&
          data.map((item, index) => {
            return (
              <div key={index}>
                <Content item={item.content} />
                {/* <div>Created On:{item.created_at}</div> */}
              </div>
            );
          })}
      </div>
    </div>
  );
}
