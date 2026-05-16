'use client'

import { type ReactNode } from 'react'

interface LockedPageProps {
  pageName: string
  children: ReactNode
}

export default function LockedPage({ pageName, children: _children }: LockedPageProps) {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 py-20 text-center bg-sandy">

      <img
        src="/images/hibiscus-icon.png"
        alt=""
        aria-hidden="true"
        className="w-16 h-16 object-contain mb-6 opacity-60"
        style={{ mixBlendMode: 'multiply' }}
      />

      <p className="font-sans text-sm tracking-[0.4em] uppercase text-fuchsia mb-4">
        {pageName}
      </p>
      <h2 className="font-serif italic text-5xl text-jungle mb-5">
        Details Coming Soon
      </h2>
      <p className="font-sans text-jungle/50 text-sm max-w-xs leading-relaxed">
        This page will be published closer to the celebration.
        Check back nearer the date.
      </p>

    </div>
  )
}
