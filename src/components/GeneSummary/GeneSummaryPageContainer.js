import { connect } from 'react-redux';
import GeneSummaryPage from './GeneSummaryPage';

const mapStateToProps = (state, props) =>
    ({
        geneSymbol: "EGF"
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
    });

export default connect(mapStateToProps, mapDispatchToProps)(GeneSummaryPage);