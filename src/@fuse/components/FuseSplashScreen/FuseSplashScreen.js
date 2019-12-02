import React from 'react';

function FuseSplashScreen()
{
    return (
        <div id="fuse-splash-screen">

            <div className="center">

                <div className="logo">
                    <img width="128" src="https://www.easyalfred.com/wp-content/uploads/2019/11/cropped-easy-alfred-final-favicon-blue-1-180x180.png" alt="logo"/>
                </div>
                <div className="spinner-wrapper">
                    <div className="spinner">
                        <div className="inner">
                            <div className="gap"/>
                            <div className="left">
                                <div className="half-circle"/>
                            </div>
                            <div className="right">
                                <div className="half-circle"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(FuseSplashScreen);
