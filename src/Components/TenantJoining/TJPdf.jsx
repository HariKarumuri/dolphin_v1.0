import React, { useState, useEffect } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

import {
  Page,
  Document,
  StyleSheet,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
import Logo from "../../assets/Dolphin.png";
import useAxios from "../../util/useAxios";
import { useParams } from "react-router-dom";

const TJPdf = () => {
  const api = useAxios();
  const { id } = useParams();
  const [pdfData, setPdfData] = useState(null);
  const [tenantDetails, setTenantDetails] = useState(null);
  const [profUrl, setProfUrl] = useState("");

  useEffect(() => {
    const fetchTenantDetails = async () => {
      try {
        const response = await api.get(`/dolphinpg/tenantjoiningform/${id}/`);
        setTenantDetails(response.data);
        setProfUrl(response.data.tenant_image);
      } catch (error) {
        console.error("Error fetching tenant details:", error);
      }
    };

    fetchTenantDetails();
  }, []);

  const handleGeneratePdf = () => {
    if (tenantDetails) {
      setPdfData(
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.headerText}>
                  Dolphinstay Tenant Joining Form
                </Text>
              </View>
              <Text style={styles.textsecHeading}>Tenant Details : </Text>
              <View style={styles.basicTenantSection}>
                <View style={styles.Left_basicTenantSection}>
                  <Text style={styles.textsec}>Name: {tenantDetails.name}</Text>
                  <Text style={styles.textsec}>
                    Email: {tenantDetails.email_id}
                  </Text>
                  <Text style={styles.textsec}>
                    Mobile Number: {tenantDetails.mobile_number}
                  </Text>
                  <Text style={styles.textsec}>
                    Date of Birth: {tenantDetails.date_of_birth}
                  </Text>
                  <Text style={styles.textsec}>
                    Aadhar Number: {tenantDetails.aadhar_number}
                  </Text>
                </View>
                <View style={styles.Right_basicTenantSection}>
                  <Text> Paste Photo here</Text>
                </View>
              </View>
              <Text style={styles.textsecHeading}>
                Tenant Parent Details :{" "}
              </Text>
              <View style={styles.tenantParentDetails}>
                <View style={styles.tenantParentDetails_sub}>
                  <Text style={styles.textsec1}>Father's Name:</Text>
                  <Text style={styles.textsec1_5}>
                    {tenantDetails.father_name}
                  </Text>
                </View>
                <View style={styles.tenantParentDetails_sub}>
                  <Text style={styles.textsec1}>Father's Mobile Number:</Text>
                  <Text style={styles.textsec1_5}>
                    {tenantDetails.father_mobile_number}
                  </Text>
                </View>
                <View style={styles.tenantParentDetails_sub}>
                  <Text style={styles.textsec1}>Mother's Name:</Text>
                  <Text style={styles.textsec1_5}>
                    {tenantDetails.mother_name}
                  </Text>
                </View>
                <View style={styles.tenantParentDetails_sub}>
                  <Text style={styles.textsec1}>Mother's Mobile Number:</Text>
                  <Text style={styles.textsec1_5}>
                    {tenantDetails.mother_mobile_number}
                  </Text>
                </View>
                <View style={styles.tenantParentDetails_sub}>
                  <Text style={styles.textsec1}>Residential Address:</Text>
                  <Text style={styles.textsec1_5}>
                    {tenantDetails.residential_address}
                  </Text>
                </View>
              </View>
              <Text style={styles.textsecHeading}>Tenant PG Details :</Text>
              <View style={styles.basicTenantSection}>
                <View style={styles.Left_basicTenantSection}>
                  <Text style={styles.textsec}>
                    Room Number : {tenantDetails.requested_room_number}
                  </Text>

                  <Text style={styles.textsec}>
                    Rent : {tenantDetails.monthly_rent}
                  </Text>
                  <Text style={styles.textsec}>
                    Maintenance Charge : {tenantDetails.maintenance_charges}
                  </Text>
                </View>
                <View style={styles.Left_basicTenantSection}>
                  <Text style={styles.textsec}>
                    PG Name : {tenantDetails.pg_name}
                  </Text>
                  <Text style={styles.textsec}>
                    Security Deposit : {tenantDetails.security_deposit}
                  </Text>
                  <Text style={styles.textsec}>
                    Date of Joining : {tenantDetails.date_of_joining}
                  </Text>
                </View>
              </View>
            </View>

            {/* {<View style={styles.columnsContainer}>
              
              <View style={styles.column}>
                
                <Text style={styles.textsec}>
                  Education Qualification:{" "}
                  {tenantDetails.education_qualification}
                </Text>
              </View>

              
              <View style={styles.column}>
                
                
                <Text style={styles.labelText}>Office Address:</Text>
                <Text style={styles.valueText}>
                  {tenantDetails.office_address}
                </Text>
                <Text style={styles.labelText}>Requested Room Number:</Text>
                
                
                <Text style={styles.labelText}>Security Deposit:</Text>
                <Text style={styles.valueText}>
                  {tenantDetails.security_deposit}
                </Text>
                <Text style={styles.labelText}>Status:</Text>
                <Text style={styles.valueText}>{tenantDetails.status}</Text>
              </View>
            </View>} */}
          </Page>
          <Page size="A4" style={styles.page}>
            <View style={styles.container}>
              <Text style={styles.textsecHeading}>
                Tenant Company/College Details :
              </Text>
              <View style={styles.tenantParentDetails}>
                <View style={styles.tenantParentDetails_sub}>
                  <Text style={styles.textsec1}>Education : </Text>
                  <Text style={styles.textsec1_5}>
                    {tenantDetails.education_qualification}
                  </Text>
                </View>
                <View style={styles.tenantParentDetails_sub}>
                  <Text style={styles.textsec1}>Company Name/College:</Text>
                  <Text style={styles.textsec1_5}>
                    {tenantDetails.company_name}
                  </Text>
                </View>

                <View style={styles.tenantParentDetails_sub}>
                  <Text style={styles.textsec1}>Office/College Address:</Text>
                  <Text style={styles.textsec1_5}>
                    {tenantDetails.office_address}
                  </Text>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      );
    }
  };

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      margin: 20,
      padding: 2,
    },
    header: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 4,
      borderBottom: "1px dotted black",
    },
    headerText: {
      fontSize: 24,
    },
    basicTenantSection: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    Left_basicTenantSection: {
      flex: 2, // Take up 50% of the available space
      marginRight: 10, // Adjust as needed
    },
    Right_basicTenantSection: {
      flex: 1, // Take up 50% of the available space
      marginLeft: 10, // Adjust as needed
      border: "1px dotted black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    textsec: {
      fontSize: 14,
      paddingTop: 10,
      paddingBottom: 10,
      borderBottom: "2px dashed black",
    },
    textsec1: {
      flex: 1,
      fontSize: 14,
      paddingTop: 10,
      paddingBottom: 10,
    },
    textsec1_5: {
      flex: 1,
      fontSize: 14,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 55,
    },

    textsecHeading: {
      fontSize: 16,
      fontWeight: "bold",
      paddingTop: 20,
      paddingBottom: 25,
    },
    tenantParentDetails: {
      display: "flex",
    },
    tenantParentDetails_sub: {
      display: "flex",

      flexDirection: "row",
      borderBottom: "2px dashed black",
    },
  });

  return (
    <div>
      <button onClick={handleGeneratePdf}>Generate PDF</button>
      {pdfData && (
        <>
          <PDFViewer width="1000px" height="600px">
            {pdfData}
          </PDFViewer>

          <PDFDownloadLink document={pdfData} fileName="TenantDetails.pdf">
            {({ loading }) => (loading ? "Loading..." : "Download PDF")}
          </PDFDownloadLink>
        </>
      )}
    </div>
  );
};

export default TJPdf;
