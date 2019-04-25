import React, { Component } from 'react';
import { Button, Card, Row, CardBody, Col, Container } from 'reactstrap';
import PropTypes from 'prop-types';
import Api from '../../helpers/Api';
import ReactGA from 'react-ga';
import GeneSummaryViolinPlotContainer from './GeneSummaryViolinPlotContainer';
import GeneSearchFormContainer from '../GeneSearch/GeneSearchFormContainer';
import GeneSummaryLegend from './GeneSummaryLegend';

class GeneSummaryPage extends Component {

	trackDownload(gene) {
        ReactGA.event({
			category: 'Download',
			action: 'Gene Expression',
			label: gene
        });
	}
	
    render() {
        return (
            <Container id="gene-summary-page">
                <GeneSearchFormContainer/>
                <Row id="gene-summary-page-header">
                    <Col xs="12" sm="12">
                        <div>
                        <span id="gene-summary-page-header-text" className="float-left">{this.props.geneSymbol} expression by cell type across methods</span>
                        <span onClick={() => this.trackDownload(this.props.geneSymbol)}>
	                        <Button tag="a" className="float-right" color="primary"
	                            href={Api.getDownloadReadyViolinPlotPath(this.props.geneSymbol)}
	                            download={Api.getDownloadReadyViolinPlotFilename(this.props.geneSymbol)}
	                            >Download</Button>
                        </span>
                        </div>
                    </Col>
                </Row>
                
                <Row id="gene-summary-plots">
                    <Col xs="12" sm="9">
                        <GeneSummaryViolinPlotContainer datasetName={"MDSCRNA-SEQ"} tisName={"(UCSF/Stanford)"} />
                        <GeneSummaryViolinPlotContainer datasetName={"SCRNA-SEQ"} tisName={"(Michigan/Broad/Princeton)"} />
                        <GeneSummaryViolinPlotContainer datasetName={"SNDROP-SEQ"} tisName={"(UCSD/WashU)"} />
                    </Col>
                    <Col xs="12" sm="3" id="gene-summary-legend-row">
                        <Card id="gene-summary-legend">
                            <CardBody>
                                <GeneSummaryLegend/>
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