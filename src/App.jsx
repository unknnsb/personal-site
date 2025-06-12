import React from "react";
import { motion } from "framer-motion";

const App = () => {
  return (
    <section
      id="about"
      className="min-h-screen bg-[#0f0f0f] text-gray-300 flex items-center justify-center font-mono"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-center max-w-xl px-8"
      >
        <h2 className="text-2xl mb-6 tracking-wide text-gray-500 uppercase">
          Wnabe’Eliot
        </h2>

        <span className="text-sm text-goth-red tracking-widest">[ fsociety ]</span>

        <p className="text-md leading-relaxed text-gray-400 mt-4">
          my name’s nesbeer. 15. building things on a phone.<br /><br />
          i love coding, cinema, design — all the stuff no one around me gets. <br /><br />
          not trying to be a dev god. just making things i’d wanna use.<br /><br />
          i work with react, next, tailwind.<br /><br />
          <span className="text-gray-600 text-sm italic">‘i don’t exist in real life.’</span>
        </p>
      </motion.div>
    </section>
  );
};

export default App;
