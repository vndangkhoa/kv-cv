import React from 'react';
import PrintPage1Creative from './print/PrintPage1Creative';
import PrintPage2IT from './print/PrintPage2IT';
import PrintPage3TrimUI from './print/PrintPage3TrimUI';

export { PrintPage1Creative, PrintPage2IT, PrintPage3TrimUI };

export default function PrintPortfolio({ mode, tab = 'dev' }) {
  // Determine effective mode: explicit mode prop takes precedence, otherwise infer from tab
  const activeMode = mode || (tab === 'creative' ? 'design' : 'it');

  if (activeMode === 'design' || activeMode === 'creative') {
    return (
      <>
        <PrintPage1Creative pageNum={1} totalPages={1} />
      </>
    );
  }

  if (activeMode === 'all') {
    return (
      <>
        <PrintPage1Creative pageNum={1} totalPages={3} />
        <PrintPage2IT pageNum={2} totalPages={3} />
        <PrintPage3TrimUI pageNum={3} totalPages={3} />
      </>
    );
  }

  // Default: 'it' mode (Security Consultant & Systems Architect CV - 2 Pages)
  return (
    <>
      <PrintPage2IT pageNum={1} totalPages={2} />
      <PrintPage3TrimUI pageNum={2} totalPages={2} />
    </>
  );
}
