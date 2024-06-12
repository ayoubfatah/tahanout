import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://jmvbwhvpdounmufynkwd.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptdmJ3aHZwZG91bm11Znlua3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc5NTU1NjcsImV4cCI6MjAzMzUzMTU2N30.oLUTO8I6h05rN2FOQPP-qQP1t_HXWwzdW6STeBUhUaA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
