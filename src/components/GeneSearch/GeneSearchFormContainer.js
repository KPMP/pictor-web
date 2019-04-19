import { connect } from 'react-redux';
import GeneSearchForm from './GeneSearchForm';
import { setSelectedGene } from '../../actions/Gene/geneActions';

const mapStateToProps = (state, props) =>
    ({
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
    	setSelectedGene(geneSymbol) {
    		dispatch(setSelectedGene(geneSymbol));
    	}
    });

export default connect(mapStateToProps, mapDispatchToProps)(GeneSearchForm);