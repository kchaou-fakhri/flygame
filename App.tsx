import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { GameEngine } from "react-native-game-engine";
import { GlobalStyles } from "./src/utils/globalStyles";
import restart from "./src/hooks/useRestart";
import Physics from "./src/components/physics";

export default function App() {
  const [running, setRunning] = useState(true);

  useEffect(() => {
    setRunning(true);
  }, []);
  return (
    <View style={GlobalStyles.container}>
      <GameEngine
        style={styles.engineContainer}
        systems={[Physics]}
        entities={restart()}
        running={running}
      ></GameEngine>
    </View>
  );
}

const styles = StyleSheet.create({
  engineContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
