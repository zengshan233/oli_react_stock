
import App from "../components/App";
import { FullScreenCharts } from "../components/Charts/FullScreenChart";
import { Statistic } from "../components/Statistic/Statistic";
import StockData from "../components/StockData/StockData";

const routes = [
    {

        path: "/", component: App,
        routes: [

            { path: "/", exact: true, component: Statistic },
            { path: "/data", exact: true, component: StockData },
        ]
    },
    // {
    //     path: '/fullScreenChart',
    //     component: FullScreenCharts
    // },

]

export default routes



