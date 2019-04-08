import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody } from 'reactstrap';

class GeneSummaryViolinPlot extends Component
{
    render() {
        return (
            <Card className="gene-summary-plot">
                <CardHeader>
                    <div className="dataset-info float-left"><span className="dataset-name">{this.props.datasetName}</span>&nbsp;<span className="tis-name">{this.props.tisName}</span></div>
                    <div className="float-right">View Details</div>
                </CardHeader>
                <CardBody>
                    <div>Put your plot here</div>
                </CardBody>
            </Card>
        )
    }
}

GeneSummaryViolinPlot.propTypes = {
    datasetName: PropTypes.string.isRequired,
    tisName: PropTypes.string.isRequired,
};

export default GeneSummaryViolinPlot;