// components/progress-card.tsx
"use client"; 

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// REMOVE THIS LINE: import 'node_modules\react-circular-progressbar\dist\styles.css';

interface ProgressCardProps {
  progress: number;
}

export default function ProgressCard({ progress }: ProgressCardProps) {
  // ... rest of the code is the same
}