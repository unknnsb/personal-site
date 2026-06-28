"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PosterModal = ({ isOpen, onClose, movieId, slug, title, onSelect }) => {
  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !movieId) return;

    const fetchPosters = async () => {
      setLoading(true);
      const tmdbKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${tmdbKey}`);
        const json = await res.json();
        setPosters(json.posters || []);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };

    fetchPosters();
  }, [isOpen, movieId]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#080808]/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className="bg-[#111] border border-border/50 rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-2xl text-text lowercase tracking-wide">
              {title} <span className="text-text/30 font-mono text-sm uppercase">/ select poster</span>
            </h2>
            <button onClick={onClose} className="text-text/50 hover:text-text font-mono text-sm uppercase tracking-widest transition-colors">
              close
            </button>
          </div>

          {loading ? (
            <p className="font-mono text-xs text-text/30 tracking-widest text-center py-20">loading posters...</p>
          ) : posters.length === 0 ? (
            <p className="font-mono text-xs text-text/30 tracking-widest text-center py-20">no alternative posters found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {posters.map((poster, idx) => (
                <button
                  key={poster.file_path}
                  onClick={() => {
                    onSelect(slug, poster.file_path);
                    onClose();
                  }}
                  className="relative group aspect-[2/3] overflow-hidden rounded border border-transparent hover:border-text/50 transition-colors"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${poster.file_path}`}
                    alt={`Poster ${idx + 1}`}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PosterModal;
