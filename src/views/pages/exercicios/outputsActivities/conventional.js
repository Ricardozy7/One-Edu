// IMPRESSA

import React, { useEffect, useState, memo, useRef } from "react"
import { Box, Typography, Button, Grid, CircularProgress } from "@mui/material"

import { useReactToPrint } from "react-to-print";
import ModalComponent from "components/Modal"
import Parse from "./parse";
import useActivity from "contexts/Activity"
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"

import ReactToPdf from "react-to-pdf";


const ExportPreviewPdf = ({
    open, setOpen
}) => {
    const { contentActivity, ListActivitySelected } = useActivity()

    const [loading, setLoading] = useState(false)

    const pdfRef =  React.createRef();

    const GetPdf = useReactToPrint({
        content: () => pdfRef.current,
        pageStyle: ''
    });



    // const pdfGenator = () => {
    //     exportComponentAsPDF()
    //     const pdf = new jsPDF();
    //     const imgProps = pdf.getImageProperties(imgData);

    //     const pdfWidth = pdf.internal.pageSize.getWidth();
    //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    //     pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    //     // pdf.output('dataurlnewwindow');
    //     pdf.save("download.pdf")

    // }
    const options = {};
    return (
        <ModalComponent
            open={open}
            setOpen={setOpen}
        >
            <Grid xs={12} position="relative">
                {
                    loading &&
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        position='absolute'
                        height={"100%"}
                        width="100%"
                        bgcolor="#00000099"
                        zIndex={2}>
                        <CircularProgress />
                    </Grid>
                }
                <Grid p={2} my={4} container justifyContent="space-between" alignItems="center">
                    <Typography variant="h2" >{ListActivitySelected?.title ? ListActivitySelected.title : 'Atividade sem título'}</Typography>

                    <ReactToPdf
                        targetRef={pdfRef}
                        filename="div-blue.pdf"
                        options={options}
                        /* x={0.5}
                        y={0.5} */
                        scale={1}
                    >
                        {({ toPdf }) => <Button onClick={toPdf} variant="contained">BAIXAR PDF</Button>}
                    </ReactToPdf>
                </Grid>
                <PrintPage ref={pdfRef} contentActivity={contentActivity} />
            </Grid>

        </ModalComponent>
    )
}

export default memo(ExportPreviewPdf)

const PdfComponent = ({
    ref, contentActivity
}) => {
    return (
        <Box id='divToPrint' sx={{ p: 2, maxHeight: '90vh', overflowY: 'auto' }}>
            <Box ref={ref} sx={{ width: '210mm', minHeight: '1322px', p: 2, bgcolor: "white", overflow: 'auto' }}>
                <Parse choose={contentActivity} />
            </Box>
        </Box>
    )
}

export class PrintPage extends React.Component {

    render(props) {
        return (
            <Box id='divToPrint' sx={{ p: 2, maxHeight: '90vh', overflowY: 'auto' }}>
                <Box ref={this.props.ref} sx={{ width: '190mm', height: '1280px', p: 2, bgcolor: "white" }}>
                    <Parse choose={this.props.contentActivity} />
                </Box>
            </Box>
        )
    }
}