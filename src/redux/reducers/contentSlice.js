// import { createSlice } from '@reduxjs/toolkit';

// const initialState = { content: [] };

// const contentSlice = createSlice({
//   name: 'content',
//   initialState,
//   reducers: {
//     addTodo: {
//       reducer: (state, action) => {
//         state.content.push(action.payload);
//       },
//       // prepare: (text) => {
//       //   const id = nanoid();
//       //   return { payload: { id, text } };
//       // },
//     },
//   },
// });

// export const { addTodo } = contentSlice.actions;
// export default contentSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { data } from '../../data/data.js';
import { nanoid } from 'nanoid';

export const contentSlice = createSlice({
  name: 'content',
  initialState: [],
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.push(action.payload);
        // localStorage.setItem('data', action.payload);
      },
      prepare: (content) => {
        const id = nanoid() + 1;
        return { payload: { id, content } };
      },
    },
  },
});

export const { addTodo } = contentSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const addTodoAsync = (state) => (dispatch) => {
  setTimeout(() => {
    dispatch(addTodo(state));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

export default contentSlice.reducer;
