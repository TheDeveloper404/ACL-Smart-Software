'use client';

import { useRef, useState, type KeyboardEvent } from 'react';

type ControlledTabs = { active: number; onChange: (index: number) => void };

export default function useRovingTabs(count: number, controlled?: ControlledTabs) {
  const [localActive, setLocalActive] = useState(0);
  const active = controlled?.active ?? localActive;
  const setActive = controlled?.onChange ?? setLocalActive;
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!count) return;
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % count;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + count) % count;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = count - 1;
    else return;
    event.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  }
  return { active, setActive, refs, onKeyDown };
}
