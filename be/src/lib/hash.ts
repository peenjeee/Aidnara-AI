import { createHash } from 'crypto';

export function sha256Hex(input: string | Buffer) {
  return createHash('sha256').update(input).digest('hex');
}

export function stableJsonHash(value: unknown) {
  return sha256Hex(JSON.stringify(sortObject(value)));
}

function sortObject(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortObject);
  if (!value || typeof value !== 'object') return value;

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, child]) => [key, sortObject(child)]),
  );
}
