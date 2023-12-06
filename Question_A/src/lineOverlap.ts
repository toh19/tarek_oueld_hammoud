export function doLinesOverlap(line1: [number, number], line2: [number, number]): boolean {
  // Check if the segments are properly ordered
  if (line1[0] > line1[1] || line2[0] > line2[1]) {
    throw new Error('Line segments must be in the format [lower, upper]');
  }

  const [x1, x2] = line1;
  const [x3, x4] = line2;

  return Math.max(x1, x3) <= Math.min(x2, x4);
}
