import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SCREEN_WIDTH } from "../constants/screen";
const Header = () => {
  return (
    <>
      <View style={styles.topBar}>
        <View style={styles.closeButton}>
          <MaterialCommunityIcons name="close" size={26} color="white" />
        </View>
        <Text style={styles.topBarText}>Spin And Win!</Text>
      </View>
      <View style={styles.divider} />
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: SCREEN_WIDTH / 1.4,
    alignSelf: "flex-start",
    alignItems: "center",
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  closeButton: {
    padding: 8,
    backgroundColor: "#454D77",
    borderRadius: 14,
    paddingBottom: 10,
  },
  topBarText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "#424677",
    width: SCREEN_WIDTH * 0.9,
    height: 1,
  },
});
