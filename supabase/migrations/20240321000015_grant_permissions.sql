-- Grant necessary permissions to the service role
GRANT ALL ON TABLE profiles TO service_role;
GRANT ALL ON TABLE invites TO service_role;

-- Grant usage on the public schema
GRANT USAGE ON SCHEMA public TO service_role;

-- Grant execute permission on exec_sql function
GRANT EXECUTE ON FUNCTION exec_sql TO service_role; 