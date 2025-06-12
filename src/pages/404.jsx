import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.section
      className="min-h-screen bg-[#0f0f0f] text-gray-300 flex items-center justify-center font-mono px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-xl w-full text-center">
        <h1 className="text-green-500 text-sm mb-2">
          user@nes ~/
          <span className="ml-2 text-white">cd /404</span>
        </h1>

        <p className="text-red-500">↳ error: path not found</p>

        <p className="mt-6 text-gray-500">
          this page doesn’t exist.<br />
          you can go <Link to="/" className="text-green-400 underline">home</Link> if you want.
        </p>

        <div className="mt-12 text-xs opacity-10 select-none">
          <pre>
{`
[ system.log ]
> 404
> no index.js
> nothing was here
`}
          </pre>
        </div>
      </div>
    </motion.section>
  );
};

export default NotFound;
