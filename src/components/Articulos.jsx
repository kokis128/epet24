import React, { useState, useEffect } from 'react';

export const NewArticle = ({ title, text, id }) => {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    const newArticle = { id, title, text };

    // Verificar si el artículo ya existe en el array
    const exists = articulos.some((article) => article.id === id);

    if (!exists) {
      // Si el artículo no existe, lo agregamos
      setArticulos((prevArticulos) => [...prevArticulos, newArticle]);
    }
  }, [id, title, text, articulos]); // Agregar 'articulos' como dependencia

  return (
    <div className="p-4 border rounded-md mb-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <p>{text}</p>

      <h4 className="mt-4 font-bold">Lista de Artículos</h4>
      <ul>
        {articulos.map((item) => (
          <li key={item.id} className="border-b py-2">
            <strong>{item.title}:</strong> {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
