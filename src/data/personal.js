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

  try {
    if (onProgress) onProgress(true);

    // Use browser's native print - applies @media print CSS for exact layout
    // This ensures fonts, positioning, and measurements match print preview
    window.print();
  } catch (err) {
    console.error('Print error:', err);
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
