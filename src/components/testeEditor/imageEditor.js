import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import ImageEditor from "@toast-ui/react-image-editor"

// import "tui-image-editor/dist/tui-image-editor.css";
// import "tui-color-picker/dist/tui-color-picker.css";
// import FilerobotImageEditor, {
//   TABS,
//   TOOLS,
// } from 'react-filerobot-image-editor';

const myTheme = {
  // Theme object to extends default dark theme.
};

const ImageEditorComponent = ({ img, setOpen, open }) => {
  const closeImgEditor = () => {
    setOpen(false)
  };

  return (
    <Modal
      open={open}
      onClose={closeImgEditor}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* */}
      <Box sx={style}>

        {/* <ImageEditor
        includeUI={{
          loadImage: {
            path: img,
            name: 'SampleImage',
          },
          theme: myTheme,
          menu: ['shape', 'crop', 'draw', 'text'],
          initMenu: 'filter',
          uiSize: {
            width: '1000px',
            height: '700px',
          },
          menuBarPosition: 'bottom',
          locale: locale_pt_BR
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={true}  
        
        />*/}

        

      </Box>
    </Modal>
  )
}



export default ImageEditorComponent


export const locale_pt_BR = {
  Crop: 'Cortar',
  Draw: 'Desenhar',
  Icon: 'Icone',
  Text: 'Texto',
  Mask: 'Máscara',
  Filter: 'Filtros',
  'Hand': 'Mover',
  'Apply': 'Aplicar',
  'Cancel': 'Cancelar',
  'DeleteAll': 'Deletar tudo',
  'History': 'Histórico',
  'Reset': 'Resetar',
  'Undo': 'Desfazer',
  'Redo': 'refazer',
  'Delete': 'Deletar',
  'Load': 'Carregar',
  'Remove White': 'Remover Branco',
  'Brightness': 'Brilho',
  'Pixelate': 'Pixelizar',
  'Color Filter': 'Filtro de cor',
  'Distance': 'Distância',
  'Threshold': 'Limite',
  'Emboss': 'Modelar',
  'Invert': 'Inverter',
  'Grayscale': 'Escala de cinza',
  'sepia': 'sépia',
  'Tint': 'matiz',
  'Multiply': 'Multiplicar',
  'Blend': 'Mistura',
  'Download': 'Baixar'
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};