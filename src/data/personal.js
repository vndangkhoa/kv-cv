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

export const exportPdfDirectly = async (onProgress, title = "Khoa Vo - Security Consultant & Systems Architect") => {
  if (typeof window === 'undefined') return;

  try {
    if (onProgress) onProgress(true);

    // Set document title so the exported PDF is named appropriately
    document.title = title;

    // Use browser's native print - applies @media print CSS for exact layout
    window.print();
  } catch (err) {
    console.error('Print error:', err);
  } finally {
    if (onProgress) onProgress(false);
  }
};

export const downloadCV = (mode) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-pdf-preview', { detail: { mode } }));
  }
};

export default PERSONAL_INFO;
