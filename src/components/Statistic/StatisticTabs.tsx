
import { useState } from 'react';
import { useHistory } from 'react-router';
import './Statistic.scss';

const tabs: Array<any> = [
    { text: '收入', key: 1 },
    { text: '资产', key: 2 },
    { text: '现金流', key: 3 },
];

interface StatisticTabProps{
    onChanged?:Function
}

export default function StatisticTabs(props:StatisticTabProps) {
    let history = useHistory();
    const [checkedTab, changeTab] = useState(1);
    const [checkedPosition, changePosition] = useState('0');
    let onChange = (key: number, index: number) => {
        changeTab(key);
        changePosition(((100 / tabs.length) * index) + '%');
        props?.onChanged &&   props?.onChanged(key);
    };
    return (
        <div className="statisticTabWrapper">
            <div className="taberContainer">
                <div className="tabBar" style={{
                    width: (100 / tabs.length) + '%',
                    left: checkedPosition
                }}
                ></div>
                <div className="taber">
                    {tabs.map((t, i) => {
                        return <div className={checkedTab === t.key ? 'tabItemChecked' : 'tabItem'} onClick={() => {
                            onChange(t.key, i);
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