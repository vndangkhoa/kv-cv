export const PERSONAL_INFO = {
  name: "Vo Nguyen Dang Khoa",
  shortName: "Khoa Vo",
  phone: "0398300340",
  email: "vonguyendangkhoa@gmail.com",
  location: "Ho Chi Minh City, Vietnam",
  linkedin: "https://www.linkedin.com/in/khoa-vo-76291236/",
  portfolio: "https://khoavo.myds.me/",
  github: "https://git.khoavo.myds.me/vndangkhoa",
  forgejo: "https://git.khoavo.myds.me/vndangkhoa",
  availability: "Open to work",
};

export const triggerPdfPrint = () => {
  const elem = document.querySelector('.print-portfolio-content');
  if (!elem) {
    window.print();
    return;
  }

  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = '210mm';
  iframe.style.height = '297mm';
  iframe.style.border = '0';
  iframe.style.opacity = '0.01';
  iframe.style.pointerEvents = 'none';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vo_Nguyen_Dang_Khoa_Creative_CV</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap">
<style>
  @page { size: A4 portrait; margin: 0; }
  *, *::before, *::after { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  html, body { margin: 0; padding: 0; background: #fff; color: #000; width: 210mm; height: 297mm; overflow: hidden; font-family: 'Inter', -apple-system, sans-serif; }
</style>
</head>
<body></body>
</html>`);
  doc.close();

  const cloned = elem.cloneNode(true);
  cloned.style.width = '210mm';
  cloned.style.height = '297mm';
  cloned.style.maxHeight = '297mm';
  cloned.style.overflow = 'hidden';
  doc.body.appendChild(cloned);

  const printFrame = () => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    setTimeout(() => {
      if (document.body.contains(iframe)) document.body.removeChild(iframe);
    }, 2000);
  };

  if (doc.fonts && doc.fonts.ready) {
    doc.fonts.ready.then(printFrame);
  } else {
    setTimeout(printFrame, 500);
  }
};

export const downloadCV = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-pdf-preview'));
  }
};

export default PERSONAL_INFO;
