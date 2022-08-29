import React from 'react';
import NotFound from '../assets/Not-Found.png';

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <img src={NotFound} alt="Not Found" />
      <h2>Error Page Not Found</h2>
    </div>
  );
}
