const settingsConfig = {
    layout          : {
        style : 'layout1', // layout-1 layout-2 layout-3
        config: 
        {
            // defaults: {
            //     mode          : 'fullwidth',
            //     scroll        : 'content',
            //     navbar        : {
            //         display : true,
            //     },
            //     toolbar       : {
            //         display : false,
            //     },
            //     footer        : {
            //         display : false,
            //     },
            //     leftSidePanel : {
            //         display: false
            //     },
            //     rightSidePanel: {
            //         display: false
            //     }
            // }
        } // checkout default layout configs at app/fuse-layouts for example  app/fuse-layouts/layout1/Layout1Config.js
    },
    customScrollbars: true,
    theme           : {
        main   : 'default',
        navbar : 'mainThemeDark',
        toolbar: 'mainThemeLight',
        footer : 'mainThemeDark'
    }
};

export default settingsConfig;
