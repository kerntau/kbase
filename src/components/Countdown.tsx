"use client";

import React, { useState, useEffect, useRef } from "react";

// 目标日期：2026年7月15日
const TARGET_DATE = new Date("2026-07-15T00:00:00+08:00").getTime();

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    
    const updateTime = () => {
      const now = Date.now();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        milliseconds: Math.floor((difference % 1000)),
      });
      rafRef.current = requestAnimationFrame(updateTime);
    };

    rafRef.current = requestAnimationFrame(updateTime);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const formatNum = (num: number) => num.toString().padStart(2, '0');
  const formatMs = (num: number) => num.toString().padStart(3, '0');

  return (
    <div className="flex items-center gap-1.5 sm:gap-3 md:gap-4 font-mono text-xl sm:text-2xl md:text-3xl font-light text-foreground/85 tracking-tight h-12 select-none">
      <div className="flex items-baseline gap-1">
        <span className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tighter text-foreground">
          {mounted ? timeLeft.days : 0}
        </span>
        <span className="text-[10px] sm:text-[11px] uppercase font-sans tracking-widest text-accent/85 font-bold ml-0.5">d</span>
      </div>
      <div className="w-[1px] h-6 bg-foreground/10 mx-1 sm:mx-2" aria-hidden="true" />
      <div className="flex items-baseline gap-1">
        <span className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tighter text-foreground">
          {mounted ? formatNum(timeLeft.hours) : "00"}
        </span>
        <span className="text-[10px] sm:text-[11px] uppercase font-sans tracking-widest text-accent/85 font-bold ml-0.5">h</span>
      </div>
      <div className="w-[1px] h-6 bg-foreground/10 mx-1 sm:mx-2" aria-hidden="true" />
      <div className="flex items-baseline gap-1">
        <span className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tighter text-foreground">
          {mounted ? formatNum(timeLeft.minutes) : "00"}
        </span>
        <span className="text-[10px] sm:text-[11px] uppercase font-sans tracking-widest text-accent/85 font-bold ml-0.5">m</span>
      </div>
      <div className="w-[1px] h-6 bg-foreground/10 mx-1 sm:mx-2" aria-hidden="true" />
      <div className="flex items-baseline gap-1">
        <span className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tighter text-foreground">
          {mounted ? formatNum(timeLeft.seconds) : "00"}
        </span>
        <span className="text-[10px] sm:text-[11px] uppercase font-sans tracking-widest text-accent/85 font-bold ml-0.5">s</span>
      </div>
      <div className="w-[1px] h-6 bg-foreground/10 mx-1 sm:mx-2" aria-hidden="true" />
      <div className="flex items-baseline gap-1 w-16 sm:w-20 md:w-24">
        <span className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tighter text-foreground/60">
          {mounted ? formatMs(timeLeft.milliseconds) : "000"}
        </span>
        <span className="text-[10px] sm:text-[11px] uppercase font-sans tracking-widest text-accent/85 font-bold ml-0.5">ms</span>
      </div>
    </div>
  );
}
