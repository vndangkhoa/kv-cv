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

  // Create isolated iframe to bypass parent CSS overflow clipping and theme interference
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vo_Nguyen_Dang_Khoa_Creative_CV</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap">
        <style>
          @page { size: A4 portrait; margin: 0; }
          *, *:before, *:after { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          html, body { margin: 0; padding: 0; background: #ffffff !important; color: #000000 !important; width: 210mm; height: 297mm; max-height: 297mm; overflow: hidden; font-family: 'Inter', -apple-system, sans-serif; }
          .print-portfolio-content { display: flex !important; flex-direction: row !important; width: 210mm !important; height: 297mm !important; max-height: 297mm !important; background: #ffffff !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; }
        </style>
      </head>
      <body>
        ${elem.outerHTML}
      </body>
    </html>
  `);
  doc.close();

  setTimeout(() => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }, 2000);
  }, 350);
};

export const downloadCV = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-pdf-preview'));
  }
};

export default PERSONAL_INFO;
