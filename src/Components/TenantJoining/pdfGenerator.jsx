import * as htmlToImage from "html-to-image";
import { jsPDF } from "jspdf";

// Your React component
const MyComponent = () => {
  // Your component logic here

  // Function to generate PDF
  const generatePDF = async () => {
    const element = document.getElementById("element-to-capture");

    // Convert HTML element to image
    const imageDataUrl = await htmlToImage.toPng(element);

    // Initialize jsPDF
    const pdf = new jsPDF();
    
    // Add image to PDF
    pdf.addImage(imageDataUrl, "PNG", 0, 0, 210, 297); // Adjust width and height as needed

    // Save PDF
    pdf.save("generated-pdf.pdf");
  };

  return (
    <div>
      {/* Your HTML content */}
      <div id="element-to-capture">
        {/* Content you want to capture */}
      </div>

      {/* Button to generate PDF */}
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default MyComponent;

