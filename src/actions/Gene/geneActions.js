import actionNames from "../actionNames";

export const setSelectedGene = (geneSymbol) =>
{
    return {
        type: actionNames.SET_SELECTED_GENE,
        payload: geneSymbol
    }
    
}
