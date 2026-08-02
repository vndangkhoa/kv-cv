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
  if (typeof window !== 'undefined') {
    window.print();
  }
};

export const downloadCV = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-pdf-preview'));
  }
};

export default PERSONAL_INFO;
