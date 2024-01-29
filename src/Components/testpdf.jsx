import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Receipt = () => {
  const [receiptData, setReceiptData] = useState({
    title: 'Fake Receipt',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    // Add more fields as needed
  });

  const handleDownloadPDF = () => {
    const pdf = new jsPDF('portrait', 'mm', 'a4');

    // Create an image element
    const img = new Image();

    // Set the source of the image (replace with your logo path/URL)
    img.src = 'path/to/your/logo.png';

    // Handle the image load event
    img.onload = () => {
      // Create a canvas and draw the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Convert the content to an image using html2canvas
      const receiptContent = document.getElementById('receipt-content');
      html2canvas(receiptContent).then((receiptCanvas) => {
        const imgData = receiptCanvas.toDataURL('image/png');

        // Add the logo and receipt content to the PDF
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 40, 0);
        pdf.addImage(imgData, 'PNG', 10, 50, 190, 0);

        // Download the PDF
        pdf.save('receipt.pdf');
      });
    };
  };

  return (
    <div>
      <div id="receipt-content">
        {/* Render your receipt content here using receiptData */}
        <h2>{receiptData.title}</h2>
        <p>{receiptData.description}</p>
        {/* Add more content as needed */}
      </div>

      <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
};

export default Receipt;
