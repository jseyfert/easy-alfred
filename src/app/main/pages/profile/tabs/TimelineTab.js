import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Icon,
    Button,
    // IconButton,
    List,
    ListItem,
    ListItemText,
    Typography
} from '@material-ui/core';
import {FuseAnimateGroup} from '@fuse';
import axios from 'axios';
import {Link} from 'react-router-dom';


function TimelineTab()
{
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('/api/profile/timeline').then(res => {
            setData(res.data);
        });
    }, []);

    if ( !data )
    {
        return null;
    }

    return (
        <div className="md:flex max-w-2xl">

            <div className="flex flex-col flex-1 md:pr-32">

                <FuseAnimateGroup
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                >

                    {data.posts.map((post) => (
                            <Card key={post.id} className="mb-32 overflow-hidden">
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="Recipe" src={post.user.avatar}/>
                                    }
                                    action={
                                        <Button component={Link} to="/pages/pricing/style-1" variant="contained" color="secondary" className="w-128">View</Button>
                                    }
                                    title={(
                                        <span>
                                                <Typography className="inline font-medium mr-4" color="primary" paragraph={false}>
                                                    {post.user.name}
                                                </Typography>
                                            {post.type === 'post' && ""}
                                            {post.type === 'something' && "shared something with you"}
                                            {post.type === 'video' && "shared a video with you"}
                                            {post.type === 'article' && "shared an article with you"}
                                            </span>
                                    )}
                                    subheader={post.time}
                                />

                                <CardContent className="py-0">
                                    {post.message && (
                                        <Typography component="p" className="mb-16">
                                            {post.message}
                                        </Typography>
                                    )}

                                    {post.media && (
                                        <img
                                            src={post.media.preview}
                                            alt="post"
                                        />
                                    )}

                                    {post.article && (
                                        <div className="border-1">
                                            <img className="w-full border-b-1" src={post.article.media.preview} alt="article"/>
                                            <div className="p-16">
                                                <Typography variant="subtitle1">{post.article.title}</Typography>
                                                <Typography variant="caption">{post.article.subtitle}</Typography>
                                                <Typography className="mt-16">{post.article.excerpt}</Typography>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>

                                <AppBar className="card-footer flex flex-column p-16" position="static" color="default" elevation={0}>

                                    {post.comments && post.comments.length > 0 && (
                                        <div className="">
                                            <div className="flex items-center">
                                                <Typography>
                                                    {post.comments.length} comments
                                                </Typography>
                                                <Icon className="text-16 ml-4" color="action">keyboard_arrow_down</Icon>
                                            </div>

                                            <List>
                                                {post.comments.map((comment) => (
                                                    <div key={comment.id}>
                                                        <ListItem className="px-0">
                                                            <Avatar alt={comment.user.name} src={comment.user.avatar} className="mr-16"/>
                                                            <ListItemText
                                                                primary={(
                                                                    <div>
                                                                        <Typography className="inline font-medium" color="initial" paragraph={false}>
                                                                            {comment.user.name}
                                                                        </Typography>
                                                                        <Typography className="inline ml-4" variant="caption">
                                                                            {comment.time}
                                                                        </Typography>
                                                                    </div>
                                                                )}
                                                                secondary={comment.message}
                                                            />
                                                        </ListItem>
                                                        <div className="flex items-center ml-56 mb-8">
                                                            <Link to="#" className="mr-8">Reply</Link>
                                                            <Icon className="text-14 cursor-pointer">flag</Icon>
                                                        </div>
                                                    </div>
                                                ))}
                                            </List>
                                        </div>
                                    )}

                                </AppBar>
                            </Card>
                        )
                    )}
                </FuseAnimateGroup>

            </div>

        </div>
    );
}

export default TimelineTab;
