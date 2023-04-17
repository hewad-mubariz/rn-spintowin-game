import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { ReText } from "react-native-redash";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { SCREEN_WIDTH } from "../constants/screen";

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

type WalletViewProps = {
  walletBalance: string;
  amountText: Animated.SharedValue<string>;
  opacity: Animated.SharedValue<number>;
};

const WalletView: React.FC<WalletViewProps> = ({
  walletBalance,
  opacity,
  amountText,
}) => {
  const labelStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  const walletContentAStyle = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        opacity.value,
        [0, 1],
        ["rgba(209, 177, 177,0.4)", "#D1A15F"]
      ),
      borderWidth: interpolate(opacity.value, [0, 1], [1, 2]),
    };
  });
  return (
    <View style={styles.walletView}>
      <AnimatedGradient
        colors={["#FFEAA2", "#ECB65B"]}
        style={[labelStyle, styles.walletLabel]}
      >
        <FontAwesome name="dollar" size={18} />
        <Text style={styles.walletLabelText}>{walletBalance}</Text>
      </AnimatedGradient>
      <AnimatedGradient
        style={[styles.walletContent, walletContentAStyle]}
        colors={["#303053", "#4C4A5F"]}
      >
        <FontAwesome5 name="coins" size={50} color="white" />
        <View style={styles.walletTextContainer}>
          <Text style={styles.addedToWalletText}>Added To Wallet</Text>
          <View style={styles.walletAmountContainer}>
            <FontAwesome name="dollar" size={24} color="white" />
            <ReText text={amountText} style={styles.walletAmountText} />
          </View>
        </View>
      </AnimatedGradient>
    </View>
  );
};

export default WalletView;
const styles = StyleSheet.create({
  walletView: {
    position: "relative",
    marginTop: 30,
  },
  walletLabel: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 4,
    alignItems: "center",
    position: "absolute",
    top: -15,
    zIndex: 2,
    width: 100,
    left: (SCREEN_WIDTH / 2 - 100) / 2,
    borderRadius: 50,
    paddingHorizontal: 12,
    height: 35,
  },
  walletLabelText: {
    fontSize: 18,
    fontWeight: "500",
  },
  walletContent: {
    width: SCREEN_WIDTH / 2,
    height: 110,
    borderColor: "rgba(209, 177, 177,0.4)",
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  walletTextContainer: {
    rowGap: 8,
  },
  addedToWalletText: {
    color: "white",
  },
  walletAmountContainer: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  walletAmountText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
