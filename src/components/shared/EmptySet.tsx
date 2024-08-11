import React from 'react';

export default function EmptySet({ text }: { text?: string } = {}) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center mb-s-3">
        <img src="/img/empty.png" alt="No results" className="w-32" />
      </div>

      <div className="text-center text-2xl font-medium pl-s-2">{text ?? 'Nothing to display at the moment!'}</div>
    </div>
  );
}
