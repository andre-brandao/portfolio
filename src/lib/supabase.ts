import { createClient } from '@supabase/supabase-js';
// import {SUPABASE_URL, SUPABASE_ANON_KEY} from '$env/static/public'; 

// export const supabase = createClient(
//   SUPABASE_URL,
//   SUPABASE_ANON_KEY,
//   );
export const supabase = createClient(
  'https://rmqarcuvidiggtnzobgn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtcWFyY3V2aWRpZ2d0bnpvYmduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc2ODI2NjAsImV4cCI6MjAxMzI1ODY2MH0.XXteHQbyeFW-O8OUsbTlrWzdjsb81kFrmrPDuxCmNBk',
  );
