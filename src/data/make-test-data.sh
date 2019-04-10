#!/bin/bash
for d in {EGFR,FANCI,ACTB,C4A,BUB1B,APOL1,ERBB1,ERBB2,IFIT1,TANK,ERBB3,ERGO,ERR,ERROR,EEEE,EAGLE,EAGLE2,EAGLE3} ; do
  mkdir $d
  cp violinPlot.csv ./$d
done
