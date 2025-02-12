import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { SalePrintData } from "../../processing/sale/impl/SaleImpl";
import { QuantomGET } from "../../../../HTTP/QuantomHttpMethods";
pdfMake.vfs = (pdfFonts as any)?.pdfMake?.vfs;



 const PrintSaleSlip = async(billNo?:string) => {
    let data= await SalePrintData(billNo);
    let headers =await GetReportHeaders(data?.Sale?.LocId);
    alert('header one is'+data?.Sale?.LocId)
    const docDefinition:any = {
        pageSize: "A4", // Set page size to A4
        pageMargins: [40, 60, 40, 60], // 
      content: [
        { text: headers?.Header1},
        { text: "This is a sample PDF report generated using PDFMake in React with TypeScript." },
        { text: "For Check Is Updated." },
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
      },
    };

    pdfMake.createPdf(docDefinition).print();
    
//     pdfMake.createPdf(docDefinition).getBlob((blob) => {
//         const url = URL.createObjectURL(blob);
        
//         // Create a hidden iframe and append it to the document
//         const iframe = document.createElement("iframe");
//         iframe.style.position = "absolute";
//         iframe.style.width = "0px";
//         iframe.style.height = "0px";
//         iframe.style.border = "none";
//         iframe.src = url;
        
//         document.body.appendChild(iframe);
        
//         iframe.onload = () => {
//           iframe.contentWindow?.print(); // Trigger print in the same window
//         };
//       });
//     ;
  };



export interface Headers{
    Header1?:string;
    Header2?:string;
    Header3?:string;
}
export const GetReportHeaders=async(locId?:string):Promise<Headers>=>{
   let url="Config/Location/GetReportHeaders?LocId=" + locId;
   let res= await QuantomGET<Headers>(url,true)
   return res?.Response??{};
}