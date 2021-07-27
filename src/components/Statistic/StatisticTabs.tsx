
import { useState } from 'react';
import { useHistory } from 'react-router';
import ChartsConfig from '../../config/ChartsConfig';
import { StatisticType } from '../../services/StatisticService';
import './Statistic.scss';



interface StatisticTabProps {
    onChanged?: Function
}

export default function StatisticTabs(props: StatisticTabProps) {
    const [checkedTab, changeTab] = useState(StatisticType.incomes);
    const [checkedPosition, changePosition] = useState('0');
    let config:ChartsConfig = new ChartsConfig();
    let onChange = (type: StatisticType, index: number) => {
        changeTab(type);
        changePosition(((100 /config.statisticTabs.length) * index) + '%');
        props?.onChanged && props?.onChanged(type);
    };
    return (
        <div className="statisticTabWrapper">
            <div className="taberContainer">
                <div className="tabBar" style={{
                    width: (100 / config.statisticTabs.length) + '%',
                    left: checkedPosition
                }}
                ></div>
                <div className="taber">
                    {config.statisticTabs.map((t, i) => {
                        return <div className={checkedTab === t.type ? 'tabItemChecked' : 'tabItem'} onClick={() => {
                            onChange(t.type, i);
                            return;
                        }}>
                            {t.text}
                        </div>
                    })}
                </div>

            </div>
        </div>
    );
}