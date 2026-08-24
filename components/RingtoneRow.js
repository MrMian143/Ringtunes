"use client";

import { useRef, useState } from "react";

// Keeps track of whichever <audio> element is currently playing across
// all rows on the page, so starting one pauses any other.
let currentlyPlaying = null;

function formatTime(sec) {
  if (!sec || Number.isNaN(sec)) return "--:--";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function RingtoneRow({ ringtone }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    if (currentlyPlaying && currentlyPlaying !== audio) {
      currentlyPlaying.pause();
    }
    currentlyPlaying = audio;
    audio.play();
    setPlaying(true);
  }

  return (
    <div className="group flex items-center gap-4 rounded-xl border border-line/60 bg-surface/60 px-4 py-3.5 hover:border-amber/40 transition-colors">
      <button
        onClick={toggle}
        aria-label={playing ? `Pause ${ringtone.title}` : `Play ${ringtone.title}`}
        className="shrink-0 w-11 h-11 rounded-full bg-surface2 border border-line flex items-center justify-center hover:border-amber transition-colors"
      >
        {playing ? (
          <span className="flex items-end gap-[3px] h-4">
            <span className="w-[3px] bg-amber rounded-full animate-bar1 h-2" />
            <span className="w-[3px] bg-amber rounded-full animate-bar2 h-4" />
            <span className="w-[3px] bg-amber rounded-full animate-bar3 h-3" />
          </span>
        ) : (
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
            <path d="M1 1.2v13.6c0 .9 1 1.4 1.7.9l10-6.8c.6-.4.6-1.4 0-1.8l-10-6.8C2 .2 1 .7 1 1.6z" fill="#F3F0FF" />
          </svg>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <p className="font-medium truncate">{ringtone.title}</p>
        <p className="text-xs text-muted font-mono mt-0.5">{formatTime(duration)}</p>
      </div>

      <audio
        ref={audioRef}
        src={ringtone.audioUrl}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => setPlaying(false)}
      />

      <a
        href={ringtone.audioUrl}
        download={`${ringtone.title}.mp3`}
        aria-label={`Download ${ringtone.title}`}
        className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center border border-line text-muted hover:text-ink hover:bg-amber hover:border-amber transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1v9m0 0L4.5 6.5M8 10l3.5-3.5M2 12.5v1a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}
