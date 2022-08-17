import React, { useState, useEffect } from 'react';
import ContentList from './ContentList';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../redux/reducers/contentSlice';

export default function CreateContent() {
  const content = useSelector((state) => state.content);
  const [newtext, setText] = useState();

  const dispatch = useDispatch();
  const setTextArea = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <h1>Create Content</h1>
      <textarea rows="8" cols="20" value={newtext} onChange={setTextArea} />

      <button
        type="button"
        onClick={() =>
          dispatch(
            addTodo({
              title: 'title of the content',
              text: newtext,
              language: 'kn-in',
            })
          )
        }
      >
        Save
      </button>
      <ContentList data={content} />
    </div>
  );
}
