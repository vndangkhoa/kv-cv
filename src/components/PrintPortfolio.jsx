import React from 'react';
import PrintPage1Creative from './print/PrintPage1Creative';
import PrintPage2IT from './print/PrintPage2IT';
import PrintPage3TrimUI from './print/PrintPage3TrimUI';

export { PrintPage1Creative, PrintPage2IT, PrintPage3TrimUI };

export default function PrintPortfolio() {
  return (
    <>
      <PrintPage1Creative />
      <PrintPage2IT />
      <PrintPage3TrimUI />
    </>
  );
}
