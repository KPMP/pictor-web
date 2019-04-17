import { connect } from 'react-redux';
import GeneSummaryViolinPlotD3 from './GeneSummaryViolinPlotD3';

const mapStateToProps = (state, props) =>
    ({
    	selectedGene: state.selectedGene
    });

const mapDispatchToProps = (dispatch, props) =>
    ({
    });

export default connect(mapStateToProps, mapDispatchToProps)(GeneSummaryViolinPlotD3);