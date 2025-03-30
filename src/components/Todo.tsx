import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, updateTodo } from "../StoreSlices/StoreSlics";
import { rootState } from "../store/store";

const TodoApp: React.FC = () => {
  
  const [input, setInput] = useState<string>('');
  const [editInput, setEditInput] = useState<string>('');
  const [editId, setEditId] = useState<number | null>(null);

  const todos = useSelector((state: rootState) => state.todo.todos);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput("");
    }
  };

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editInput.trim() && editId !== null) {
      dispatch(updateTodo({ id: editId, text: editInput }));
      setEditId(null);
      setEditInput("");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-xl p-6 rounded-2xl">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Todo List</h1>


        <form onSubmit={handleSubmit}>
          <div className="flex gap-2 mb-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Add a new task..."
              className="flex-1 p-2 rounded-lg border border-gray-300"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add</button>
          </div>
        </form>


        <div className="space-y-3">
          {todos.map((todo) => (
            <div key={todo.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-200">
              {editId === todo.id ? (
                <form onSubmit={handleUpdateSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    className="flex-1 p-2 rounded-lg border border-gray-300"
                  />
                  <button type="submit" className="bg-green-500 text-white p-2 rounded-lg">✔</button>
                  <button
                    type="button"
                    onClick={() => setEditId(null)}
                    className="bg-gray-500 text-white p-2 rounded-lg"
                  >
                    ✖
                  </button>
                </form>
              ) : (
                <>
                  <span className="text-gray-700">{todo.text}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditId(todo.id);
                        setEditInput(todo.text);
                      }}
                      className="bg-yellow-500 text-white p-2 rounded-lg"
                    >
                      ✏
                    </button>
                    <button
                      onClick={() => dispatch(removeTodo(todo.id))}
                      className="bg-red-500 text-white p-2 rounded-lg"
                    >
                      ✖
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
