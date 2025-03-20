-- Create exec_sql function
CREATE OR REPLACE FUNCTION public.exec_sql(sql text, params text[] DEFAULT NULL)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  IF params IS NULL THEN
    EXECUTE sql INTO result;
  ELSE
    EXECUTE sql USING params INTO result;
  END IF;
  RETURN result;
END;
$$;

-- Grant execute permission to service role
GRANT EXECUTE ON FUNCTION public.exec_sql TO service_role; 