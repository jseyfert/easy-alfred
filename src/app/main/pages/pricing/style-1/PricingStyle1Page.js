import React from 'react';
import {Button, Card, CardContent, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {FuseAnimate, FuseAnimateGroup} from '@fuse';
import clsx from 'clsx';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    header    : {
        height    : 600,
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        color     : theme.palette.primary.contrastText
    },
    cardHeader: {
        backgroundColor: theme.palette.primary[800],
        color          : theme.palette.getContrastText(theme.palette.primary[800])
    }
}));


function PricingStyle1Page()
{
    const classes = useStyles();

    return (
        <div>

            <div className={clsx(classes.header, "flex")}>

                <div className="p-24 w-full max-w-2xl mx-auto">

                    <div className="text-center my-128 mx-24">

                        <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                            <Typography variant="h2" color="inherit" className="font-light">
                                Services
                            </Typography>
                        </FuseAnimate>

                    </div>
                </div>
            </div>

            <div className="-mt-192">

                <div className="w-full max-w-2xl mx-auto">

                    <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                        className="flex items-center justify-center flex-wrap"
                    >
                        <div className="w-full max-w-320 sm:w-1/3 p-12">

                            <Card square>

                                <div className={clsx(classes.cardHeader, "px-24 py-16")}>
                                    <Typography variant="subtitle1" color="inherit">Food and Beverage</Typography>
                                </div>

                                <CardContent className="p-32">

                                    <div className="flex flex-col">
                                        <Typography variant="subtitle1" className="">
                                            Wine and dine with local chefs, caterers, and bartenders serving up their best cuisine without lifting finger in the kitchen.
                                        </Typography>
                                    </div>
                                </CardContent>

                                <div className="flex justify-center pb-32">
                                    <Button component={Link} to="/apps/e-commerce/products/1" variant="contained" color="secondary" className="w-128">BOOK</Button>
                                </div>
                            </Card>
                        </div>

                        <div className="w-full max-w-320 sm:w-1/3 p-12">

                            <Card raised square>

                                <div className={clsx(classes.cardHeader, "flex items-center justify-between px-24 py-16")}>
                                    <Typography variant="subtitle1" color="inherit">Adventure</Typography>
                                    <Typography variant="caption" color="inherit">Save 15%</Typography>
                                </div>

                                <CardContent className="p-32">

                                    <div className="flex flex-col">
                                        <Typography variant="subtitle1" className="">
                                            Explore the area with local guides, adventures and other events organized by Easy Alfred!
                                        </Typography>
                                    </div>
                                </CardContent>

                                <div className="flex justify-center pb-32">
                                    <Button variant="contained" color="secondary" className="w-128" disabled>BOOK</Button>
                                </div>
                            </Card>
                        </div>

                    </FuseAnimateGroup>

                    <div className="flex flex-col items-center py-96 text-center sm:text-left max-w-xl mx-auto">

                        <Typography variant="h4" className="pb-32 font-light">Frequently Asked Questions</Typography>

                        <div className="flex flex-wrap w-full">

                            <div className="w-full sm:w-1/2 p-24">
                                <Typography className="text-20 mb-8">How does Easy Alfred work?</Typography>
                                <Typography className="text-16" color="textSecondary">
                                    We’re your local concierge and travel guide. Need a meal? we’ll organize it. Need a massage? We’ll order it. We’ve got an Alfred for every occasion and most all of your needs.
                                </Typography>
                            </div>

                            <div className="w-full sm:w-1/2 p-24">
                                <Typography className="text-20 mb-8">What do I need to do?</Typography>
                                <Typography className="text-16" color="textSecondary">
                                    Pick from our list of services, identifying high-level information we need to start this process. Then, we’ll have a quick call with Alfred to ensure we’ve got the details. We coordinate with the local company for a small fee to make sure you can focus on your travel rather than spend it planning and managing your day. 
                                </Typography>
                            </div>

                            <div className="w-full sm:w-1/2 p-24">
                                <Typography className="text-20 mb-8">What’s the advantage of Easy Alfred over other services?</Typography>
                                <Typography className="text-16" color="textSecondary">
                                    We work to find the best local businesses so you don’t have to. Coordinating with your Short Term rental owner, our team of researchers, and through our 30+ years of collective experience working with local businesses, we want your travel experience to be the best, so we only work with those we judge to be great.
                                </Typography>
                            </div>

                            <div className="w-full sm:w-1/2 p-24">
                                <Typography className="text-20 mb-8">How do I pay? </Typography>
                                <Typography className="text-16" color="textSecondary">
                                    With Easy Alfred, you have a card on file. All invoices are cleared with you prior to committing to the service and any payment made. All invoices are available here in your profile. We believe in full transparency. The services are then scheduled through the app calendar where you will receive notification of upcoming events. You don’t need to keep your regular schedule. You’re on holiday. Turn that off and rely on our schedule focused on having a beautiful, wonderful trip.
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PricingStyle1Page;
