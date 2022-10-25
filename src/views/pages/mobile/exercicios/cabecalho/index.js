import React, { useEffect, useState, memo, useRef } from "react"

import {
    Grid, Typography,
} from "@mui/material"

import {
    FcAddImage
} from "react-icons/all"

import add_photo_alternate from "assets/images/icons/add_photo_alternate.svg"

import FormsCabecalhoMobile from "./forms"
import InsertImage from "components/InsertImage";

const CabecalhoMobile = ({
}) => {

    const [newImage, setNewImage] = useState(false)

    const [imgLogo, setImageLogo] = useState(false)
    const [imgsQuestion, setImgsQuestion] = useState(null)


    const AddImgQuestion = (e, type) => {
        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            setImgsQuestion(reader.result)
        }
        reader.readAsDataURL(files[0])
    }


    const AddImgQuestionLink = (imgLink) => {
        setImgsQuestion(imgLink)
    }


    return (
        <Grid
        width={"100vw"}
            sx={{
                background: 'radial-gradient(90.6% 42.26% at 50% 50%, rgba(0, 240, 255, 0.2) 0%, rgba(0, 240, 255, 0) 100%), #15133F'
            }}
        >
            <Grid

                height="100%"
                paddingY={5} mx={3} gap={3} container>

                <Typography variant="h2">
                    Cabeçalho
                </Typography>
                <Grid xs={12} flexDirection="column" gap={3} container justifyContent="center" alignItems={"center"}>
                    <Typography textAlign={"center"} variant="h6">
                        Os campos ativados que você deixar em branco <br /> ficarão para os alunos preencherem na folha
                    </Typography>
                    <Grid
                        onClick={() => setNewImage(true)}
                        border="1px dashed #FFFFFF" borderRadius="10px" p={5}>
                        <img src={imgsQuestion ? imgsQuestion : add_photo_alternate} alt="adcionar image" style={{ width: '90px' }} />
                    </Grid>
                    <Typography textAlign={"center"} variant="h3">
                        Logotipo da escola
                    </Typography>
                </Grid>
                <FormsCabecalhoMobile />
                <InsertImage
                    open={newImage}
                    setOpen={setNewImage}
                    AddImgQuestion={AddImgQuestion}
                    AddImgQuestionLink={AddImgQuestionLink}

                />
            </Grid>
        </Grid>

    )
}

export default memo(CabecalhoMobile)
