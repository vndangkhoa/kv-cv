import React from 'react';
import PrintPage1Creative from './print/PrintPage1Creative';
import PrintPage2IT from './print/PrintPage2IT';

export { PrintPage1Creative, PrintPage2IT };

export default function PrintPortfolio() {
  return (
    <>
      <PrintPage1Creative />
      <PrintPage2IT />
    </>
  );
}
