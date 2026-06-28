"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
      className="container-pro"
    >
      <div className="py-12 md:py-20 flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-3xl sm:text-4xl tracking-widest text-text mb-4 lowercase">
          404
        </h1>
        <p className="font-serif text-lg text-muted italic mb-12">
          not found.
        </p>

        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.2em] text-muted hover:text-text transition-all underline decoration-transparent hover:decoration-muted underline-offset-4"
        >
          back home
        </Link>
      </div>
    </motion.section>
  );
};

export default NotFound;
