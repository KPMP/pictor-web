import React, { Component } from 'react';
import { Button, Card, Row, CardBody, Col, Container } from 'reactstrap';
import PropTypes from 'prop-types';

import GeneSummaryViolinPlot from './GeneSummaryViolinPlot';
import GeneSearchForm from "../GeneSearch/GeneSearchForm";

class GeneSummaryPage extends Component {

    render() {
        return (
            <Container id="gene-summary-page">
                <GeneSearchForm initialValue={this.props.geneSymbol}/>
                <Row id="gene-summary-page-header">
                    <Col xs="12" sm="8">
                        <div>
                        <span id="gene-summary-page-header-text" className="float-left">{this.props.geneSymbol} expression by cell type across methods</span>
                        <Button className="float-right" color={"primary"}>Download</Button>
                        </div>
                    </Col>
                </Row>
                <Row id="gene-summary-plots">
                    <Col xs="12" sm="8">
                        <GeneSummaryViolinPlot datasetName={"MDSCRNA-SEQ"} tisName={"(UCSF/Stanford)"}/>
                        <GeneSummaryViolinPlot datasetName={"SCRNA-SEQ"} tisName={"(Michigan/Broad/Princeton)"}/>
                        <GeneSummaryViolinPlot datasetName={"SNDROP-SEQ"} tisName={"(UCSD/WashU)"}/>
                        <GeneSummaryViolinPlot datasetName={"LMD"} tisName={"(IU/OSU)"}/>
                    </Col>
                    <Col xs="12" sm="4">
                        <Card id="gene-summary-legend">
                            <CardBody>
                                    <span id="gene-summary-legend-title">Legend</span>
                                    <ul>
                                        <li>0: PEC</li>
                                        <li>1: POD</li>
                                    </ul>
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