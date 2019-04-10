import { connect } from 'react-redux';
import GeneSummaryPage from './GeneSummaryPage';

const mapStateToProps = (state, props) =>
    ({
        geneSymbol: state.selectedGene
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
    });

export default connect(mapStateToProps, mapDispatchToProps)(GeneSummaryPage);