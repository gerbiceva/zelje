import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabaseTypes";

const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  // global: {
  //   headers: { "x-my-custom-header": "my-app-name" },
  // },
};
export const supabaseClient = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  options
);

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
