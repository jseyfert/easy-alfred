import React, {useEffect, useState} from 'react';
import {Button, Tab, Tabs, TextField, Icon, Typography} from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/styles';
import {FuseAnimate, FusePageCarded, FuseChipSelect, FuseUtils, FuseLoading} from '@fuse';
import {useForm} from '@fuse/hooks';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import _ from '@lodash';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

const suggestions = [
    'Breakfast',
    'Brunch',
    'Lunch',
    'Dinner',
    'Personal bartender'
].map(item => ({
    value: item,
    label: item
}));

const useStyles = makeStyles(theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    productImageUpload      : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
    },
    productImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            '& $productImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $productImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
}));

function Product(props)
{
    const dispatch = useDispatch();
    const product = useSelector(({eCommerceApp}) => eCommerceApp.product);

    const classes = useStyles(props);
    const [tabValue, setTabValue] = useState(0);
    const {form, handleChange, setForm} = useForm(null);

    useEffect(() => {
        function updateProductState()
        {
            const params = props.match.params;
            const {productId} = params;

            if ( productId === 'new' )
            {
                dispatch(Actions.newProduct());
            }
            else
            {
                dispatch(Actions.getProduct(props.match.params));
            }
        }

        updateProductState();
    }, [dispatch, props.match.params]);

    useEffect(() => {
        if (
            (product.data && !form) ||
            (product.data && form && product.data.id !== form.id)
        )
        {
            setForm(product.data);
        }
    }, [form, product.data, setForm]);

    function handleChangeTab(event, tabValue)
    {
        setTabValue(tabValue);
    }

    function handleChipChange(value, name)
    {
        setForm(_.set({...form}, name, value.map(item => item.value)));
    }

    function setFeaturedImage(id)
    {
        setForm(_.set({...form}, 'featuredImageId', id));
    }

    function handleUploadChange(e)
    {
        const file = e.target.files[0];
        if ( !file )
        {
            return;
        }
        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = () => {
            setForm(_.set({...form}, `images`,
                [
                    {
                        'id'  : FuseUtils.generateGUID(),
                        'url' : `data:${file.type};base64,${btoa(reader.result)}`,
                        'type': 'image'
                    },
                    ...form.images
                ]
            ));
        };

        reader.onerror = function () {
            console.log("error on load image");
        };
    }

    function canBeSubmitted()
    {
        return (
            form.name.length > 0 &&
            !_.isEqual(product.data, form)
        );
    }

    if ( (!product.data || (product.data && props.match.params.productId !== product.data.id)) && props.match.params.productId !== 'new' )
    {
        return <FuseLoading/>;
    }

    return (
        <FusePageCarded
            classes={{
                toolbar: "p-0",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                form && (
                    <div className="flex flex-1 w-full items-center justify-between">

                        <div className="flex flex-col items-start max-w-full">

                            <div className="flex items-center max-w-full">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    {form.images.length > 0 && form.featuredImageId ? (
                                        <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src={_.find(form.images, {id: form.featuredImageId}).url} alt={form.name}/>
                                    ) : (
                                        <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={form.name}/>
                                    )}
                                </FuseAnimate>
                                <div className="flex flex-col min-w-0">
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                            Food and Beverage
                                        </Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            contentToolbar={
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="auto"
                    classes={{root: "w-full h-64"}}
                >
                    <Tab className="h-64 normal-case" label="Details"/>
                    <Button
                        component={Link}
                        to="/apps/calendar"
                        color="secondary"
                        // className="whitespace-no-wrap"
                        variant="contained"
                        // disabled={!canBeSubmitted()}
                        // onClick={() => dispatch(Actions.saveProduct(form))}
                    >
                        View Calendar
                    </Button>
                </Tabs>
            }
            content={
                form && (
                    <div className="p-16 sm:p-24 max-w-2xl">
                        {tabValue === 0 &&
                        (
                            <div>

                                <TextField
                                    className="mt-8 mb-16"
                                    label="Party Size"
                                    id="quantity"
                                    name="quantity"
                                    // value={form.quantity}
                                    onChange={handleChange}
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                />

                                <FuseChipSelect
                                    className="w-full my-16"
                                    // value={tags}
                                    // onChange={handleChipChange}
                                    onChange={(value) => handleChipChange(value, 'categories')}
                                    placeholder="Select Meal types"
                                    textFieldProps={{
                                        label          : 'Meal types',
                                        InputLabelProps: {
                                            shrink: true
                                        },
                                        variant        : 'outlined'
                                    }}
                                    options={suggestions}
                                    isMulti
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    label="Total Number of Days for Meals"
                                    id="budget"
                                    name="budget"
                                    // value={form.taxRate}
                                    onChange={handleChange}
                                    // InputProps={{
                                    //     startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    // }}
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    label="Total Number of Hours for Personal Bartender"
                                    id="budget"
                                    name="budget"
                                    // value={form.taxRate}
                                    onChange={handleChange}
                                    // InputProps={{
                                    //     startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    // }}
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    label="Budget"
                                    id="budget"
                                    name="budget"
                                    // value={form.taxRate}
                                    onChange={handleChange}
                                    // InputProps={{
                                    //     startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    // }}
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    id="description"
                                    name="description"
                                    onChange={handleChange}
                                    label="Personal Requests for Alfred"
                                    type="text"
                                    // value={form.description}
                                    multiline
                                    rows={5}
                                    variant="outlined"
                                    fullWidth
                                />

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Button
                                        component={Link}
                                        to="/apps/e-commerce/orders/1"
                                        color="secondary"
                                        // className="whitespace-no-wrap"
                                        variant="contained"
                                        disabled={!canBeSubmitted()}
                                        onClick={() => dispatch(Actions.saveProduct(form))}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </FuseAnimate>

                            </div>
                        )}
                        {tabValue === 1 && (
                            <div>
                                <input
                                    accept="image/*"
                                    className="hidden"
                                    id="button-file"
                                    type="file"
                                    onChange={handleUploadChange}
                                />
                                <div className="flex justify-center sm:justify-start flex-wrap">
                                    <label
                                        htmlFor="button-file"
                                        className={
                                            clsx(
                                                classes.productImageUpload,
                                                "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
                                            )}
                                    >
                                        <Icon fontSize="large" color="action">cloud_upload</Icon>
                                    </label>
                                    {form.images.map(media => (
                                        <div
                                            onClick={() => setFeaturedImage(media.id)}
                                            className={
                                                clsx(
                                                    classes.productImageItem,
                                                    "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5",
                                                    (media.id === form.featuredImageId) && 'featured')
                                            }
                                            key={media.id}
                                        >
                                            <Icon className={classes.productImageFeaturedStar}>star</Icon>
                                            <img className="max-w-none w-auto h-full" src={media.url} alt="product"/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )
            }
            innerScroll
        />
    )
}

export default withReducer('eCommerceApp', reducer)(Product);
