import { SCREEN_WIDTH } from "../constants/screen";
import { line, arc as d3Arc } from "d3-shape";
const generateBowShape = () => {
  const radius = SCREEN_WIDTH / 6;
  const angleRange = (Math.PI * 2) / 3;
  const numPoints = 25;

  const points: [number, number][] = Array.from(
    { length: numPoints },
    (_, i) => {
      const angle =
        (i / (numPoints - 1)) * angleRange - (Math.PI + angleRange) / 2;
      const x: number = SCREEN_WIDTH / 2 + radius * Math.cos(angle);
      const y: number = 115 + radius * Math.sin(angle);
      return [x, y];
    }
  );
  const lineGenerator = line()
    .x((d) => d[0])
    .y((d) => d[1]);

  return lineGenerator(points)!;
};

const generateDaggerShape = () => {
  const baseWidth = 20;
  const height = 25;
  const holdHeight = 10;
  const holdWidth = 10;
  const yOffset = -40;

  const points: [number, number][] = [
    [SCREEN_WIDTH / 2 - baseWidth / 2, 75 + yOffset],
    [SCREEN_WIDTH / 2, 75 - height + yOffset],
    [SCREEN_WIDTH / 2 + baseWidth / 2, 75 + yOffset],
    [SCREEN_WIDTH / 2 + holdWidth / 2, 75 + yOffset],
    [SCREEN_WIDTH / 2 + holdWidth / 2, 75 + holdHeight + yOffset],
    [SCREEN_WIDTH / 2 - holdWidth / 2, 75 + holdHeight + yOffset],
    [SCREEN_WIDTH / 2 - holdWidth / 2, 75 + yOffset],
  ];

  const lineGenerator = line()
    .x((d) => d[0])
    .y((d) => d[1]);

  return lineGenerator(points) + "Z";
};

const generateWheelSegments = (segments: number[]) => {
  const wheelSize = SCREEN_WIDTH - 50;
  const radius = wheelSize / 2;
  const cornerRadius = 5;
  const arc = d3Arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius)
    .cornerRadius(cornerRadius);
  const segmentSpacing = 0.04;
  const angleOffset = -Math.PI / segments.length;

  return segments.map((amount, index) => {
    const startAngle =
      (2 * Math.PI * index) / segments.length +
      segmentSpacing / 2 +
      angleOffset;
    const endAngle =
      (2 * Math.PI * (index + 1)) / segments.length -
      segmentSpacing / 2 +
      angleOffset;

    const rotationAngle = ((startAngle + endAngle) / 2) * (180 / Math.PI);

    const pathData = arc({ startAngle, endAngle } as any)!;
    const centroid = arc.centroid({ startAngle, endAngle } as any);

    return { pathData, centroid, rotationAngle, amount };
  });
};

export { generateBowShape, generateDaggerShape, generateWheelSegments };
