const requiredServerEnv = [
  'NEXT_PUBLIC_CHAIN_ID',
  'NEXT_PUBLIC_CONTRACT_ADDRESS',
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'AI_API_KEY',
] as const;

export function readServerEnv(env: NodeJS.ProcessEnv = process.env) {
  const missing = requiredServerEnv.filter((key) => !env[key]);

  if (missing.length) {
    throw new Error(`Missing server env: ${missing.join(', ')}`);
  }

  return {
    chainId: Number(env.NEXT_PUBLIC_CHAIN_ID),
    contractAddress: env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseServiceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY!,
    aiApiKey: env.AI_API_KEY!,
  };
}
