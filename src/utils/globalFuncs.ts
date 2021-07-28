import { StaticticService, StatisticResponse } from "../services/StatisticService";
import ChartStore from '../stores/ChartStore';
import StatisticStore from '../stores/StatisticStore';
import { Ajax } from "./http";

export default function registerGlobalFuncs() {
    // 'bhp_asx','apt_asx'
    (window as any).stockSearch = async (symbol: string) => {
        ChartStore.init = true;
        ChartStore.pending = true;
        let data: any = await new Ajax('/prices', {
            symbol: symbol,
        }).get();
        let statisticData: StatisticResponse;
        try {
            statisticData = await new StaticticService(symbol).send();
        } catch (e) {
            return;
        }
        ChartStore.pending = false;
        ChartStore.paintChart(false, data);
        StatisticStore.paintChart(statisticData);

    }
}