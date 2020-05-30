import * as React from 'react';
import PieChart from '../../core/PieChartComponent';
import { Grid, makeStyles, Theme, createStyles } from '@material-ui/core';
import { IPieData, IBarData } from '../../models/Dashboard';
import Legend from '../../core/LegendComponent';
import { Weekly } from '../../constants/enums';

interface IProps {
  data?: number[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

const DashBoardComponent = (props: IProps) => {
  const classes = useStyles();

  const pieData = [
    { name: '0 - 50', value: 70, color: '#488f31' },
    { name: '50 - 60', value: 20, color: '#ffe03b' },
    { name: '60 - 120', value: 10, color: '#de3e16' },
  ] as IPieData[];

  return (
    <div className={classes.root}>
      <Grid container={true} direction="row" justify="space-around" alignItems="center" spacing={3}>
        <Grid item={true} xs={4}>
          <PieChart data={pieData} title="Over Speed" />
        </Grid>
        <Grid item={true} xs={4}>
          <PieChart data={pieData} title="Harsh Break" />
        </Grid>
        <Grid item={true} xs={4}>
          <PieChart data={pieData} title="Harsh Turn" />
        </Grid>
      </Grid>
      <Grid container={true} direction="row" justify="space-around" alignItems="center" spacing={3}>
        <Legend data={pieData} />
        <Legend data={pieData} />
        <Legend data={pieData} />
      </Grid>
    </div>
  );
};

export default DashBoardComponent;