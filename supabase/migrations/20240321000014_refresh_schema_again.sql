-- Force PostgREST to reload its schema cache
NOTIFY pgrst, 'reload schema';

-- Verify the profiles table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'profiles'; 