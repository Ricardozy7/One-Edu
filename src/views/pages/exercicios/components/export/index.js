import React, { memo, useState } from "react"

import {
    IconButton,
    Grid,
    Menu,
    MenuItem,
    Fade,
    Typography
} from "@mui/material"

import { useTheme } from '@mui/material/styles';
import {
    BiShare,
    FiTag,
    FiLink2,
    FiShare2,
    FiDownload,
    FiPrinter
} from "react-icons/all"
import MenuOne from "components/menu";

import { jsPDF } from "jspdf";

import html2canvas from "html2canvas"
import useActivity from "contexts/Activity"
import Parse from "../../outputsActivities/parse";

import ExportPreviewPdf from "./exportPdf"


const ExportQuestion = () => {
    const { contentActivity, ListActivitySelected } = useActivity()

    const theme = useTheme()

    const [openPdf, setOpenPdf] = useState(false)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function printDocument(){
        const input = document.getElementById('divToPrint');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            // pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
          })
        ;
      }

    return (
        <>
            <IconButton onClick={handleClick} >
                <BiShare size={25} color={theme.palette.simples.white} />
            </IconButton>
            <MenuOne
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
            >
                {
                    ItemsMenu.map((item, index) => (
                        <>
                        <MenuItem 
                        sx={{
                            borderBottom: item.border ? 'solid 1px #ffffff50' : 'none'
                        }}
                        key={index} onClick={() => item.action === 'pdfDownload' && setOpenPdf(true)}>
                            <Grid
                                alignItems={'center'}
                                width={200}
                                bgcolor={theme.palette.background.bg800}
                                container
                                justifyContent="space-between">
                                <Typography>{item.text}</Typography>
                                {item.Icon}
                            </Grid>
                        </MenuItem>
                        </>
                    ))
                }
            </MenuOne>
            <ExportPreviewPdf open={openPdf} setOpen={setOpenPdf}/>
        </>
    )
}

export default memo(ExportQuestion)


const ItemsMenu = [
    { text: 'Copiar Link', Icon: <FiLink2 />, action: () => { } },
    { text: 'Enviar Link. . .', Icon: <FiShare2 />, action: () => { }, border: true } ,
    { text: 'Baixar PDF', Icon: <FiDownload />, action: 'pdfDownload' },
    { text: 'Enviar PDF . . .', Icon: <FiShare2 />, action: () => { }, border: true },
    { text: 'Imprimir', Icon: <FiPrinter />, action: () => { } }
]