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

if [[ "$1" == "-vv" ]] ; then
  java -classpath $ANTLR_JAR:target/ org.antlr.v4.gui.TestRig "$GRAMMAR" "$START_RULE" -gui < "$TEST_FILE"
else
  TEST_OUTPUT=$(java -classpath $ANTLR_JAR:target/ org.antlr.v4.gui.TestRig "$GRAMMAR" "$START_RULE" < "$TEST_FILE" 2>&1)

  if [[ "$1" == "-v" ]] ; then
    echo $TEST_OUTPUT | grep -qE "$ERROR_PATTERN" && echo "TESTS FAIL!" || echo "TESTS PASS!"
    echo ""
    echo $TEST_OUTPUT
  else
    echo $TEST_OUTPUT | grep -qE "$ERROR_PATTERN" && echo "TESTS FAIL!" || echo "TESTS PASS!"
  fi
fi


