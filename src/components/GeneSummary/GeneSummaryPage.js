import React, { Component } from 'react';
import { Button, Card, Row, CardBody, Col, Container } from 'reactstrap';
import PropTypes from 'prop-types';
import Api from '../../helpers/Api';

import GeneSummaryViolinPlotContainer from './GeneSummaryViolinPlotContainer';
import GeneSearchFormContainer from "../GeneSearch/GeneSearchFormContainer";

class GeneSummaryPage extends Component {

    render() {
        return (
            <Container id="gene-summary-page">
                <GeneSearchFormContainer/>
                <Row id="gene-summary-page-header">
                    <Col xs="12" sm="12">
                        <div>
                        <span id="gene-summary-page-header-text" className="float-left">{this.props.geneSymbol} expression by cell type across methods</span>
                        <Button tag="a" className="float-right" color="primary"
                            href={Api.getDownloadReadyViolinPlotPath(this.props.geneSymbol)}
                            download={Api.getDownloadReadyViolinPlotFilename(this.props.geneSymbol)}
                            >Download</Button>
                        </div>
                    </Col>
                </Row>
                <Row id="gene-summary-plots">
                    <Col xs="12" sm="10">
                        <GeneSummaryViolinPlotContainer datasetName={"MDSCRNA-SEQ"} tisName={"(UCSF/Stanford)"} selectedGene={this.props.geneSymbol}/>
                        <GeneSummaryViolinPlotContainer datasetName={"SCRNA-SEQ"} tisName={"(Michigan/Broad/Princeton)"} selectedGene={this.props.geneSymbol}/>
                        <GeneSummaryViolinPlotContainer datasetName={"SNDROP-SEQ"} tisName={"(UCSD/WashU)"} />
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