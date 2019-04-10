const fs = require('fs');
const util = require('util');
const seedrandom = require('seedrandom'); // https://github.com/davidbau/seedrandom
const rng = seedrandom('seed1');
const mkdirAsync = util.promisify(fs.mkdir);
const writeFileAsync = util.promisify(fs.writeFile);

const READS_PER_CELL = 20;
const READ_MIN = 0;
const READ_MAX = 10;
const OUTLIER_DIFF = 20;
const CELL_CODES = ["G", "A", "T", "C"];
const CSV_HEADER = "cellnames,gene,readcount,cluster\n";

const generateSet = (geneName) => {
    let rows = [];

    //Cluster 0: Identical reads
    makeRows(0, 100, geneName, [0, 0], rows);

    //Cluster 1: Identical reads with heavy outliers
    makeRows(1, 90, geneName, [0, 0], rows);
    makeRows(1, 10, geneName, [READ_MIN + OUTLIER_DIFF, READ_MAX + OUTLIER_DIFF], rows);

    //Cluster 2: Random reads
    makeRows(2, 100, geneName, [READ_MIN, READ_MAX], rows);

    //Cluster 3: Random reads with heavy outliers
    makeRows(3, 90, geneName, [READ_MIN, READ_MAX], rows);
    makeRows(3, 10, geneName, [READ_MIN + OUTLIER_DIFF, READ_MAX + OUTLIER_DIFF], rows);

    //Cluster 4: No reads (skipped)

    //Cluster 5: 1 random read
    makeRows(5, 1, geneName, [READ_MIN, READ_MAX], rows);

    //Cluster 6: Huge number of reads
    makeRows(6, 5000, geneName, [READ_MIN, READ_MAX], rows);

    //Clusters 7 - 17: Huge variance random
    for(let i = 7; i < 18; i++) {
        makeRows(i, 100, geneName, [READ_MIN, READ_MAX + OUTLIER_DIFF], rows);
    }

    return rows;
}


const makeRows = (cluster, rowCt, gene, rcRange, rows) => {
    rowCt += rows.length;

    let cellName = makeCellName();
    while(rows.length < rowCt) {
        if(rows.length % READS_PER_CELL === 0) {
            cellName = makeCellName();
        }

        rows.push([
                cellName,
                gene,
                Math.floor(rng() * rcRange[1] + rcRange[0]),
                cluster
            ]);
    }
}

const makeCellName = () => {
    let codeSeq = "";
    while(codeSeq.length < 16) {
        codeSeq += CELL_CODES[Math.floor(rng() * (CELL_CODES.length))];
    }

    return "RAND_" + codeSeq;
}

const writeToFile = (geneName, siteName, rows) => {
    mkdirAsync("dst/" + geneName, { recursive: true })
        .then(() => {
            return writeFileAsync("dst/" + geneName + "/" + siteName + "_violinPlot.csv",
                CSV_HEADER + rows.map((row) => row.join(',')).join('\n')
            );
        })
        .catch(console.error);
}

module.exports = {
    writeToFile, generateSet
};