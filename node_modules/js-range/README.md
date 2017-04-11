[![npm](https://img.shields.io/npm/v/js-range.svg)](https://www.npmjs.com/package/js-range)
[![Build Status](https://travis-ci.org/roman01la/js-range.svg?branch=master)](https://travis-ci.org/roman01la/js-range)

# js-range
A function to generate an array sequence of numbers from start (inclusive) to end
(exclusive), by step, where start and end defaults to 0, and step to 1. When start is equal to end, returns empty list.
Similar to [Clojure's range](https://clojuredocs.org/clojure.core/range), but without laziness.

## Installation

```
npm i -S js-range
```

## Usage

```es6
import range from 'js-range';

range(5, 8); // [5, 6, 7]
range(5, 10, 2); // [5, 7, 9]
range(10, 5); // [10, 9, 8, 7, 6]
range(3, -10, -3) // [3, 0, -3, -6, -9]
```
