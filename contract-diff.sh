#!/bin/zsh

cd contracts/dev/ocr2dr
for f in *
do
	echo "\n\n######################## DIFF for ${f}"
	diff ${f} ~/chainlink/contracts/src/v0.8/dev/ocr2dr/${f}
done

cd ../ocr2
for f in *
do
	echo "\n\n######################## DIFF for ${f}"
	diff ${f} ~/chainlink/contracts/src/v0.8/dev/ocr2/${f}
done

cd ../interfaces
for f in *
do
	echo "\n\n######################## DIFF for ${f}"
	diff ${f} ~/chainlink/contracts/src/v0.8/dev/interfaces/${f}
done

