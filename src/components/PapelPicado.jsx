import React from 'react';

export default function PapelPicado() {
  return (
    <div className="absolute -top-10 left-0 w-full flex justify-around px-2 pointer-events-none">
      <svg className="w-16 h-16 text-cyan-500 drop-shadow-md rotate-[-5deg]" viewBox="0 0 100 100" fill="currentColor">
        <path d="M10,10 h80 v70 l-10,-10 l-10,10 l-10,-10 l-10,10 l-10,-10 l-10,10 l-10,-10 l-10,10 v-70z"/>
        <circle cx="30" cy="40" r="8" fill="#fffbeb"/><circle cx="70" cy="40" r="8" fill="#fffbeb"/>
        <rect x="40" y="60" width="20" height="10" fill="#fffbeb"/>
      </svg>
      <svg className="w-16 h-16 text-yellow-400 drop-shadow-md rotate-[8deg]" viewBox="0 0 100 100" fill="currentColor">
        <path d="M10,10 h80 v70 l-10,-10 l-10,10 l-10,-10 l-10,10 l-10,-10 l-10,10 l-10,-10 l-10,10 v-70z"/>
        <path d="M50,25 l15,25 h-30 z" fill="#fffbeb"/><circle cx="50" cy="65" r="8" fill="#fffbeb"/>
      </svg>
      <svg className="w-16 h-16 text-purple-600 drop-shadow-md rotate-[-12deg]" viewBox="0 0 100 100" fill="currentColor">
        <path d="M10,10 h80 v70 l-10,-10 l-10,10 l-10,-10 l-10,10 l-10,-10 l-10,10 l-10,-10 l-10,10 v-70z"/>
        <circle cx="50" cy="45" r="15" fill="#fffbeb"/><circle cx="50" cy="45" r="5" fill="currentColor"/>
      </svg>
      <svg className="w-16 h-16 text-green-500 drop-shadow-md rotate-[5deg] hidden md:block" viewBox="0 0 100 100" fill="currentColor">
        <path d="M10,10 h80 v70 l-10,-10 l-10,10 l-10,-10 l-10,10 l-10,-10 l-10,10 l-10,-10 l-10,10 v-70z"/>
        <rect x="30" y="30" width="15" height="15" fill="#fffbeb"/><rect x="55" y="30" width="15" height="15" fill="#fffbeb"/>
        <rect x="30" y="55" width="40" height="15" fill="#fffbeb"/>
      </svg>
    </div>
  );
}
