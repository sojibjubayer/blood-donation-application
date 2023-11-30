import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import image1 from '../../../assets/card1.jpg'
import image2 from '../../../assets/card2.jpg'
import image3 from '../../../assets/card3.jpg'
import image4 from '../../../assets/card4.jpg'

const FeaturedSection = () => {
    return (
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', marginTop: 4 }}>
            <Card sx={{ maxWidth: 545 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={image1}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Why Should I Donate Blood?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Giving blood saves lives. Hospitals constantly need a stable blood supply for surgeries, trauma care, and
                        patients with various medical conditions. Your donation provides a crucial resource that cannot be artificially \
                        manufactured, contributing to the well-being of those facing emergencies, chronic illnesses, or undergoing complex medical procedures. It takes just a small portion of your time, yet the impact is profound. By donating blood, you become a vital link in the chain of compassionate individuals ensuring the availability of this life-saving resource. It's a simple and altruistic act that directly helps others in their time of need.
                    </Typography>
                </CardContent>

            </Card>
            <Card sx={{ maxWidth: 545 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={image2}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Who Can Donate Blood?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Most healthy adults can donate blood. Common eligibility criteria include being at least 17 to 18 years old, depending on the country, and weighing a minimum specified amount. Donors must generally be in good health, without certain medical conditions or recent illnesses. Lifestyle factors, such as recent travel to specific regions, may temporarily affect eligibility. Additionally, individuals with conditions like HIV, hepatitis, or certain infections are usually ineligible. Sexual history and drug use may also be considered. While criteria vary globally, the aim is to
                        ensure donated blood is safe for both the donor and the recipient, adhering to rigorous health standards.
                    </Typography>
                </CardContent>

            </Card>
            <Card sx={{ maxWidth: 545 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={image3}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Misconceptios About Blood Donation
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Misconceptions about blood donation persist, deterring potential donors. Some fear needles or believe donating is
                        time-consuming. Contrary to myths, the process is swift, lasting around 10–15 minutes. Another misconception involves age; many think they're too old or too young, but eligibility spans a wide range. Some wrongly assume chronic conditions universally disqualify them, overlooking nuanced health assessments. Fear of weakness or health risks after donation is also prevalent, yet donors usually resume normal activities promptly. Dispelling these misconceptions is crucial to encourage a broader donor pool, debunking myths that hinder potential life-saving contributions.
                    </Typography>
                </CardContent>

            </Card>

            <Card sx={{ maxWidth: 545 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={image4}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        How Many Times Can I Donate Blood?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">

                        The frequency of blood donation depends on your country's regulations, individual health, and the type of donation. In many places, whole blood donors can typically donate every 8 to 12 weeks. For platelet or plasma donations, the interval may be shorter, with some donors able to contribute every 7 days. However, these guidelines may vary, so it's essential to check with your local blood donation center for specific information. Maintaining good health, meeting eligibility criteria, and allowing sufficient recovery time between donations ensure
                        a safe and sustainable contribution to the ongoing need for blood products in healthcare systems.
                    </Typography>
                </CardContent>

            </Card>
        </Box>
    );
}
export default FeaturedSection;