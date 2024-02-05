/**
 * Overall Traffic Status Widget
 */
import React, { Component, Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

// chart
import StackedBarChart from 'Components/Charts/StackedBarChart';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// chart config
import ChartConfig from 'Constants/chart-config';

export default class OverallTrafficStatus extends Component {
	render() {
		const { chartLabels, chartDatasets, onlineSources, today, lastMonth } = this.props.chartData;
		return (
			<Fragment>
				
				<StackedBarChart
					labels={chartLabels}
					datasets={chartDatasets}
				/>
			</Fragment>
		);
	}
}
