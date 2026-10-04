import test from 'node:test';
import assert from 'node:assert/strict';
import { tripDay } from '../public/date.mjs';
test('uses Minsk date at UTC midnight boundary', () => {
  assert.equal(tripDay(new Date('2026-10-03T20:59:59Z')), null);
  assert.equal(tripDay(new Date('2026-10-03T21:00:00Z')), '04');
  assert.equal(tripDay(new Date('2026-10-08T21:00:00Z')), '09');
  assert.equal(tripDay(new Date('2026-10-09T21:00:00Z')), null);
});
test('selects each of six trip days', () => {
  for (let day = 4; day <= 9; day++) assert.equal(tripDay(new Date(`2026-10-0${day}T12:00:00Z`)), `0${day}`);
  assert.equal(tripDay(new Date('2027-10-04T12:00:00Z')), null);
});
