
import { useState } from 'react';
import { useHistory } from 'react-router';
import './Info.scss';

const tabs: Array<any> = [
    { icon: 'statistic.svg', iconOff: 'statistic_off.svg', key: 1, link: '/' },
    { icon: 'statistic.svg', iconOff: 'statistic_off.svg', key: 2, link: '/data' },
    { icon: 'statistic.svg', iconOff: 'statistic_off.svg', key: 3, link: '/' },
];

export default function Info() {
    let history = useHistory();
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
                            history.push(t.link);
                            onChange(t.key, i);
                            return;
                        }}>
                            <img src={require(`../../images/${checkedTab == t.key ? t.icon : t.iconOff}`).default}></img>
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