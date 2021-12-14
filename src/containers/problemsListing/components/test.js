import { jsPDF } from "jspdf";

function exportPdf(urls) {
  let pdf = new jsPDF("l", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const pageRatio = pageWidth / pageHeight;

  for (let i = 0; i < urls.length; i++) {
    let img = new Image();
    img.src = urls[i];
    img.onload = function () {  
      const imgWidth = this.width;
      const imgHeight = this.height;
      const imgRatio = imgWidth / imgHeight;
      if (i > 0) {
        pdf.addPage();
      }
      pdf.setPage(i + 1);
      if (imgRatio >= 1) {
        const wc = imgWidth / pageWidth;
        if (imgRatio >= pageRatio) {
          pdf.addImage(
            img,
            "JPEG",
            0,
            (pageHeight - imgHeight / wc) / 2,
            pageWidth,
            imgHeight / wc,
            null,
            "NONE"
          );
        } else {
          const pi = pageRatio / imgRatio;
          pdf.addImage(
            img,
            "JPEG",
            (pageWidth - pageWidth / pi) / 2,
            0,
            pageWidth / pi,
            imgHeight / pi / wc,
            null,
            "NONE"
          );
        }
      } else {
        const wc = imgWidth / pageHeight;
        if (1 / imgRatio > pageRatio) {
          const ip = 1 / imgRatio / pageRatio;
          const margin = (pageHeight - imgHeight / ip / wc) / 4;
          pdf.addImage(
            img,                            
            "JPEG",
            (pageWidth - imgHeight / ip / wc) / 2,
            -(imgHeight / ip / wc + margin),
            pageHeight / ip,
            imgHeight / ip / wc,
            null,
            "NONE",
            -90
          );
        } else {
          pdf.addImage(
            img,
            "JPEG",
            (pageWidth - imgHeight / wc) / 2,
            -(imgHeight / wc),
            pageHeight,
            imgHeight / wc,
            null,
            "NONE",
            -90
          );
        }
      }
      if (i == urls.length - 1) {
        pdf.save("Photo.pdf");
      }
    };
  }
}
