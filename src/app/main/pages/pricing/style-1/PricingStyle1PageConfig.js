import React from 'react';
import {authRoles} from 'app/auth';

export const PricingStyle1PageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : authRoles.admin,//['admin']
    routes  : [
        {
            path     : '/pages/pricing/style-1',
            component: React.lazy(() => import('./PricingStyle1Page'))
        }
    ]
};
