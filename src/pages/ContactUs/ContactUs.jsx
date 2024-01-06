import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';


export default function ContactUs() {
    const axiosPublic = useAxiosPublic()
    const theme = useTheme();

    const handleSubmit = async(event) => {
        event.preventDefault();

        const requestedContact={
            name:event.target.name.value,
            email:event.target.email.value,
            address:event.target.address.value,
            query:event.target.query.value,
        }

        // console.log(requestedContact)

        const res = await axiosPublic.post('/fromRequestedContact',requestedContact)
        if (res.data.insertedId) {
            
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Data Sent Sucessfully',
                showConfirmButton: false,
                timer: 1500,
            });
            event.target.reset()
           
           
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                
                    
                    width: '35ch',
                    [theme.breakpoints.up('md')]: {
                        width: '45ch',
                        maxWidth: '100%',
                    },
                    alignItems:'center'
                
            }}
            noValidate
            autoComplete="off" >
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'teal',mb:2, borderRadius: 1 }}>
                Feel free to contact us
            </Typography>
            <TextField id="name" label="Name" variant="filled" fullWidth /> <br />
            <TextField id="email" label="Email" variant="filled" fullWidth /> <br />
            <TextField id="address" label="Address" variant="filled" fullWidth /> <br />
            <TextField
                id="query"
                label="Query"
                multiline
                rows={4}
                variant="filled"
                fullWidth
            />
            <Button type="submit" variant="contained" color="inherit" sx={{ mt: 2 }}>
                Submit
            </Button>
        </Box>
    );
}
