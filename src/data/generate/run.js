const GENES = require('./genes').genes;
const SETS = ["MDSCRNA-SEQ", "SCRNA-SEQ", "SNDROP-SEQ", "LMD"];
const {writeToFile, generateSet} = require('./generator');

for(let i = 0; i < GENES.length; i++) {
    for(let j = 0; j < SETS.length; j++) {
        writeToFile(GENES[i], SETS[j], generateSet(GENES[i]));
        writeToFile(GENES[i], SETS[j], generateSet(GENES[i]));
        writeToFile(GENES[i], SETS[j], generateSet(GENES[i]));
        writeToFile(GENES[i], SETS[j], generateSet(GENES[i]));
    }
}