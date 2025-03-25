import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, updateItem, deleteItem } from './slices/itemSlice';

const ItemsList = () => {
  const items = useSelector(state => state.items.items);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState('');

  const handleAdd = () => {
    if (input) {
      dispatch(addItem({ name: input }));
      setInput('');
    }
  };

  const handleEdit = (id, name) => {
    setEditId(id);
    setEditInput(name);
  };

  const handleUpdate = (id) => {
    dispatch(updateItem({ id, name: editInput }));
    setEditId(null);
    setEditInput('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Redux Toolkit (RTK) CRUD
      </h1>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter item name"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      {items.length > 0 ? (
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
          <table className="w-full border-collapse border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-blue-100 text-blue-800">
                <th className="border border-gray-200 px-4 py-2 text-left">Item Name</th>
                <th className="border border-gray-200 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border border-gray-200 hover:bg-gray-100 transition">
                  <td className="border border-gray-200 px-4 py-2">
                    {editId === item.id ? (
                      <input
                        type="text"
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                        className="p-1 border border-gray-300 rounded w-full"
                      />
                    ) : (
                      <span className="text-gray-800">{item.name}</span>
                    )}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    {editId === item.id ? (
                      <button
                        onClick={() => handleUpdate(item.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition mr-2"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(item.id, item.name)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition mr-2"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => dispatch(deleteItem(item.id))}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No items found. Add some!</p>
      )}
    </div>
  );
};

export default ItemsList;
