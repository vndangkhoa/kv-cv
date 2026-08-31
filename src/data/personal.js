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
  github: "https://github.com/vndangkhoa",
  forgejo: "https://github.com/vndangkhoa",
  availability: "Open to work",
};

export const triggerPdfPrint = () => {
  if (typeof window !== 'undefined') {
    window.print();
  }
};

export const exportPdfDirectly = async (onProgress) => {
  if (typeof window === 'undefined') return;
  const elem = document.querySelector('.print-portfolio-content');
  if (!elem) {
    window.print();
    return;
  }

  try {
    if (onProgress) onProgress(true);
    const canvas = await html2canvas(elem, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Vo_Nguyen_Dang_Khoa_Creative_CV.pdf');
  } catch (err) {
    console.error('Direct PDF export error, falling back to window.print():', err);
    window.print();
  } finally {
    if (onProgress) onProgress(false);
  }
};

export const downloadCV = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-pdf-preview'));
  }
};

export default PERSONAL_INFO;
