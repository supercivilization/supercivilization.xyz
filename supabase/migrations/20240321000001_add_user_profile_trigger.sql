-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create user profile
  INSERT INTO user_profiles (user_id)
  VALUES (NEW.id);

  -- Create user settings
  INSERT INTO user_settings (user_id)
  VALUES (NEW.id);

  -- Create initial user activity record
  INSERT INTO user_activity (user_id, active_days)
  VALUES (NEW.id, 0);

  -- Create initial reputation record
  INSERT INTO reputation (user_id, score)
  VALUES (NEW.id, 0);

  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user(); 