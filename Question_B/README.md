# Version Comparator

This TypeScript library provides a function to compare two version strings and determine if one is greater than, equal, or less than the other.

## Usage

To use the library, import the `compareVersions` function and pass two version strings as arguments. The function will return:
- `1` if the first version is greater than the second,
- `-1` if the first version is less than the second,
- `0` if both versions are equal.

Example:

```typescript
import { compareVersions } from './path-to/versionCompare';

const result = compareVersions("1.2", "1.3");
console.log(result); // Output: -1, 0, or 1
```

## Running the Tests
```
npm install
npm test
```

This will execute the test cases defined in the project using Jest. The tests are designed to check various scenarios to ensure the compareVersions function behaves as expected for different version string inputs.
