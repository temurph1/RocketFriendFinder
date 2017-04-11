'use strict';

import assert from 'assert';
import arrEq from 'array-equal';
import range from './index';

describe('range(from, to, step)', () => {

    it('should return 0...5', () => assert.ok(arrEq(range(5), [0, 1, 2, 3, 4])));
    it('should return -3...2', () => assert.ok(arrEq(range(-3, 2), [-3, -2, -1, 0, 1])));
    it('should return 2...-4', () => assert.ok(arrEq(range(2, -4), [2, 1, 0, -1, -2, -3])));
    it('should return empty array for 1...1', () => assert.ok(arrEq(range(1, 1), [])));
    it('should return -10...30 with step of 10', () => assert.ok(arrEq(range(-10, 30, 10), [-10, 0, 10, 20])));
    it('should return 10...-30 with step of -10', () => assert.ok(arrEq(range(10, -30, -10), [10, 0, -10, -20])));
    it('should return empty array for -10...30 with step of -10', () => assert.ok(arrEq(range(-10, 30, -10), [])));
    it('should return empty array for 10...-30 with step of 10', () => assert.ok(arrEq(range(10, -30, 10), [])));
});
