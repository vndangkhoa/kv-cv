import React from 'react';
import { V2Page1Creative, V2Page2IT, V2Page3TrimUI } from './print/PrintV2Swiss';

export {
  V2Page1Creative as PrintPage1Creative,
  V2Page2IT as PrintPage2IT,
  V2Page3TrimUI as PrintPage3TrimUI,
};

export default function PrintPortfolio({ mode, tab = 'dev' }) {
  const activeMode = mode || (tab === 'creative' ? 'design' : 'it');

  if (activeMode === 'design' || activeMode === 'creative') {
    return (
      <>
        <V2Page1Creative pageNum={1} totalPages={1} />
      </>
    );
  }

  if (activeMode === 'all') {
    return (
      <>
        <V2Page1Creative pageNum={1} totalPages={3} />
        <V2Page2IT pageNum={2} totalPages={3} />
        <V2Page3TrimUI pageNum={3} totalPages={3} />
      </>
    );
  }

  // Default: 'it' mode (Security Consultant & Systems Architect CV - 2 Pages)
  return (
    <>
      <V2Page2IT pageNum={1} totalPages={2} />
      <V2Page3TrimUI pageNum={2} totalPages={2} />
    </>
  );
}
