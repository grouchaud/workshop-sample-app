import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseApiResponse, shouldResetFormOnOutcome } from '../ui/apiOutcome.js';

test('parseApiResponse surfaces the server conflict message unchanged', () => {
  assert.throws(
    () => parseApiResponse(false, {
      error: 'Cedar is already booked from 2030-06-12T10:00:00.000Z to 2030-06-12T11:00:00.000Z. Choose a different time or room.',
    }),
    /2030-06-12T10:00:00\.000Z/
  );
});

test('parseApiResponse falls back to a generic message when the body has none', () => {
  assert.throws(() => parseApiResponse(false, {}), /Unable to complete the request\./);
});

test('parseApiResponse returns the body unchanged on success', () => {
  const booking = { id: 'abc', roomId: 'cedar', title: 'Standup' };
  assert.equal(parseApiResponse(true, booking), booking);
});

test('shouldResetFormOnOutcome resets only on success, never on error (conflict or otherwise)', () => {
  assert.equal(shouldResetFormOnOutcome('success'), true);
  assert.equal(shouldResetFormOnOutcome('error'), false);
});
