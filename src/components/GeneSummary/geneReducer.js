import actionNames from '../../actions/actionNames';

export const selectedGene = (state = "", action) => {
    let newState = "";
    let selectedGene = action.payload;
    switch (action.type) {
        case actionNames.SET_SELECTED_GENE:
            newState = selectedGene;
            return newState;
        default:
            return state;
    }
}