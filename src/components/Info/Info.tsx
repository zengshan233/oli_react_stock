
import { useState } from 'react';
import ChartStore from '../../stores/ChartStore';
import icons from '../../images/images';
import './Info.scss';

const tabs: Array<any> = [
    { icon: icons.statistic, iconOff: icons.statistic_off, key: 1 },
    { icon: icons.statistic, iconOff: icons.statistic_off, key: 2 },
    { icon: icons.statistic, iconOff: icons.statistic_off, key: 3 },
];

export default function Info() {
    const [checkedTab, changeTab] = useState(1);
    const [checkedPosition, changePosition] = useState('0');
    let onChange = (key: number, index: number) => {
        changeTab(key);
        changePosition(((100 / tabs.length) * index) + '%');
    };
    return (
        <div className="tabWrapper">
            <div className="taberContainer">
                <div className="taber">
                    {tabs.map((t, i) => {
                        return <div className="tabItem" onClick={() => {
                            ChartStore.stockTab = t.key;
                            onChange(t.key, i);
                            return;
                        }}>
                            <img src={ChartStore.stockTab == t.key ? t.icon : t.iconOff}></img>
                        </div>
                    })}
                </div>
                <div className="tabBar" style={{
                    left: checkedPosition
                }}
                ></div>
            </div>
        </div>
    );
}