// IMPRESSA

import React, { useEffect, useState, memo } from "react"
import { Box, Typography } from "@mui/material"
import ModalComponent from "components/Modal"
import Parse from "../../outputsActivities/parse";
import useActivity from "contexts/Activity"
import { jsPDF } from "jspdf";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import html2canvas from "html2canvas"
const ExportPreviewPdf = ({
    open, setOpen
}) => {
    const { contentActivity, ListActivitySelected } = useActivity()


    useEffect(() => {
        if (open) {
            setTimeout(() => {
                GetPdf()
            },[2000])
        }
    }, [open])


    const GetPdf = () => {
        const input = document.getElementById('divToPrint');
            html2canvas(input)
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF();
                    const imgProps= pdf.getImageProperties(imgData);

                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                    pdf.addImage(imgData, 'JPEG', 0, 0,pdfWidth, pdfHeight);
                    // pdf.output('dataurlnewwindow');
                    pdf.save("download.pdf");
                })

        // htmlToImage.toPng(document.getElementById('divToPrint'), { quality: 0.95 })
        // .then(function (dataUrl) {
        //   var link = document.createElement('a');
        //   link.download = 'my-image-name.jpeg';
        //   const pdf = new jsPDF();
        //   const imgProps= pdf.getImageProperties(dataUrl);
        //   const pdfWidth = pdf.internal.pageSize.getWidth();
        //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        //   pdf.addImage(dataUrl, 'PNG', 0, 0,pdfWidth, pdfHeight);
        //   pdf.save("download.pdf"); 
        // });
    }

    return (
        <ModalComponent
            open={open}
            setOpen={setOpen}
        >
            <Box id='divToPrint' sx={{ p: 2, maxHeight: '90vh', overflowY: 'auto' }}>
                <Typography onClick={GetPdf}>Atividade</Typography>
                <Box sx={{ width: '210mm', heigth: '1322px', p: 2, bgcolor: "white", overflowY: 'auto' }}>
                    <Parse choose={contentActivity} />
                </Box>
            </Box>
        </ModalComponent>
    )
}

export default memo(ExportPreviewPdf)