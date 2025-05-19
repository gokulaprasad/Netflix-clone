import React from 'react';

export default function TrailerModal({ trailerUrl, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 left-4 text-black text-2xl bg-white bg-opacity-60 px-3 py-2 hover:bg-opacity-90 cursor-pointer rounded-full"
      >
        ←
      </button>

      {/* Trailer Video */}
      <div className="w-[90%] max-w-4xl aspect-video">
        <iframe
          src={trailerUrl}
          title="Trailer"
          className="w-full h-full rounded"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
