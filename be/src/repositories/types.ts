export type QueryResult<T> = Promise<{ data: T | null; error: Error | null }>;

export type DbTable<TInsert, TSelect> = {
  insert(value: TInsert): {
    select(): {
      single(): QueryResult<TSelect>;
    };
  };
  select(columns?: string): {
    eq(column: string, value: string | number): {
      single(): QueryResult<TSelect>;
    };
  };
};

export type DbClient = {
  from<TInsert, TSelect>(table: string): DbTable<TInsert, TSelect>;
};

export function unwrap<T>(result: { data: T | null; error: Error | null }, fallback: string): T {
  if (result.error) throw result.error;
  if (!result.data) throw new Error(fallback);
  return result.data;
}
