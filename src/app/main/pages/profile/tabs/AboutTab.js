import React, {useEffect, useState} from 'react';
import {AppBar, Card, CardContent, Toolbar, Typography} from '@material-ui/core';
import {FuseAnimateGroup} from '@fuse';
import axios from 'axios';

function AboutTab()
{
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('/api/profile/about').then(res => {
            setData(res.data);
        });
    }, []);

    if ( !data )
    {
        return null;
    }

    const {general} = data;

    return (
        <div className="md:flex max-w-2xl">

            <div className="flex flex-col flex-1 md:pr-32">
                <FuseAnimateGroup
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                >
                    <Card className="w-full mb-16">
                        <AppBar position="static" elevation={0}>
                            <Toolbar className="pl-16 pr-8">
                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                    General Information
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <CardContent>
                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">Phone</Typography>
                                <Typography>555-555-5555</Typography>
                            </div>

                            <div className="mb-24">
                                <Typography className="font-bold mb-4 text-15">About Me</Typography>
                                <Typography>{general.about}</Typography>
                            </div>

                        </CardContent>
                    </Card>

                </FuseAnimateGroup>
            </div>

        </div>
    );
}

export default AboutTab;
