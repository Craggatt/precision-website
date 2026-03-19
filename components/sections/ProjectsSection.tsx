"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import CornerSquares from "../CornerSquares";

const projects = [
  {
    name: "Crossroads Hotel",
    type: "Hotel · Overbank Signage",
    location: "Casula, NSW",
    image:
      "https://precisionsigns.com.au/wp-content/uploads/2025/07/Crossroads-Hotel-Casula-highres-18-scaled.jpg",
  },
  {
    name: "Gaming Floor Install",
    type: "Club · LED Displays",
    location: "Sydney, NSW",
    image:
      "https://precisionsigns.com.au/wp-content/uploads/2025/12/vlcsnap-2025-11-26-11h53m38s739-500x333.png",
  },
  {
    name: "Casino Overbank",
    type: "Casino · Entry Signage",
    location: "Australia",
    image:
      "https://precisionsigns.com.au/wp-content/uploads/2025/12/vlcsnap-2025-11-26-11h52m40s541.png",
  },
];

function ProjectOverlay({
  name,
  type,
  location,
}: {
  name: string;
  type: string;
  location: string;
}) {
  return (
    <div
      className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{
        background:
          "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
      }}
    >
      <p className="font-satoshi text-[0.65rem] text-white/60 tracking-[0.18em] uppercase mb-1">
        {type} · {location}
      </p>
      <div className="flex items-end justify-between">
        <h3 className="font-aller font-bold text-white text-xl leading-snug">
          {name}
        </h3>
        <span
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center ml-4"
          style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(4px)",
          }}
        >
          <ArrowUpRight className="w-4 h-4 text-white" />
        </span>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, {
    once: true,
    margin: "0px 0px -10% 0px",
  });
  const isGridInView = useInView(gridRef, {
    once: true,
    margin: "0px 0px -5% 0px",
  });

  return (
    <section className="border-t border-white bg-brand-primary relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto border-x border-white relative">
        {/* Section header */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0 }}
          animate={isHeadingInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative px-5 md:px-10 py-10 md:py-12 border-b border-[#2a2a2a] flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div className="bg-[#0b6fd3] h-1.25 w-1.25 absolute top-[-3px] left-[-3px] z-10"></div>
          <div className="bg-[#0b6fd3] h-1.25 w-1.25 absolute top-[-3px] right-[-3px] z-10"></div>
          <div className="bg-[#0b6fd3] h-1.25 w-1.25 absolute bottom-[-3px] left-[-3px] z-10"></div>
          <div className="bg-[#0b6fd3] h-1.25 w-1.25 absolute bottom-[-3px] right-[-3px] z-10"></div>

          <div>
            <p className="label-mono mb-3 text-white!">Featured projects</p>
            <h2 className="font-aller font-bold text-white text-3xl md:text-4xl leading-tight">
              Installations across Australia
            </h2>
          </div>
          <button className="self-start md:self-auto inline-flex items-center gap-2 font-satoshi text-[0.85rem] text-white px-5 py-2.5 rounded-sm hover:text-[#111111] bg-black transition-colors shrink-0">
            View all projects
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* Image grid */}
        <motion.div
          ref={gridRef}
          initial={{ opacity: 0 }}
          animate={isGridInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid md:grid-cols-[3fr_2fr] border-b border-white"
        >
          {/* Left — large featured image */}
          <div
            className="relative group border-r border-white border-b md:border-b-0 "
            style={{ minHeight: "560px" }}
          >
            <div
              className="relative h-full overflow-hidden"
              style={{ minHeight: "520px" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={projects[0].image}
                alt={projects[0].name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <ProjectOverlay
                name={projects[0].name}
                type={projects[0].type}
                location={projects[0].location}
              />
            </div>
          </div>

          {/* Right — two stacked images */}
          <div className="flex flex-col">
            <div
              className="relative group border-b border-white flex-1"
              style={{ minHeight: "280px" }}
            >
              <div
                className="relative h-full overflow-hidden"
                style={{ minHeight: "240px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={projects[1].image}
                  alt={projects[1].name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <ProjectOverlay
                  name={projects[1].name}
                  type={projects[1].type}
                  location={projects[1].location}
                />
              </div>
            </div>

            <div
              className="relative group flex-1"
              style={{ minHeight: "280px" }}
            >
              <div
                className="relative h-full overflow-hidden"
                style={{ minHeight: "240px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={projects[2].image}
                  alt={projects[2].name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <ProjectOverlay
                  name={projects[2].name}
                  type={projects[2].type}
                  location={projects[2].location}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className=""></div>
      <div className="max-w-[1600px] mx-auto border-x border-[#2a2a2a] h-[70px] relative">
        <div className="bg-white h-1.25 w-1.25 absolute top-[-3px] left-[-3px] z-10"></div>
        <div className="bg-white h-1.25 w-1.25 absolute top-[-3px] right-[-3px] z-10"></div>

        <div className="bg-white h-1.25 w-1.25 absolute bottom-[-3px] left-[-3px] z-10"></div>
        <div className="bg-white h-1.25 w-1.25 absolute bottom-[-3px] right-[-3px] z-10"></div>
      </div>
    </section>
  );
}
