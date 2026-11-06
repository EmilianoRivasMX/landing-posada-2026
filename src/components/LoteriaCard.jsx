import React from 'react';

export default function LoteriaCard({
  numero,
  titulo,
  subtitulo,
  imagen,
  bgClase,
  textoBoton,
  onClick,
  children,
}) {
  return (
    <div className={`${bgClase} p-2 md:p-3 border-4 border-slate-900 sombra-dura transition-all group hover:-translate-y-1 flex flex-col justify-between`}>
      <div className="w-full">
        <div className="border-4 border-slate-900 bg-white p-2 h-28 md:h-32 flex flex-col items-center justify-center relative">
          <span className="absolute top-1 left-1 text-sm font-bold text-slate-900">{numero}</span>
          <img src={imagen} alt={titulo} className="h-20 md:h-24 object-contain group-hover:scale-105 transition-transform" />
        </div>
        <div className="bg-white border-x-4 border-b-4 border-slate-900 -mt-1 pt-1 pb-1 mb-2">
          <p className="text-center font-rotulo text-slate-900 uppercase text-sm md:text-base">{titulo}</p>
          <p className="text-center text-[10px] font-bold text-slate-600 leading-tight">{subtitulo}</p>
        </div>
      </div>

      {children ? (
        <div className="w-full flex-grow flex flex-col justify-between space-y-2">
          {children}
        </div>
      ) : (
        <div className="w-full pt-1">
          <button
            type="button"
            onClick={onClick}
            className="w-full bg-slate-900 text-yellow-400 font-rotulo uppercase text-[10px] md:text-xs py-2 text-center border-2 border-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {textoBoton}
          </button>
        </div>
      )}
    </div>
  );
}
