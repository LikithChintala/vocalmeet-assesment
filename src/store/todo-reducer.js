import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      return [...state, action.payload];
    },
    updateTodo: (state, action) => {
      const newValues = [...state].map((todo) =>
        todo.key === action.payload?.key
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );
      return newValues;
    },
    deleteTodo: (state, action) => {
      const newValues = [...state].filter(
        (todo) => todo.key !== action.payload?.key
      );
      return newValues;
    }
  }
});

// Action creators are generated for each case reducer function
export const { addTodo, deleteTodo, updateTodo } = todo.actions;

export const selectCount = (state) =>
  state.todos?.filter((a) => a.isCompleted).length || 0;

export const selectTodos = (state) => state.todos;
export default todo.reducer;
