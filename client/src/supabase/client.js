import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fsxjoxztpvmocqukpaab.supabase.co";
const supabaseAnonKey = "sb_publishable_S2sn0WED19rXeCaA68gzwA_unifqDXf";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
