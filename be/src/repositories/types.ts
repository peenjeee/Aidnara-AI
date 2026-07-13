export type QueryResult<T> = Promise<{ data: T | null; error: Error | null }>;

export type DbTable<TInsert, TSelect> = {
  insert(value: TInsert): {
    select(): {
      single(): QueryResult<TSelect>;
    };
  };
  select(columns?: string): {
    order(column: string, options?: { ascending?: boolean }): QueryResult<TSelect[]>;
    eq(column: string, value: string | number): {
      single(): QueryResult<TSelect>;
      order(column: string, options?: { ascending?: boolean }): QueryResult<TSelect[]>;
    };
  };
  update(value: Partial<TSelect>): {
    eq(column: string, value: string | number): {
      select(): {
        single(): QueryResult<TSelect>;
      };
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

export function unwrapList<T>(result: { data: T[] | null; error: Error | null }): T[] {
  if (result.error) throw result.error;
  return result.data || [];
}
