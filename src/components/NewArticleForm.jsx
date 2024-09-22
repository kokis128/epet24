import React, { useState, useEffect } from 'react';

const NewArticleForm = ({ articleToEdit, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (articleToEdit) {
      setTitle(articleToEdit.title);
      setText(articleToEdit.text);
    } else {
      setTitle('');
      setText('');
    }
  }, [articleToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArticle = {
      id: articleToEdit ? articleToEdit.id : Date.now(),
      title,
      text
    };
    onSave(newArticle);
    setTitle('');
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">{articleToEdit ? 'Editar Artículo' : 'Agregar Artículo'}</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Texto</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded text-black"
          rows="4"
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white py-1 px-3 rounded hover:bg-gray-500">
          Cancelar
        </button>
        <button type="submit" className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
          {articleToEdit ? 'Actualizar' : 'Agregar'}
        </button>
      </div>
    </form>
  );
};

export default NewArticleForm;
