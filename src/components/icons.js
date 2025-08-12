// src/components/icons.js
import React from 'react';

export const ClassicIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 22V12" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 10L12 12L16 10" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const BackdropIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
    <rect x="7" y="7" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2"/>
  </svg>
);

export const HighlightIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M9 11L3 17V21H7L13 15M15 9L21 3V7L15 13M9 3L3 9M21 15L15 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const GlowIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
    <circle cx="12" cy="12" r="12" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
  </svg>
);

export const MonoIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="4" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 8H16M8 12H16M8 16H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const ElegantIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 3C16 3 17 7 17 10C17 13 14 15 12 15C10 15 7 13 7 10C7 7 8 3 12 3Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 15V21" stroke="currentColor" strokeWidth="2"/>
    <path d="M9 18H15" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const ComicIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M8 8H16V16H8V8Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 8L4 4M16 8L20 4M16 16L20 20M8 16L4 20" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export const MinimalIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2"/>
    <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="2"/>
  </svg>
);