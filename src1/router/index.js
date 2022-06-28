import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: {name: 'Marketplace'},
    },
    {
        path: '/coming-soon',
        name: 'ComingSoon',
        component: () => import('../views/ComingSoon'),
    },
    {
        path: '/claim-token',
        name: 'ClaimToken',
        component: () => import('../views/ClaimToken'),
    },
    {
        path: '/event',
        component: () => import('../views/Event/Master/MasterEvent'),
        name: 'Event',
        redirect: {name: 'EventList'},
        children: [
            {
                path: 'list',
                name: 'EventList',
                // component: () => import('../views/ComingSoon'),
                component: () => import('../views/Event/Event.vue')
            },
            {
                path: 'detail/:id',
                name: 'EventDetail',
                // component: () => import('../views/ComingSoon'),
                component: () => import('../views/Event/EventDetail.vue')
            },
        ]
    },
    {
        path: '/market',
        component: () => import('../views/Marketplace/Master/MasterMarketplace'),
        name: 'Marketplace',
        redirect: {name: 'MarketplaceEgg'},
        children: [
            {
                path: 'swap-egg',
                name: 'MarketplaceSwapEgg',
                // component: () => import('../views/ComingSoon'),
                component: () => import('../views/Marketplace/MarketplaceSwapEgg'),
            },
            {
                path: 'my-orders',
                name: 'MyOrderMarketplaceEgg',
                // component: () => import('../views/ComingSoon'),
                component: () => import('../views/Marketplace/MyOrder/MyOrderMarketplaceEgg'),
            },
            {
                path: 'eggs',
                name: 'MarketplaceEgg',
                // component: () => import('../views/ComingSoon'),
                component: () => import('../views/Marketplace/MarketplaceEgg'),
            },
            {
                path: 'snakes',
                name: 'MarketplaceSnake',
                // component: () => import('../views/ComingSoon'),
                component: () => import('../views/Marketplace/MarketplaceSnake'),
            },
            {
                path: 'pieces',
                name: 'MarketplacePiece',
                // component: () => import('../views/ComingSoon'),
                component: () => import('../views/Marketplace/MarketplacePiece')
            },
            // {
            //     path: 'chests',
            //     name: 'MarketplaceChest',
            //     // component: () => import('../views/ComingSoon'),
            //     component: () => import('../views/Marketplace/MarketplaceSnake')
            // },
        ]
    },
    {
        path: '/market',
        component: () => import('../views/Marketplace/Detail/Master/MasterMarketplaceDetail'),
        name: 'MarketplaceDetail',
        redirect: {name: 'MarketplaceEggDetail'},
        children: [

            {
                path: 'egg/detail/:id',
                name: 'MarketplaceEggDetail',
                // component: () => import('../views/ComingSoon'),
                component: () => import('../views/Marketplace/Detail/MarketplaceEggDetail'),
            },
            {
                path: 'piece/detail/:id',
                name: 'MarketplacePieceDetail',
                // component: () => import('../views/ComingSoon'),
                component: () => import('../views/Marketplace/Detail/MarketplacePieceDetail'),
            },
            // {
            //     path: 'snakes',
            //     name: 'MarketplaceSnake',
            //     // component: () => import('../views/ComingSoon'),
            //     component: () => import('../views/Marketplace/MarketplaceSnake'),
            // },
            // {
            //     path: 'pieces',
            //     name: 'MarketplacePiece',
            //     // component: () => import('../views/ComingSoon'),
            //     component: () => import('../views/Marketplace/MarketplacePiece')
            // },
            // {
            //     path: 'chests',
            //     name: 'MarketplaceChest',
            //     // component: () => import('../views/ComingSoon'),
            //     component: () => import('../views/Marketplace/MarketplaceSnake')
            // },
        ]
    },
    // {
    //     path: '/market',
    //     component: () => import('../views/Marketplace/Detail/Master/MasterMarketplaceDetail'),
    //     name: 'MarketplaceDetailProduct',
    //     redirect: {name: 'MarketplaceSnake'},
    //     children: [
    //         {
    //             path: 'snakes/detail/:id',
    //             name: 'MarketplaceSnakeDetail',
    //             component: () => import('../views/ComingSoon'),
    //             // component: () => import('../views/Marketplace/MarketplaceSnake'),
    //         },
    //         {
    //             path: 'eggs/detail/:id',
    //             name: 'MarketplaceEggDetail',
    //             // component: () => import('../views/ComingSoon'),
    //             component: () => import('../views/Marketplace/Detail/MarketplaceEggDetail'),
    //         },
    //         {
    //             path: 'pieces/detail/:id',
    //             name: 'MarketplacePieceDetail',
    //             component: () => import('../views/ComingSoon'),
    //             // component: () => import('../views/Marketplace/MarketplaceSnake')
    //         },
    //         {
    //             path: 'chests/detail/:id',
    //             name: 'MarketplaceChestDetail',
    //             component: () => import('../views/ComingSoon'),
    //             // component: () => import('../views/Marketplace/MarketplaceSnake')
    //         },
    //     ]
    // },
    // {
    //     path: '/eggs-detail',
    //     name: 'EggsDetail',
    //     component: () => import('../views/EggsDetail')
    // },
    // {
    //     path: '/eggs-piece-detail',
    //     name: 'EggsPieceDetail',
    //     component: () => import('../views/EggsPieceDetail')
    // },
    // {
    //     path: '/event-detail',
    //     name: 'EventDetail',
    //     component: () => import('../views/EventDetail')
    // },
    // {
    //     path: '/market-box',
    //     name: 'MarketBox',
    //     component: () => import('../views/MarketBox')
    // },
    // {
    //     path: '/market-eggs',
    //     name: 'MarketEggs',
    //     component: () => import('../views/MarketEggs')
    // },
    // {
    //     path: '/market-eggs-piece',
    //     name: 'MarketEggsPiece',
    //     component: () => import('../views/MarketEggsPiece')
    // },
    // {
    //     path: '/marketplace',
    //     name: 'Marketplace',
    //     component: () => import('../views/Marketplace')
    // },
    // {
    //     path: '/snake-detail',
    //     name: 'SnakeDetail',
    //     component: () => import('../views/SnakeDetail')
    // },
    {
        path: '/game-wallet',
        component: () => import('../views/GameWallet/Master/MasterGameWallet'),
        redirect: {name: 'GameWalletSnake'},
        name: 'GameWallet',
        children: [
            {
                path: 'snakes',
                name: 'GameWalletSnake',
                // component: () => import('../views/ComingSoon'),
                component: () => import('../views/GameWallet/GameWalletSnake')
            },
            // {
            //     path: 'eggs',
            //     name: 'GameWalletEgg',
            //     // component: () => import('../views/ComingSoon'),
            //     component: () => import('../views/GameWallet/GameWalletEgg')
            // },
            {
                path: 'eggs',
                name: 'GameWalletEgg1155',
                // component: () => import('../views/ComingSoon'),
                component: () => import('../views/GameWallet/GameWalletEgg1155')
            },
            {
                path: 'pieces',
                name: 'GameWalletPiece',
                // component: () => import('../views/ComingSoon'),
                component: () => import('../views/GameWallet/GameWalletPiece')
            },
            {
                path: 'chests',
                name: 'GameWalletChest',
                // component: () => import('../views/ComingSoon'),
                component: () => import('../views/GameWallet/GameWalletChest')
            },
            {
                path: 'event-chests',
                name: 'GameWalletChestEvent',
                // component: () => import('../views/MyWallet/GameWalletEventBoxTest'),
                component: () => import('../views/GameWallet/GameWalletChestEvent')
            },
            {
                path: 'items',
                name: 'GameWalletItem',
                // component: () => import('../views/ComingSoon'),
                component: () => import('../views/GameWallet/GameWalletItem')
            },
            {
                path: 'token',
                name: 'GameWalletToken',
                // component: () => import('../views/ComingSoon'),
                component: () => import('../views/GameWallet/GameWalletToken')
            },
            {
                path: 'top-snake',
                name: 'GameWalletTopSnake',
                // component: () => import('../views/ComingSoon'),
                component: () => import('../views/GameWallet/GameWalletTopSnake')
            },
        ]
    },
    {
        path: '/my-wallet',
        component: () => import('../views/MyWallet/Master/MasterMyWallet'),
        redirect: {name: 'MyWalletSnake'},
        name: 'MyWallet',
        children: [
            {
                path: 'snakes',
                name: 'MyWalletSnake',
                // component: () => import('../views/ComingSoon'),
                component: () => import('../views/MyWallet/MyWalletSnake')
            },
            // {
            //     path: 'eggs',
            //     name: 'MyWalletEgg',
            //     // component: () => import('../views/ComingSoon'),
            //     component: () => import('../views/MyWallet/MyWalletEgg')
            // },
            {
                path: 'eggs-1155',
                name: 'MyWalletEgg1155',
                // component: () => import('../views/ComingSoon'),
                component: () => import('../views/MyWallet/MyWalletEgg1155')
            },
            {
                path: 'pieces',
                name: 'MyWalletPiece',
                // component: () => import('../views/ComingSoon'),
                component: () => import('../views/MyWallet/MyWalletPiece')
            },
            // {
            //     path: 'chests',
            //     name: 'MyWalletChest',
            //     // component: () => import('../views/ComingSoon'),
            //     component: () => import('../views/MyWallet/MyWalletChest')
            // },
            // {
            //     path: 'event-chests',
            //     name: 'MyWalletChestEvent',
            //     // component: () => import('../views/ComingSoon'),
            //     component: () => import('../views/MyWallet/MyWalletChestEvent')
            // },
        ]
    },
    {
        path: '/admin@cpanel',
        component: () => import('../views/Admin/Master/MasterAdmin'),
        redirect: {name: 'CompoundSetting'},
        children: [
            {
                path: 'compound-setting',
                name: 'CompoundSetting',
                component: () => import('../views/Admin/CompoundRateConfig')
            },
            {
                path: 'open-egg-unicorn-rate-setting',
                name: 'OpenEggUnicornRateSetting',
                component: () => import('../views/Admin/RateOpenEggUnicorn')
            },
            {
                path: 'open-box-rate-setting',
                name: 'OpenBoxRateConfig',
                component: () => import('../views/Admin/OpenBoxRateConfig')
            },
            {
                path: 'game-setting',
                name: 'GameSetting',
                // component: () => import('../views/ComingSoon'),
                component: () => import('../views/Admin/GameSetting')
            },
            // {
            //     path: 'web-setting',
            //     name: 'WebSetting',
            //     // component: () => import('../views/ComingSoon'),
            //     component: () => import('../views/Admin/WebSetting')
            // },
            {
                path: 'admin-blockchain',
                name: 'AdminBlockchain',
                // component: () => import('../views/ComingSoon'),
                component: () => import('../views/Admin/Blockchain')
            },
            {
                path: 'transaction-rim-check',
                name: 'TransactionRimCheck',
                component: () => import('../views/Admin/TransactionRimCheck')
            },
            {
                path: 'reback-rim',
                name: 'RebackRim',
                component: () => import('../views/Admin/RebackRim')
            },
            {
                path: 'change-page-password',
                name: 'ChangePagePassword',
                component: () => import('../views/Admin/ChangePagePassword')
            },
            {
                path: 'reback-pieces',
                name: 'RebackPiece',
                component: () => import('../views/Admin/RebackPiece')
            },
            {
                path: 'reback-eggs',
                name: 'RebackEgg',
                component: () => import('../views/Admin/RebackEgg')
            },
            {
                path: 'reback-snakes',
                name: 'RebackSnake',
                component: () => import('../views/Admin/RebackSnake')
            },
            {
                path: 'link-download',
                name: 'LinkDownload',
                component: () => import('../views/Admin/LinkDownload')
            },
            {
                path: 'social-link',
                name: 'SocialMedia',
                component: () => import('../views/Admin/SocialMedia')
            },
            {
                path: 'banner-notification',
                name: 'BannerNotification',
                component: () => import('../views/Admin/BannerNotification')
            },
        ]
    },
    {
        path: '/profile',
        name: 'Profile',
        // component: () => import('../views/ComingSoon'),
        component: () => import('../views/Profile')
    },
    {
        path: '/leaderboard',
        name: 'Leaderboard',
        // component: () => import('../views/ComingSoon'),
        component: () => import('../views/LeaderBoard')
    },
    {
        path: '/staking-3',
        name: 'staking-3',
        // component: () => import('../views/ComingSoon'),
        component: () => import('../views/ListStaking3')
    },
    {
        path: '/staking-4',
        name: 'staking-4',
        // component: () => import('../views/ComingSoon'),
        component: () => import('../views/ListStaking4')
    },
    {
        path: '/staking-5',
        name: 'staking-5',
        // component: () => import('../views/ComingSoon'),
        component: () => import('../views/ListStaking5')
    },
    {
        path: '/pools',
        component: () => import('../views/Stake/Master/MasterStake'),
        redirect: {name: 'Pool'},
        name: 'Stake',
        children: [
            {
                path: '',
                name: 'Pool',
                component: () => import('../views/Stake/Staking')
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
