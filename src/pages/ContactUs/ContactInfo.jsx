import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const ContactInfo = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
       
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" sx={{marginBottom:2,color:'teal',fontWeight:'bold'}}>Contact Information</Typography>
        <Typography>
          <span>Address:</span> 37/3, Purbodhola, Dhaka
        </Typography>
        <Typography>
          <span>Phone:</span> +88 019 11101010
        </Typography>
        <Typography >
          <span>Email:</span> bloodDonationApp@gmail.com
        </Typography>
      </Box>
      <Box sx={{ flex: 1, padding: 2 }}>
        <Typography variant="h5" sx={{marginBottom:2,color:'teal',fontWeight:'bold'}}>Connect with Us</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Link href="#" >
            Twitter
          </Link>
          <Link
            href="#"
            
          >
            Facebook
          </Link>
          <Link href="#">
            Instagram
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactInfo;
