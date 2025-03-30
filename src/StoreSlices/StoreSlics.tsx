import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Todo {
  id: number;
  text: string;
}


interface TodoState {
  todos: Todo[];
}


const initialState: TodoState = {
  todos: [],
};


const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now(), // Unique ID
        text: action.payload,
      });
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const { id, text } = action.payload;
      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      );
    }
  },


});


export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
