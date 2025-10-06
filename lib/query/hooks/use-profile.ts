import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createSupabaseClient } from '@/lib/supabase/client';

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// Query key factory for user profile
export const profileKeys = {
  all: ['profile'] as const,
  detail: (userId: string) => [...profileKeys.all, userId] as const,
};

/**
 * Fetch user profile from Supabase
 * @param userId - The user ID to fetch profile for
 */
export function useProfile(userId: string | undefined) {
  const supabase = createSupabaseClient();

  return useQuery({
    queryKey: profileKeys.detail(userId || ''),
    queryFn: async () => {
      if (!userId) throw new Error('User ID is required');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data as UserProfile;
    },
    enabled: !!userId, // Only run query if userId exists
  });
}

/**
 * Update user profile
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const supabase = createSupabaseClient();

  return useMutation({
    mutationFn: async (data: Partial<UserProfile> & { id: string }) => {
      const { error, data: updated } = await (supabase as any)
        .from('profiles')
        .update({
          full_name: data.full_name,
          avatar_url: data.avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq('id', data.id)
        .select()
        .single();

      if (error) throw error;
      return updated as UserProfile;
    },
    onSuccess: (data) => {
      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: profileKeys.detail(data.id) });
    },
  });
}
