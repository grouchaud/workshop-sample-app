// Pure: resolves a fetch outcome into either the parsed body (success) or a
// thrown Error carrying the server's message, including 409 conflict text.
export function parseApiResponse(ok, body) {
  if (!ok) throw new Error(body.error ?? 'Unable to complete the request.');
  return body;
}

// Pure: the form resets only on success — never on error, 409 conflicts included.
export function shouldResetFormOnOutcome(outcome) {
  return outcome === 'success';
}
