"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [mutedVideos, setMutedVideos] = useState<{ [key: string]: boolean }>({});

  const toggleMute = (id: string) => {
    const video = document.getElementById(id) as HTMLVideoElement;
    if (video) {
      video.muted = !video.muted;
      setMutedVideos((prev) => ({ ...prev, [id]: video.muted }));
    }
  };

  // 👇 Shorts list
  const videos = ["/shorts.mp4", "/short2.mp4", "/short3.mp4"];

  return (
    <main className="bg-gray-950 text-white">
      {/* ✅ Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur z-50 flex justify-between items-center px-8 py-4">
        <h1 className="text-2xl font-bold">Tonny.dev</h1>
        <ul className="flex gap-6">
          <li><a href="#about" className="hover:text-blue-400">About</a></li>
          <li><a href="#projects" className="hover:text-blue-400">Projects</a></li>
          <li><a href="#shorts" className="hover:text-blue-400">Shorts</a></li>
          <li><a href="#services" className="hover:text-blue-400">Services</a></li>
          <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
        </ul>
      </nav>

      {/* ✅ Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-8 pt-24">
        {/* Hero Image with sweep */}
        <motion.div
          className="relative w-1/3 min-w-[280px] rounded-2xl overflow-hidden shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src="/me.jpeg"
            alt="Tonny"
            width={500}
            height={500}
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] animate-sweep"></div>
        </motion.div>

        {/* Hero Text */}
        <div className="text-center md:text-left max-w-xl">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold mb-4 inline-block"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Hello, I am Tonny 👋
          </motion.h2>
          <p className="text-lg mb-6">
            Creative Director at <span className="font-bold text-blue-400">Apien Communication Technology</span>.
            A passionate Fullstack Developer skilled in web, mobile apps, and cloud solutions.
          </p>
          <a
            href="#projects"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md font-semibold"
          >
            View My Work
          </a>
        </div>
      </section>

      {/* ✅ About Section */}
      <section id="about" className="py-20 bg-gray-900 px-8">
        <h2 className="text-4xl font-bold text-center mb-10">About Me</h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-300">
          I am a versatile Fullstack Developer with hands-on experience in building scalable, modern web
          and mobile applications. I excel in crafting responsive UI, managing backend infrastructure,
          and ensuring seamless integration across platforms. My work spans cloud technologies, secure
          file sharing, creative product design, and digital communication strategies.
        </p>
      </section>

    {/* ✅ Projects Section */}
<section id="projects" className="py-20 bg-gray-950 px-8">
  <h2 className="text-4xl font-bold text-center mb-10">Projects</h2>
  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {(
      [
        { img: "/web.png", title: "Web Development Project" },
        { img: "/mobile.jpeg", title: "Mobile App Project" },
        { img: "/design.png", title: "UI/UX Design Project" },
      ]
    ).map((project, i) => (
      <div
        key={i}
        className="rounded-2xl overflow-hidden border border-gray-800 shadow-lg bg-gray-900 flex flex-col"
      >
        <div className="w-full h-[500px] bg-black flex items-center justify-center">
          <Image
            src={project.img}
            alt={project.title}
            width={300}
            height={600}
            className="object-contain max-h-full"
          />
        </div>
        <div className="p-4 text-center text-lg font-semibold">{project.title}</div>
      </div>
    ))}
  </div>
</section>


   {/* ✅ Shorts Section (TikTok/YouTube style with big side arrows, scrollbar hidden) */}
<section id="shorts" className="py-20 bg-gray-900 text-white flex flex-col items-center">
  <h2 className="text-4xl font-bold text-center mb-10">Shorts 🎬</h2>

  <div className="relative flex items-center justify-center">
    {/* Shorts Container */}
    <div
      id="shorts-container"
      className="w-[300px] h-[540px] overflow-y-auto snap-y snap-mandatory rounded-2xl shadow-lg border border-gray-700 bg-black relative no-scrollbar"
    >
      {videos.map((src, index) => {
        const id = `short-video-${index}`;
        return (
          <div
            key={id}
            className="w-full h-[540px] snap-start relative flex items-center justify-center bg-black"
          >
            <video
              id={id}
              src={src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => toggleMute(id)}
              className="absolute bottom-4 left-4 bg-black/50 text-white text-lg px-3 py-1 rounded-full"
            >
              {mutedVideos[id] ? "🔇" : "🔊"}
            </button>
          </div>
        );
      })}
    </div>

    {/* Up/Down Arrows stacked on right side */}
    <div className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 flex flex-col gap-6">
      <button
        onClick={() => {
          const container = document.getElementById("shorts-container");
          if (container) container.scrollBy({ top: -540, behavior: "smooth" });
        }}
        className="text-4xl bg-gray-800 hover:bg-gray-700 p-4 rounded-full shadow-lg"
      >
        ⬆
      </button>
      <button
        onClick={() => {
          const container = document.getElementById("shorts-container");
          if (container) container.scrollBy({ top: 540, behavior: "smooth" });
        }}
        className="text-4xl bg-gray-800 hover:bg-gray-700 p-4 rounded-full shadow-lg"
      >
        ⬇
      </button>
    </div>
  </div>
</section>



     {/* ✅ Other Services Section */}
<section id="services" className="py-20 bg-gray-950 text-white px-8">
  <h2 className="text-4xl font-bold text-center mb-14">Other Services</h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
    {[
      { title: "🎬 Video Editing", desc: "Professional editing for YouTube, TikTok, and corporate videos." },
      { title: "📱 UGC Content", desc: "Authentic, engaging user-generated content for brands." },
      { title: "🎨 Animation", desc: "2D/3D animation and motion graphics to tell your story." },
      { title: "✍️ Illustration", desc: "Custom digital art and illustrations tailored to your needs." },
    ].map((service, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.07 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative p-10 h-[280px] rounded-3xl border border-gray-800 shadow-lg bg-gray-900 overflow-hidden group flex flex-col justify-center"
      >
        {/* Sweep effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>

        <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
        <p className="text-gray-300 text-base leading-relaxed">{service.desc}</p>
      </motion.div>
    ))}
  </div>
</section>



      {/* ✅ Contact Section */}
      <section id="contact" className="py-20 bg-[#0d1b2a] text-white px-8">
        <h2 className="text-4xl font-bold text-center mb-10">Contact</h2>
        <div className="max-w-2xl mx-auto text-center">
          <p className="mb-6 text-lg">Let’s build something amazing together 🚀</p>
          <p>Email: <a href="mailto:anthonykimataofficial@gmail.com" className="text-blue-400">anthonykimataofficial@gmail.com</a></p>
          <p>Phone: <a href="tel:+254 745198904" className="text-blue-400">+254 745198904</a></p>
          <p>Phone: <a href="tel:+1 971 2510852" className="text-blue-400">+1 971 2510852 </a></p>
        </div>
      </section>
    </main>
  );
}
