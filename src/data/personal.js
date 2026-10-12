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

  const mode = typeof options === 'object' ? options?.mode : undefined;
  let filename = "Khoa_Vo_Security_Architect_CV.pdf";
  if (mode === 'design' || mode === 'creative') {
    filename = "Khoa_Vo_Creative_AI_Lead_CV.pdf";
  } else if (mode === 'all') {
    filename = "Khoa_Vo_Full_Portfolio_CV.pdf";
  } else if (typeof options === 'object' && options?.filename) {
    filename = options.filename;
  }

  const title = typeof options === 'string' ? options : options?.title || "Khoa Vo - Security Consultant & Systems Architect";

  try {
    if (onProgress) onProgress(true, 'Downloading PDF...');
    document.title = title;

    // Direct download of the high-fidelity pre-rendered vector PDF
    const pdfUrl = `/${filename}`;
    const headCheck = await fetch(pdfUrl, { method: 'HEAD' });

    if (headCheck.ok) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    }
  } catch (err) {
    console.warn('Direct vector PDF fetch failed, falling back to window.print():', err);
  } finally {
    if (onProgress) onProgress(false, '');
  }

  // Graceful fallback to browser's native vector print
  window.print();
  return true;
};

export const downloadCV = (mode) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-pdf-preview', { detail: { mode } }));
  }
};

export default PERSONAL_INFO;
