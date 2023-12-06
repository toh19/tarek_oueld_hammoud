# Line Segment Overlap Checker

This TypeScript library provides a simple function to determine if two line segments on the x-axis overlap.

## Usage

To use the library, import the `doLinesOverlap` function and pass two line segments as arguments. Each line segment should be represented as a tuple of two numbers, indicating the start and end points on the x-axis.

Example:

```typescript
import { doLinesOverlap } from './path-to/lineOverlap';

const result = doLinesOverlap([1, 5], [2, 6]);
console.log(result); // Output: true or false
```

## Running the Tests
```
npm install
npm test
```

This will execute the test cases defined in the project using Jest. The tests are designed to check various scenarios to ensure the doLinesOverlap function behaves as expected for different line segment inputs.
