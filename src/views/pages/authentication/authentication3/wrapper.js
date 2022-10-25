
import {
    Grid,
} from '@mui/material';


import Model from "../../../../assets/images/moca.png"



const Wrapper = () => {
    return (
        <>
         <Grid
                continer
                width={400}
                height={400}
                borderRadius={200}
                ml={-20}
                mt={-10}
                bgcolor="#3ea89a"
                position="absolute"
                sx={{
                    filter: 'blur(100px)'
                }}
            />
            <Grid
                width={'40%'}
                height={'70%'}
                borderRadius={15}
                ml={-10}
                mt={-10}
                border={'solid 1px #fff'}
                sx={{
                    opacity: .2
                }}
                position="absolute"
            />
            <Grid
                width={'80%'}
                height={'70%'}
                right={0}
                bottom={0}
                borderRadius={15}
                borderLeft={'solid 1px #fff'}
                borderTop={'solid 1px #fff'}
                sx={{
                    opacity: .2
                }}
                position="absolute"
            />
            <div
            className='mobileHidden'
                style={{
                    position: 'absolute',
                    height: '100%',
                    height: '100%',
                    diplay: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <img src={Model} style={{
                    height: '100vh',
                    objectFit: 'fill',
                    opacity: 1,
                    position: 'absolute'
                }} />
            </div>
        </>
    )
}

export default Wrapper;