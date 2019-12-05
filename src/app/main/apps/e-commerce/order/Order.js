import React, {useEffect, useState} from 'react';
import {Button, Avatar, Icon, Tab, Tabs, Typography} from '@material-ui/core';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {Link} from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import OrderInvoice from './OrderInvoice';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import {useDispatch, useSelector} from 'react-redux';

function Order(props)
{
    const dispatch = useDispatch();
    const order = useSelector(({eCommerceApp}) => eCommerceApp.order);

    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        dispatch(Actions.getOrder(props.match.params));
    }, [dispatch, props.match.params]);

    function handleChangeTab(event, tabValue)
    {
        setTabValue(tabValue);
    }

    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                order && (
                    <div className="flex flex-1 w-full items-center justify-between">

                        <div className="flex flex-1 flex-col items-center sm:items-start">

                            <div className="flex flex-col min-w-0 items-center sm:items-start">

                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Typography className="text-16 sm:text-20 truncate">
                                        {'Order ' + order.reference}
                                    </Typography>
                                </FuseAnimate>

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
                    <Tab className="h-64 normal-case" label="Order Details"/>
                </Tabs>
            }
            content={
                order && (
                    <div className="p-16 sm:p-24 max-w-2xl w-full">
                        {/*Order Details*/}
                        {tabValue === 0 &&
                        (
                            <div>
                                <div className="pb-48">

                                    <div className="pb-16 flex items-center">
                                        <Icon className="mr-16" color="action">account_circle</Icon>
                                        <Typography className="h2" color="textSecondary">Customer</Typography>
                                    </div>

                                    <div className="mb-24">

                                        <div className="table-responsive mb-16">
                                            <table className="simple">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Phone</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="flex items-center">
                                                                <Avatar className="mr-8" src={order.customer.avatar}/>
                                                                <Typography className="truncate">
                                                                    {order.customer.firstName + ' ' + order.customer.lastName}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Typography className="truncate">{order.customer.email}</Typography>
                                                        </td>
                                                        <td>
                                                            <Typography className="truncate">{order.customer.phone}</Typography>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>

                                <div className="pb-48">

                                    <div className="pb-16 flex items-center">
                                        <Icon className="mr-16" color="action">shopping_cart</Icon>
                                        <Typography className="h2" color="textSecondary">Cart</Typography>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="simple">
                                            <thead>
                                                <tr>
                                                    <th>Service</th>
                                                    <th>Payment Method</th>
                                                    <th>Amount</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                            <span className="truncate">
                                                                Dinner
                                                            </span>
                                                    </td>
                                                    <td>
                                                            <span className="truncate">
                                                                Call to complete
                                                            </span>
                                                    </td>
                                                    <td>
                                                            <span className="truncate">
                                                                {order.payment.amount}
                                                            </span>
                                                    </td>
                                                    <td>
                                                            <span className="truncate">
                                                                {order.payment.date}
                                                            </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="pb-48">

                                    <div className="table-responsive">
                                        <table className="simple">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                      <Button
                                                        type="submit"
                                                        href="tel:+1800229933"
                                                        variant="contained"
                                                        // color="secondary"
                                                        // className="w-full mx-auto normal-case mt-16"
                                                        aria-label="CALL NOW"
                                                        disabled={false}
                                                        value="firebase"
                                                    >
                                                        Call Now
                                                    </Button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        )}
                        {/*Products*/}
                        {tabValue === 1 &&
                        (
                            <div className="table-responsive">
                                <table className="simple">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.products.map(product => (
                                            <tr key={product.id}>
                                                <td className="w-64">
                                                    {product.id}
                                                </td>
                                                <td className="w-80">
                                                    <img className="product-image" src={product.image} alt="product"/>
                                                </td>
                                                <td>
                                                    <Typography
                                                        component={Link}
                                                        to={'/apps/e-commerce/products/' + product.id}
                                                        className="truncate"
                                                        style={{
                                                            color         : 'inherit',
                                                            textDecoration: 'underline'
                                                        }}
                                                    >
                                                        {product.name}
                                                    </Typography>
                                                </td>
                                                <td className="w-64 text-right">
                                                        <span className="truncate">
                                                            ${product.price}
                                                        </span>
                                                </td>
                                                <td className="w-64 text-right">
                                                        <span className="truncate">
                                                            {product.quantity}
                                                        </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {/*Invoice*/}
                        {tabValue === 2 &&
                        (
                            <OrderInvoice order={order}/>
                        )}
                    </div>
                )
            }
            innerScroll
        />
    )
}

export default withReducer('eCommerceApp', reducer)(Order);
