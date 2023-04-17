import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { G } from "react-native-svg";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  withSequence,
} from "react-native-reanimated";
const { width } = Dimensions.get("window");
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import { generateWheelSegments } from "../utils/Path";
import SpinControl from "./SpinControl";
import WheelSegment from "./WheelSegment";
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
type WheelProps = {
  segments: number[];
  onEnd: (value: number) => void;
  onSpin: () => void;
};
const Wheel: React.FC<WheelProps> = ({ segments, onEnd, onSpin }) => {
  const rotation = useSharedValue(0);
  const colorProgress = useSharedValue(0);
  const animatedCircleY = useSharedValue(120);
  const [randomIndex, setRandomIndex] = useState(
    Math.floor(Math.random() * segments.length)
  );

  const selectedSegmentAnimatedIndex = useSharedValue(randomIndex);

  const spinWheel = () => {
    setRandomIndex(Math.floor(Math.random() * segments.length));
    selectedSegmentAnimatedIndex.value = randomIndex;
    rotation.value = 0;
    const spins = 5;
    const fullSpins = 360 * spins;
    const segmentAngle = 360 / segments.length;
    const finalRotation = fullSpins - segmentAngle * randomIndex;

    colorProgress.value = 0;

    rotation.value = withTiming(
      finalRotation,
      {
        duration: 5000,
        easing: Easing.bezier(0.33, 1, 0.68, 1),
      },
      (finished) => {
        if (finished) {
          colorProgress.value = withTiming(1);
          runOnJS(onEnd)(segments[randomIndex]);
        }
      }
    );
    animatedCircleY.value = withSequence(
      withTiming(115, { duration: 2500 }),
      withTiming(120, { duration: 2500 })
    );
    onSpin();
  };

  const animatedSvgStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <SpinControl animatedCircleY={animatedCircleY} onSpin={spinWheel} />
      <AnimatedSvg width={width} height={width} style={animatedSvgStyle}>
        <G x={width / 2} y={width / 2}>
          {generateWheelSegments(segments).map((segmentData, index) => {
            return (
              <WheelSegment
                key={index}
                index={index}
                colorProgress={colorProgress}
                segment={segmentData}
                selectedSegmentAnimatedIndex={selectedSegmentAnimatedIndex}
              />
            );
          })}
        </G>
      </AnimatedSvg>
    </View>
  );
};

export default Wheel;

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
});
