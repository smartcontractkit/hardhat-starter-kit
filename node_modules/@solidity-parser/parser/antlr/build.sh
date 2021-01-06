#!/bin/bash

ANTLR_JAR="antlr4.jar"

GRAMMAR="Solidity"
START_RULE="sourceUnit"
TEST_FILE="test.sol"
ERROR_PATTERN="mismatched|extraneous"

if [ ! -e "$ANTLR_JAR" ]; then
  curl https://www.antlr.org/download/antlr-4.7.2-complete.jar -o "$ANTLR_JAR"
fi

mkdir -p target/

java -jar $ANTLR_JAR $GRAMMAR.g4 -o src/
javac -classpath $ANTLR_JAR src/*.java -d target/


