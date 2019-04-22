import axios from 'axios';

export default class Api {
  static getInstance() {
    return axios.create({
      timeout: 10000,
    });
  }

  static getDatasetGeneViolinPlotFilename(dataset, gene) {
    let filename = dataset + "_violinPlot.csv";
    return "/data/gene-expression/" + gene.charAt(0) + "/" + gene + "/" + filename;
  }

  static getDownloadReadyViolinPlotPath(gene) {
    return "/data/gene-expression/" + gene.charAt(0) + "/" + gene + "/" +
        gene + "_expression.csv";
  }

    static getDownloadReadyViolinPlotFilename(gene) {
        let today = new Date(),
            dd = today.getDate(),
            mm = today.getMonth() + 1,
            yyyy = today.getFullYear();

        dd = dd < 10 ? "0" + dd : dd;
        mm = mm < 10 ? "0" + mm : mm;
        
        return `${gene}_expression_${yyyy}${mm}${dd}.csv`;
    }

}