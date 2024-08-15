import React, { createContext, useState } from 'react';

export const CursoContext = createContext();

export const CursoProvider = ({ children }) => {
    const [cursoDivisionBdRender, setCursoDivisionBdRender] = useState([]);

    return (
        <CursoContext.Provider value={{ cursoDivisionBdRender,setCursoDivisionBdRender }}>
            {children}
        </CursoContext.Provider>
    );
};
