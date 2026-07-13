export type ApiResult<T> =
  | { ok: true; status: number; body: T }
  | { ok: false; status: number; body: { error: string } };

export function ok<T>(body: T, status = 200): ApiResult<T> {
  return { ok: true, status, body };
}

export function fail(error: string, status = 400): ApiResult<never> {
  return { ok: false, status, body: { error } };
}

export function requireString(value: unknown, field: string) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${field} is required`);
  return value.trim();
}

export function requireOptionalString(value: unknown, field: string) {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value !== 'string') throw new Error(`${field} must be a string`);
  return value.trim();
}

export function requirePositiveNumberString(value: unknown, field: string) {
  const stringValue = requireString(value, field);
  if (!Number.isFinite(Number(stringValue)) || Number(stringValue) <= 0) {
    throw new Error(`${field} must be a positive number`);
  }
  return stringValue;
}
