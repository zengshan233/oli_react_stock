
import './Info.scss';

export default function Info() {
    return (
        <div className="info-wrapper">
            <div className="tabs">
                <div className="tab">
                    <img src={require(`../../images/indicators.svg`).default}></img>
                    <div className="line"></div>
                </div>
                <div className="tab">
                    <img src={require(`../../images/indicators.svg`).default}></img>
                    <div className="line"></div>
                </div>
                <div className="tab">
                    <img src={require(`../../images/indicators.svg`).default}></img>
                    <div className="line"></div>
                </div>
            </div>
        </div>
    );
}