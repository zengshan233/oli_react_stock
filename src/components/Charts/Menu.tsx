import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import styles from './Menu.module.scss';
import TextField from '@material-ui/core/TextField';
import ChartsConfig from '../../config/ChartsConfig';
import { ChartItem, SeriesItem } from '../../models/ChartModels';
import ChartStore from '../../stores/ChartStore';
import icons from '../../images/images';
import { observer } from 'mobx-react';

export const MenuBtn = observer(() => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const seriesCharts: Array<ChartItem> = [
        {
            id: ChartsConfig.ohlcId,
            name: ChartsConfig.ohlcName
        },

        {
            id: ChartsConfig.volumeId,
            name: ChartsConfig.volumeName
        }];


    const handleChange = (event: any) => {
        ChartStore.setChartId(event.target.value);
    };

    let seriesTypes: Array<SeriesItem> = new ChartsConfig().seriesTypes;
    return (
        <li className="Indicators">
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <img className={styles.img} src={icons.indicators} />
            </Button>
            <Menu
                className={styles.menu}
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <div className={styles.seriesMenu}>
                    {seriesTypes.map((item,idx) => (
                        <MenuItem key={idx} className={styles.seriesType} onClick={() => { ChartStore.setSeriesItem(item) }}>{item.name}</MenuItem>
                    ))}

                </div>
                <div className={styles.content}>
                    <div className={styles.title}>{ChartStore.seriesItem.name} </div>
                    <FormControl className={styles.formControl}>
                        <InputLabel id="demo-simple-select-label">Series</InputLabel>
                        <Select
                            className={styles.select}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ChartStore.seriesChartId}
                            onChange={handleChange}
                        >
                            {seriesCharts.map((chart,idx) => (
                                <MenuItem key={idx} value={chart.id}>{chart.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <form noValidate autoComplete="off">
                        {ChartStore.seriesIndex >= 0 && <div className={styles.textField}>
                            <TextField id="index" label="Index" value={ChartStore.seriesIndex} onChange={(v) => {
                                ChartStore.seriesIndex = parseInt(v.target.value);
                            }} />
                        </div>}
                        {ChartStore.seriesPeriod > 0 && <div className={styles.textField}><TextField id="period" label="Period" value={ChartStore.seriesPeriod} onChange={(v) => {
                            ChartStore.seriesPeriod = parseInt(v.target.value);
                        }} /></div>}
                    </form>
                    <div>
                        <Button className={styles.btn} onClick={() => {
                            ChartStore.addSeries();
                            handleClose();
                        }} variant="contained" color="primary">
                            Add
                        </Button>
                    </div>

                </div>

                <div className={styles.clear}></div>
            </Menu>
        </li >
    );
})