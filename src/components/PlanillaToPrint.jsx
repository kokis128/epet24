
import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export const PlanillaToPrint = () => {

    const [data, setData] = useState(null);
    const componentRef = useRef();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/planillas/:id'); // Reemplaza ':id' con el id de la materia correspondiente
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    if (!data) return <div>Cargando...</div>;




  return (
    <div>PlanillaToPrint</div>
  )
}
