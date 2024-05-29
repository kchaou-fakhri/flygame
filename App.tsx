import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { GameEngine } from "react-native-game-engine";
import { GlobalStyles } from "./src/utils/globalStyles";
import restart from "./src/hooks/useRestart";
import Physics from "./src/components/physics";
import { COLORS } from "./src/utils/colors";
import { CONSTANTS } from "./src/constants/constants";

export default function App() {
  const [running, setRunning] = useState(true);
  const [gameEngine, setGameEngine] = useState<any>(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  useEffect(() => {
    setRunning(false);
  }, []);

  const launchGame = () => {
    setRunning(true);
    setCurrentPoints(0);
  };

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{currentPoints}</Text>
      </View>
      <GameEngine
        ref={(ref) => setGameEngine(ref)}
        style={styles.engineContainer}
        systems={[Physics]}
        entities={restart()}
        onEvent={(e: Event) => {
          switch (e.type) {
            case "game_over":
              setRunning(false);
              gameEngine.stop();
              setCurrentPoints(0);
              break;
            case "new_point":
              setCurrentPoints(currentPoints + 1);
              break;
          }
        }}
        running={running}
      ></GameEngine>

      {!running ? (
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={launchGame}>
            <Text style={styles.textBtn}>{CONSTANTS.START_THE_GAME}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
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
  scoreContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  score: {
    zIndex: 1,
    fontSize: 30,
    marginTop: 15,
    color: COLORS.TextColor,
    fontWeight: "700",
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  btn: {
    backgroundColor: COLORS.Button,
    width: "70%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.Gray,
    borderRadius: 5,
  },
  textBtn: {
    color: COLORS.Gray,
    fontSize: 20,
  },
});
