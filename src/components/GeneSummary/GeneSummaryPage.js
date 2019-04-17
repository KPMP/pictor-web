import React, { Component } from 'react';
import { Button, Card, Row, CardBody, Col, Container } from 'reactstrap';
import PropTypes from 'prop-types';

import GeneSummaryViolinPlotD3 from './GeneSummaryViolinPlotD3';

class GeneSummaryPage extends Component {

    render() {
        return (
            <Container id="gene-summary-page">
                <Row id="gene-summary-page-header">
                    <Col xs="12" sm="8">
                        <div>
                        <span id="gene-summary-page-header-text" className="float-left">{this.props.geneSymbol} expression by cell type across methods</span>
                        <Button className="float-right" color={"primary"}>Download</Button>
                        </div>
                    </Col>
                </Row>
                <Row id="gene-summary-plots">
                    <Col xs="12" sm="10">
                        <GeneSummaryViolinPlotD3 datasetName={"MDSCRNA-SEQ"} tisName={"(UCSF/Stanford)"}/>
                        <GeneSummaryViolinPlotD3 datasetName={"SCRNA-SEQ"} tisName={"(Michigan/Broad/Princeton)"}/>
                        <GeneSummaryViolinPlotD3 datasetName={"SNDROP-SEQ"} tisName={"(UCSD/WashU)"}/>
                        <GeneSummaryViolinPlotD3 datasetName={"LMD"} tisName={"(IU/OSU)"}/>
                    </Col>
                    <Col xs="12" sm="2">
                        <Card id="gene-summary-legend">
                            <CardBody>
                                <span id="gene-summary-legend-title">Legend</span>
	                                <ol>
	                                    <li>PEC</li>
	                                    <li>POD</li>
	                                </ol>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

GeneSummaryPage.propTypes = {
    geneSymbol: PropTypes.string.isRequired,
};

export default GeneSummaryPage;