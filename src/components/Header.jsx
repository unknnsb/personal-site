"use client";
import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from 'framer-motion';

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <motion.header 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
      className="container-pro pt-16 pb-12 flex justify-between items-center"
    >
      {!isHome ? (
        <Link href="/" className="font-mono text-[11px] tracking-[0.2em] text-muted hover:text-text transition-all underline decoration-transparent hover:decoration-muted underline-offset-4">
          ← BACK
        </Link>
      ) : (
        <div /> 
      )}
      <nav className="flex gap-6 font-mono text-[11px] tracking-[0.2em]">
        <Link href="/works" className="text-muted hover:text-text transition-colors">WORKS</Link>
        <Link href="/journal" className="text-muted hover:text-text transition-colors">JOURNAL</Link>
      </nav>
    </motion.header>
  );
};

export default Header;
