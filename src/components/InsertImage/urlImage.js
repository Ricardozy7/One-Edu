import { TextField, Grid, Typography, Button, Skeleton } from "@mui/material"
import React, { useEffect, useState } from "react"

import location_search_re_ttoj from "assets/images/ilustrations/location_search_re_ttoj.svg"
import page_not_found_re from "assets/images/ilustrations/page_not_found_re.svg"
import { RemoteServices } from "services"


const UrlImage = ({
    AddImgQuestionLink, setOpen, questionId
}) => {

    const [imgLink, setImgLink] = useState('')
    const [imgLinkError, setIimgLinkError] = useState(false)
    const [Loading, setLoading] = useState(false)


    useEffect(() => {
        if (imgLink.length > 0) {
            var img = new Image();
            img.src = imgLink;
            img.onload = function () {
                setIimgLinkError(false);
            }
            img.onerror = function () {
                setIimgLinkError(true);
            }
        }
        if (!imgLinkError && imgLink.length > 0) {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
    }, [imgLink])


    const AddImageUrl = () => {
        RemoteServices.Teachers.ResourcesActivity({ 
            idActivity: 1,
            data: {
                    kind: "assertiva",
                    listId: questionId,
                    resources: [{
                        kind: "image",
                        content: imgLink,
                        imageDescription: "Descrição da imagem",
                        action: "add"
                    }]
            }
         })
         .then((e) => {
            AddImgQuestionLink(imgLink)
            setOpen(false)
         })
    }

    return (
        <Grid color="white" container xs={12} gap={3} justifyContent="space-between" alignItems="center" minHeight="50vh" flexDirection={"column"}>
            <Grid xs={12} justifyContent="center" alignItems="center" container height="90%" flexDirection={"column"}>
                {
                    Loading ?
                        <Skeleton
                            sx={{ bgcolor: '#3B489270' }}
                            variant="rounded" width={"100%"} height={200} width={250} />
                        :
                        !imgLinkError && imgLink.length > 0 ?
                            <img src={imgLink} style={{ width: 250, margin: 20 }} /> :
                            <img src={imgLinkError ? page_not_found_re: location_search_re_ttoj} style={{ width: 150, margin: 20 }} />
                }
                <Grid xs={12} md={8} xl={6} container>
                    <TextField
                        onChange={e => setImgLink(e.target.value)}
                        sx={{ color: 'white' }}
                        className="dark" label="url da imagen..." variant="standard" fullWidth />
                    {
                        imgLinkError && <Typography sx={{
                            mt: 2,
                            color: "#F32D2D !important"
                        }}  variant="subtitle2">Não é possível acessar a imagem nesse URL. Verifique se o endereço está correto.</Typography>
                    }

                </Grid>
            </Grid>
            <Grid container xs={12}>
                <Grid xs={12} container justifyContent="flex-end" alignItems="center" gap={2}>
                    <Button color="inherit">CANCELAR</Button>
                    <Button disabled={imgLinkError || imgLink.length === 0} 
                    onClick={() => {
                        // AddImgQuestionLink(imgLink)
                        // setOpen(false)
                        AddImageUrl()
                    }} 
                    variant="contained">INSIRIR IMAGEN</Button>
                </Grid>

            </Grid>
        </Grid>
    )
}

export default UrlImage;