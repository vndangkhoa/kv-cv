import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const PERSONAL_INFO = {
  name: "Vo Nguyen Dang Khoa",
  shortName: "Khoa Vo",
  phone: "0398300340",
  email: "vonguyendangkhoa@gmail.com",
  location: "Ho Chi Minh City, Vietnam",
  linkedin: "https://www.linkedin.com/in/khoa-vo-76291236/",
  portfolio: "https://khoavo.myds.me/",
  website: "https://khoavo.vndns.net/",
  github: "https://github.com/vndangkhoa",
  forgejo: "https://git.khoavo.myds.me/vndangkhoa",
  availability: "Open to work",
};

export const triggerPdfPrint = (title = "Khoa Vo - Security Consultant & Systems Architect") => {
  if (typeof window !== 'undefined') {
    document.title = title;
    window.print();
  }
};

export const exportPdfDirectly = async (
  onProgress,
  options = "Khoa Vo - Security Consultant & Systems Architect"
) => {
  if (typeof window === 'undefined') return;

  const title = typeof options === 'string' ? options : options?.title || "Khoa Vo - Security Consultant & Systems Architect";
  const filename = typeof options === 'object' && options?.filename
    ? options.filename
    : `${title.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;

  try {
    if (onProgress) onProgress(true, 'Preparing PDF...');
    document.title = title;

    // Look for CV pages inside the preview modal or standalone mount
    let pageElements = Array.from(document.querySelectorAll('.pdf-scale-stage .cv-page'));
    if (!pageElements.length) {
      pageElements = Array.from(document.querySelectorAll('.standalone-print-mount .cv-page'));
    }

    if (!pageElements.length) {
      window.print();
      return;
    }

    // Wait for fonts to be ready
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < pageElements.length; i++) {
      if (onProgress) {
        onProgress(true, `Generating page ${i + 1} of ${pageElements.length}...`);
      }
      const pageEl = pageElements[i];

      const canvas = await html2canvas(pageEl, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          // Reset scaling and transforms in cloned document so html2canvas renders at exact 100% resolution
          const clonedStage = clonedDoc.querySelector('.pdf-scale-stage');
          if (clonedStage) {
            clonedStage.style.transform = 'none';
            clonedStage.style.width = '794px';
            clonedStage.style.margin = '0';
            clonedStage.style.padding = '0';
          }
          const clonedWrapper = clonedDoc.querySelector('.pdf-scale-wrapper');
          if (clonedWrapper) {
            clonedWrapper.style.transform = 'none';
            clonedWrapper.style.width = '794px';
            clonedWrapper.style.height = 'auto';
            clonedWrapper.style.margin = '0';
            clonedWrapper.style.padding = '0';
          }
          const clonedPages = clonedDoc.querySelectorAll('.cv-page');
          clonedPages.forEach((p) => {
            p.style.boxShadow = 'none';
            p.style.margin = '0';
          });
        },
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      if (i > 0) {
        pdf.addPage('a4', 'portrait');
      }
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
    }

    if (onProgress) onProgress(true, 'Downloading...');
    pdf.save(filename);
    return true;
  } catch (err) {
    console.error('Direct PDF export error, falling back to window.print():', err);
    window.print();
    return false;
  } finally {
    if (onProgress) onProgress(false, '');
  }
};

export const downloadCV = (mode) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-pdf-preview', { detail: { mode } }));
  }
};

export default PERSONAL_INFO;
