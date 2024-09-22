import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { GrLocation } from "@react-icons/all-files/gr/GrLocation";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import { IoMdMail } from "@react-icons/all-files/io/IoMdMail";
import { GiRotaryPhone } from "react-icons/gi";

export const Institucional = () => {
  return (
    <>
      <Header />
      <Navbar />

      {/* Historia */}
      <section className="bg-light text-gray-800 px-4 md:px-8 py-10 md:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6">Historia</h2>
          <p className="leading-relaxed text-base md:text-lg text-justify">
          En 2019, para atender la creciente demanda educativa, en nuestra localidad de Rincón de los Sauces, se fundó la EPET 24. La escuela inició con 50 estudiantes de primer año y una orientación técnica general. Con el tiempo, en respuesta al avance tecnológico en la región, la institución adoptó la especialización en programación. Cinco años después de su creación, la EPET 24 se ha consolidado como un centro educativo destacado, formando a sus estudiantes para afrontar los retos del ámbito tecnológico, aunque aún no ha graduado a su primera promoción.
          </p>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="bg-gray-100 text-darkBlue px-4 md:px-8 py-10 md:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6">Misión y Visión</h2>
          <div className="mb-4">
            <h3 className="text-xl md:text-2xl font-semibold">Misión</h3>
            <p className="leading-relaxed text-base md:text-lg">
              Formar profesionales competentes en el área de programación y tecnología, impulsando la innovación y la creatividad.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl md:text-2xl font-semibold">Visión</h3>
            <p className="leading-relaxed text-base md:text-lg">
              Ser un referente en educación técnica y en la formación de futuros programadores, fomentando la excelencia y el
              desarrollo profesional.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-green-50 text-darkGreen px-4 md:px-8 py-10 md:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6">Valores</h2>
          <p className="leading-relaxed text-base md:text-lg text-justify">
            Promovemos la innovación, el trabajo en equipo, la responsabilidad, la creatividad y la ética profesional en
            todos nuestros estudiantes.
          </p>
        </div>
      </section>

      {/* Oferta Educativa */}
      <section className="bg-white text-gray-800 px-4 md:px-8 py-10 md:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6">Oferta Educativa</h2>
          <p className="leading-relaxed text-base md:text-lg text-justify">
            La especialidad en programación ofrece conocimientos en desarrollo de software, bases de datos, programación web
            y uso de herramientas de desarrollo modernas.
          </p>
        </div>
      </section>

      {/* Equipo Directivo y Docente */}
      <section className="bg-blue-50 text-blue-800 px-4 md:px-8 py-10 md:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6">Equipo Directivo</h2>
          <ul className="list-disc pl-5 md:pl-10 text-base md:text-lg">
            <li>Directora: Prof. Mónica Canchi.</li>
            <li>Vice director: Prof. Carlos Gimenez.</li>
            <li>Jefe Gral de Enseñanza Práctica: Prof. Pablo Lucero.</li>
            <li>Jefe de Sección: Prof. Jose Arredondo.</li>
            <li>Secretaria: Prof. Mirna Fuentes.</li>
          </ul>
        </div>
      </section>

      {/* Infraestructura y Recursos */}
      <section className="bg-purple-50 text-purple-800 px-4 md:px-8 py-10 md:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6">Infraestructura y Recursos</h2>
          <p className="leading-relaxed text-base md:text-lg text-justify">
            Contamos con laboratorios de computación modernos equipados con las últimas tecnologías para que los estudiantes
            puedan desarrollar sus habilidades.
          </p>
        </div>
      </section>

      {/* Proyectos y Actividades */}
      <section className="bg-yellow-50 text-yellow-800 px-4 md:px-8 py-10 md:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6">Proyectos y Actividades</h2>
          <p className="leading-relaxed text-base md:text-lg text-justify">
            Los estudiantes participan en proyectos, competencias, exposiciones y ferias tecnológicas, recibiendo
            reconocimientos y premios.
          </p>
        </div>
      </section>

      {/* Convenios y Alianzas */}
      <section className="bg-pink-50 text-pink-800 px-4 md:px-8 py-10 md:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6">Convenios y Alianzas</h2>
          <p className="leading-relaxed text-base md:text-lg text-justify">
            La escuela cuenta con convenios y alianzas con empresas, (Tecpetrol, ExxonMobil) universidades (Uflo) e instituciones que enriquecen la
            formación de los estudiantes.
          </p>
        </div>
      </section>

     
      {/* Contacto */}
      <section className="bg-indigo-50 text-indigo-800 px-4 md:px-8 py-10 md:py-16 text-center">
  <div className="max-w-5xl mx-auto">
    <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6">Contacto</h2>
    <div className="leading-relaxed text-base md:text-lg text-center">
      <p className="mb-4">Información de contacto:</p>
      
      <div className="flex justify-center items-center mb-2">
        <a href="https://wa.me/+5492995866948" target="_blank" className="flex items-center space-x-2">
          <GiRotaryPhone style={{ height: '40px', color: 'black' }} />
          <span className="font-bold">2995866948</span>
        </a>
      </div>
      
      <div className="flex justify-center items-center mb-2">
        <a href="mailto:epet024@neuquen.edu.ar" className="flex items-center space-x-2">
          <IoMdMail style={{ height: '40px', color: 'black' }} />
          <span className="font-bold">epet024@neuquen.edu.ar</span>
        </a>
      </div>
      
      <div className="flex justify-center items-center mb-2">
        <a href="https://whatsapp.com/channel/0029VaawCkRHltY48468q50S" className="flex items-center space-x-2">
          <FaWhatsapp style={{ height: '40px', color: 'green' }} />
          <span>Únete a nuestro Canal de WhatsApp</span>
        </a>
      </div>
      
      <div className="flex justify-center items-center mb-2">
        <GrLocation style={{ height: '40px', color: 'red' }} />
        <span className="font-bold">José Hernández 941 - Rincón de los Sauces - Neuquén</span>
      </div>
      
    </div>
    
    <div className="mt-5 flex justify-center">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50722.44565064275!2d-68.99057227832031!3d-37.3862173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967381717d4ae573%3A0xc86a7fc25cf4c265!2sEPET%20N%C2%B0%2024%20(anexo)!5e0!3m2!1ses-419!2sar!4v1726926323421!5m2!1ses-419!2sar"
        width="600"
        height="450"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</section>


      <Footer />
    </>
  );
};

