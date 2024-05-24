import App from "@/App";
import { GlobalStyles } from "@/src/utils/globalStyles";
import { SafeAreaView, StatusBar } from "react-native";

export default function EntryPoint() {
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <App />
    </SafeAreaView>
  );
}
