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
            </Container>
        )
    }
}

GeneSummaryPage.propTypes = {
    geneSymbol: PropTypes.string.isRequired,
};

export default GeneSummaryPage;