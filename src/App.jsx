import React, { useState } from 'react';
import PapelPicado from './components/PapelPicado';
import LoteriaCard from './components/LoteriaCard';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxLry5Acnt_HF9gVRHybAhAQEwPQW2dtawjXHibAdvtFZ8zCGP-KfVu_mraS83FERzr_w/exec";

export default function App() {
  const [nombre, setNombre] = useState('');
  const [numAcompanantes, setNumAcompanantes] = useState('2');
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [statusTitle, setStatusTitle] = useState('¡Ya rugiste, león!');
  const [statusIcon, setStatusIcon] = useState('🎊');
  const [showModal, setShowModal] = useState(false);

  const enviarRespuesta = (estado, cantidadPersonas) => {
    const nombreFinal = nombre.trim();

    // Obligatorio para cualquier carta
    if (!nombreFinal) {
      setShowModal(true);
      return;
    }

    const esAusente = estado.includes('No');

    if (esAusente) {
      setStatusTitle("¡Ni hablar, mi burrito sabanero!");
      setStatusIcon("🫏");
      setSuccessMessage(`Enterados, ${nombreFinal}. Qué tristeza que no nos puedas acompañar, pero nos comeremos un buen tamalito y nos echaremos un shot en tu honor. ¡Te vamos a extrañar en la posada! 🫔🥃`);
    } else {
      setStatusTitle("¡Ya rugiste, león!");
      setStatusIcon("🎊");
      setSuccessMessage(`¡Sobres, ${nombreFinal}! Apuntado con ${cantidadPersonas} lugar(es). Vete afinando la garganta para los villancicos. 🎶`);
    }
    setSubmitted(true);

    if (SCRIPT_URL && !SCRIPT_URL.includes('TU_WEB_APP_URL')) {
      fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombreFinal || "Ausente anónimo",
          estatus: estado,
          personas: cantidadPersonas,
          fecha: new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }),
        }),
      }).catch((err) => console.log('Error', err));
    }
  };

  return (
    <div className="min-h-screen text-slate-900 flex items-center justify-center p-3 sm:p-4 py-8 sm:py-12">
      <div className="max-w-lg w-full bg-[#fffbeb] border-4 border-slate-900 sombra-dura p-4 sm:p-6 md:p-8 relative z-10">
        <PapelPicado />

        {/* Piñata Central */}
        <div>
          <img src="img/pinata-posada-plana.png" alt="Piñata Central" className="w-48 sm:w-60 md:w-72 h-auto mx-auto object-contain drop-shadow-md" />
        </div>

        {/* Encabezado */}
        <div className="text-center mb-5 sm:mb-6">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-purple-700 mb-1">¡Confirma tu asistencia!</p>
          <h1 className="font-rotulo text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-tight mb-3 sm:mb-4 drop-shadow-sm">
            Posada Rivas Vol 2.0
          </h1>
          <p className="font-bold text-slate-900 text-sm sm:text-base md:text-lg bg-yellow-400 inline-block px-3 py-1.5 sm:px-4 sm:py-2 border-2 border-slate-900 rotate-2 sombra-dura-sm">
            19 de Diciembre, 2026 | 7:00 P.M.
          </p>
        </div>

        {!submitted ? (
          <div className="space-y-4 sm:space-y-6">
            {/* Campo de Nombre */}
            <div className="bg-cyan-200 p-3 sm:p-4 border-4 border-slate-900 sombra-dura-sm transform -rotate-1">
              <label className="block text-xs sm:text-sm font-bold text-slate-900 uppercase mb-1.5">
                Nombre del invitado(a), o sea tú mero:
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Emiliano Rivas..."
                className="w-full bg-white border-2 border-slate-900 px-3 py-2 text-base sm:text-xl font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-pink-500 transition-all"
              />
            </div>

            <label className="block text-center text-xs sm:text-sm font-bold text-slate-900 uppercase mt-4 sm:mt-6 mb-2 bg-white border-2 border-slate-900 py-1 mx-4 sm:mx-8 rounded-full">
              Tira tu carta:
            </label>

            {/* Grid de Cartas de Lotería */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:gap-6">
              {/* Carta 1: El Valiente */}
              <LoteriaCard
                numero={1}
                titulo="El Valiente"
                subtitulo="(Sí confirmo, voy solo)"
                imagen="/img/el-valiente.svg"
                bgClase="bg-cyan-400"
                textoBoton="Confirmar Solo"
                onClick={() => enviarRespuesta('Sí, voy solo(a)', 1)}
              />

              {/* Carta 2: La Bola */}
              <LoteriaCard
                numero={2}
                titulo="La Bola"
                subtitulo="(Voy acompañado)"
                imagen="/img/la-bola.svg"
                bgClase="bg-pink-500"
              >
                <select
                  value={numAcompanantes}
                  onChange={(e) => setNumAcompanantes(e.target.value)}
                  className="w-full bg-white text-slate-900 text-[11px] sm:text-xs md:text-sm font-bold border-2 border-slate-900 p-1 sm:p-1.5 focus:outline-none cursor-pointer"
                >
                  <option value="2">+1 (Somos 2)</option>
                  <option value="3">+2 (Somos 3)</option>
                  <option value="4">+3 (Somos 4)</option>
                  <option value="5">+4 o más</option>
                </select>
                <button
                  type="button"
                  onClick={() => enviarRespuesta(`Sí, voy con ${numAcompanantes} personas`, parseInt(numAcompanantes))}
                  className="w-full bg-slate-900 text-yellow-400 font-rotulo uppercase text-[9px] sm:text-[10px] md:text-xs py-1.5 sm:py-2 border-2 border-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Confirmar Bola
                </button>
              </LoteriaCard>

              {/* Carta 3: El Ausente */}
              <button
                type="button"
                onClick={() => enviarRespuesta('No podré asistir', 0)}
                className="bg-purple-500 p-2 sm:p-3 border-4 border-slate-900 sombra-dura transition-all text-left col-span-2 mx-auto w-full group hover:-translate-y-1 mt-1 sm:mt-2 cursor-pointer"
              >
                <div className="border-4 border-slate-900 bg-white p-2 h-18 sm:h-20 md:h-24 flex flex-row items-center justify-center relative gap-3 sm:gap-4">
                  <span className="absolute top-1 left-1 text-xs sm:text-sm font-bold text-slate-900">3</span>
                  <img src="/img/el-ausente.svg" alt="El Ausente" className="h-14 sm:h-16 md:h-20 object-contain group-hover:scale-105 transition-transform" />
                  <div className="text-center">
                    <p className="font-rotulo text-slate-900 uppercase text-sm sm:text-base md:text-lg leading-tight">El Ausente</p>
                    <p className="text-[11px] sm:text-xs font-bold text-slate-600">(Me es imposible ir)</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 space-y-6">
            <div className="text-7xl animate-bounce">{statusIcon}</div>
            <h2 className={`font-rotulo text-3xl md:text-4xl ${statusIcon === '🫏' ? 'text-purple-700' : 'text-pink-600'} leading-tight`}>
              {statusTitle}
            </h2>
            <p className="text-slate-900 font-bold text-xl leading-relaxed bg-yellow-400 p-4 border-4 border-slate-900 rotate-2 sombra-dura-sm">
              {successMessage}
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 underline mt-4 cursor-pointer"
            >
              Cambiar mi respuesta
            </button>
          </div>
        )}
      </div>

      {/* Modal de Validación: Falta Nombre */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="max-w-sm w-full bg-[#fffbeb] border-4 border-slate-900 sombra-dura p-6 text-center transform -rotate-1 relative">
            <div className="text-5xl mb-3">🤠</div>
            <h3 className="font-rotulo text-2xl md:text-3xl text-pink-600 mb-2 leading-tight">
              ¡Epa, pariente!
            </h3>
            <p className="font-bold text-slate-800 text-sm leading-relaxed mb-5">
              No tires tu carta todavía. Primero pon tu <span className="bg-yellow-300 px-1 border border-slate-900">nombre o apodo</span> para saber a quién apartarle su tamalito en la lista.
            </p>
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                const el = document.getElementById('nombre');
                if (el) el.focus();
              }}
              className="w-full bg-slate-900 text-yellow-400 font-rotulo uppercase text-sm py-2.5 px-4 border-2 border-slate-900 sombra-dura-sm hover:bg-slate-800 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            >
              ¡Cámara, ahorita lo pongo! ✍️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
