import { useState } from "react";
import { Text, View } from "react-native";
import Buttons from "./Buttons";
import ZeroButton from "./ZeroButton";

const topSymbols = ["AC", "+/-", "%", "/"];
const firstRow = ["7", "8", "9", "*"];
const secondRow = ["4", "5", "6", "-"];
const thirdRow = ["1", "2", "3", "+"];

export default function Index() {
  const [displayValue, setDisplayValue] = useState("");
  const [isResultShown, setIsResultShown] = useState(false);

  const updateDisplay = (value: string) => {
    // 🔹 Clear the display
    if (value === "AC") {
      setDisplayValue("");
      setIsResultShown(false);
      return;
    }

    // 🔹 Toggle sign (+/-)
    if (value === "+/-") {
      if (displayValue) {
        if (displayValue.startsWith("-")) {
          setDisplayValue(displayValue.slice(1));
        } else {
          setDisplayValue("-" + displayValue);
        }
      }
      return;
    }

    // 🔹 Percentage conversion
    if (value === "%") {
      try {
        const result = parseFloat(displayValue) / 100;
        setDisplayValue(result.toString());
        setIsResultShown(true);
      } catch {
        setDisplayValue("Error");
        setIsResultShown(true);
      }
      return;
    }

    // 🔹 If result was shown and user presses number → start fresh
    if (isResultShown && /[0-9.]/.test(value)) {
      setDisplayValue(value);
      setIsResultShown(false);
      return;
    }

    // 🔹 If result was shown and user presses operator → continue
    if (isResultShown && /[+\-*/]/.test(value)) {
      setIsResultShown(false);
    }

    setDisplayValue((prev) => prev + value);
  };

  const performOperation = (op: string) => {
    if (displayValue === "") return;

    const lastChar = displayValue.slice(-1);
    if (["+", "-", "*", "/"].includes(lastChar)) {
      setDisplayValue(displayValue.slice(0, -1) + op);
    } else {
      setDisplayValue(displayValue + op);
    }
  };

  const calculate = () => {
    if (displayValue === "") return;
    try {
      const result = eval(displayValue);
      if (result === Infinity || result === -Infinity || isNaN(result)) {
        setDisplayValue("Error");
        setIsResultShown(true);
        return;
      }
      setDisplayValue(result.toString());
      setIsResultShown(true);
    } catch {
      setDisplayValue("Error");
      setIsResultShown(true);
    }
  };

  return (
    <View className="flex-1 flex-col justify-center">
      {/* Display Section */}
      <View className="text-3xl h-[30%] bg-slate-100 flex-col items-end justify-end px-4">
        <Text
          className="text-black text-6xl font-bold"
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {displayValue || "0"}
        </Text>
      </View>

      {/* Buttons Section */}
      <View className="bg-slate-100 h-[70%] flex-col justify-evenly mx-2">
        {/* Top row: AC, +/-, %, / */}
        <View className="flex-row justify-between gap-4">
          {topSymbols.map((e) =>
            e != "/" ? (
              <Buttons
                key={e}
                value={e}
                bgColor="#F5DA27"
                textColor="#000"
                onPress={() => updateDisplay(e)}
              />
            ) : (
              <Buttons
                key={e}
                value={e}
                bgColor="#F5AD27"
                textColor="#fff"
                onPress={() => performOperation("/")}
              />
            )
          )}
        </View>

        {/* Row 1 */}
        <View className="flex-row justify-between gap-4">
          {firstRow.map((e) =>
            e != "*" ? (
              <Buttons
                key={e}
                value={e}
                bgColor="#E3E3DE"
                textColor="#000"
                onPress={() => updateDisplay(e)}
              />
            ) : (
              <Buttons
                key={e}
                value={e}
                bgColor="#F5AD27"
                textColor="#fff"
                onPress={() => performOperation("*")}
              />
            )
          )}
        </View>

        {/* Row 2 */}
        <View className="flex-row justify-between gap-4">
          {secondRow.map((e) =>
            e != "-" ? (
              <Buttons
                key={e}
                value={e}
                bgColor="#E3E3DE"
                textColor="#000"
                onPress={() => updateDisplay(e)}
              />
            ) : (
              <Buttons
                key={e}
                value={e}
                bgColor="#F5AD27"
                textColor="#fff"
                onPress={() => performOperation("-")}
              />
            )
          )}
        </View>

        {/* Row 3 */}
        <View className="flex-row justify-between gap-4">
          {thirdRow.map((e) =>
            e != "+" ? (
              <Buttons
                key={e}
                value={e}
                bgColor="#E3E3DE"
                textColor="#000"
                onPress={() => updateDisplay(e)}
              />
            ) : (
              <Buttons
                key={e}
                value={e}
                bgColor="#F5AD27"
                textColor="#fff"
                onPress={() => performOperation("+")}
              />
            )
          )}
        </View>

        {/* Bottom Row */}
        <View className="flex-row gap-4">
          <ZeroButton
            bgColor="#E3E3DE"
            textColor="#000"
            onPress={() => updateDisplay("0")}
          />
          <Buttons
            value="."
            bgColor="#E3E3DE"
            textColor="#000"
            onPress={() => updateDisplay(".")}
          />
          <Buttons
            value="="
            bgColor="#F5AD27"
            textColor="#fff"
            onPress={calculate}
          />
        </View>
      </View>
    </View>
  );
}
