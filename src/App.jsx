import React from "react";
import { motion } from "framer-motion";

const App = () => {
  return (
    <section id="about" className="min-h-screen bg-[#eee] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center p-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Me</h2>
        <p className="text-gray-700">
          Hello, my name is Nesbeer (Nesbro) and I am 15 years old. The three areas that I am interested in the most are technology, cinema, and design. I love combining creative sides with technical ones: designing solutions in perfect code, talking about filmmaking, and creating something pretty.
          I am on the way to becoming a full-stack developer, and I am concentrating on creating frameworks such as ReactJS, Next.js, and TailwindCSS. I focus my projects on a minimal, functional, and somewhat artistic basis. But aside from coding, I focus more on cinema, philosophy, and the image system.
        </p>
      </motion.div>
    </section>
  )
}

export default App
