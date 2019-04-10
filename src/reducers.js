import { combineReducers } from 'redux';
import { resetStateReducer } from './resetStateReducer';
import { selectedGene } from "./components/GeneSummary/geneReducer";

const appReducer = combineReducers({
  resetStateReducer,
  selectedGene
});

export default appReducer;
