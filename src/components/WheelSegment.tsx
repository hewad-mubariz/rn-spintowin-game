import React from "react";
import { G, Path, Rect, Text as SText } from "react-native-svg";
import Animated, {
  createAnimatedPropAdapter,
  interpolateColor,
  processColor,
  useAnimatedProps,
} from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

type SegmentData = {
  pathData: string;
  centroid: [number, number];
  rotationAngle: number;
  amount: number;
};

type WheelSegmentProps = {
  segment: SegmentData;
  selectedSegmentAnimatedIndex: Animated.SharedValue<number>;
  colorProgress: Animated.SharedValue<number>;
  index: number;
};

const WheelSegment: React.FC<WheelSegmentProps> = ({
  segment,
  selectedSegmentAnimatedIndex,
  colorProgress,
  index,
}) => {
  const adapter = createAnimatedPropAdapter(
    (props: any) => {
      if (Object.keys(props).includes("fill")) {
        props.fill = { type: 0, payload: processColor(props.fill) };
      }
    },
    ["fill"]
  );
  const segmentProps = useAnimatedProps(
    () => {
      return {
        fill:
          index === selectedSegmentAnimatedIndex.value
            ? interpolateColor(
                colorProgress.value,
                [0, 1],
                ["#AF93EA", "#AF93EA"]
              )
            : interpolateColor(
                colorProgress.value,
                [0, 1],
                ["#AF93EA", "#724cbd"]
              ),
      };
    },
    [],
    adapter
  );
  return (
    <G>
      <AnimatedPath
        d={segment.pathData}
        animatedProps={segmentProps}
        stroke={"#C2ABC0"}
      />
      <G
        x={segment.centroid[0]}
        y={segment.centroid[1]}
        transform={`rotate(${segment.rotationAngle})`}
      >
        <Rect
          x={-20}
          y={-12}
          width={50}
          height={30}
          rx={5}
          ry={5}
          fill="#F4CB79"
        />

        <SText
          fontSize={14}
          x={-3}
          y={3.5}
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="central"
          fill="#fff"
        >
          X {segment.amount}
        </SText>
      </G>
    </G>
  );
};

export default WheelSegment;
