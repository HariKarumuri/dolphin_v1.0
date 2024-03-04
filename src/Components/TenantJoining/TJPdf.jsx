import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Page, Document, StyleSheet, Text, View , Image } from "@react-pdf/renderer";
import Logo from "../../assets/Dolphin.png"

// Sample test data
const sampleTenantDetails = {
  name: "John Doe",
  email: "john.doe@example.com",
  // Add more fields as per your actual structure
};

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const TJPdf = () => {
    const [pdfData, setPdfData] = useState(null);
  
    const handleGeneratePdf = () => {
      setPdfData(
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              {/* Logo and Company Name */}
              <View style={styles.logoContainer}>
                {/* Add your logo image here */}
                <Image src={Logo} style={styles.logo} />
                <Text style={styles.companyName}>Your Company Name</Text>
              </View>
  
              {/* Tenant Details */}
              <Text>Name: {sampleTenantDetails.name}</Text>
              <Text>Email: {sampleTenantDetails.email}</Text>
              {/* Add more details based on your tenantDetails structure */}
            </View>
          </Page>
        </Document>
      );
    };
  
    // Styles including the new styles for logo and company name
    const styles = StyleSheet.create({
      page: {
        flexDirection: "row",
        backgroundColor: "#E4E4E4",
      },
      section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
      },
      logoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      },
      logo: {
        width: 50, // Adjust the width of your logo as needed
        height: 50, // Adjust the height of your logo as needed
        marginRight: 10,
      },
      companyName: {
        fontSize: 18,
        fontWeight: "bold",
      },
    });
  
    return (
      <div>
        <button onClick={handleGeneratePdf}>Generate PDF</button>
        {pdfData && (
          <PDFDownloadLink document={pdfData} fileName="TenantDetails.pdf">
            {({ loading }) => (loading ? "Loading..." : "Download PDF")}
          </PDFDownloadLink>
        )}
      </div>
    );
  };
  
  export default TJPdf;