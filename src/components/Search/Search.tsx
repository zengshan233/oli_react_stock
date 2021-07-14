import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import './Search.scss';

export default function Search() {
    return (
        <div>

            <div className='search-wrapper'>
                <div className="icon"></div>
                <Paper component="form" >
                    <img className='search' src={require(`../../images/search.svg`).default}></img>
                    <InputBase
                        placeholder="Search Google Maps"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <img className="close" src={require(`../../images/close.svg`).default}></img>
                </Paper>
            </div>

            <div className="info">
                <div className="icon"></div>
                <div className="stock-info">
                    <div className='top-info'>
                        <div className="title-info"><div className="title">BLIN</div> <div className="subtitle">NASDAQ</div></div>
                        <div className="data">4.77(+56.00%)</div>
                    </div>
                    <div className='bottom-info'>
                        <div className="abstract">BRIDGELINE DIGITAL,INC</div>
                        <img className="follow" src={require(`../../images/close.svg`).default}></img>
                    </div>
                </div>
            </div>
        </div>
    );
}