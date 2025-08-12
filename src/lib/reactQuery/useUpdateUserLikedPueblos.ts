import { createClient } from '../supabase/utils/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const addPuebloLike = async (userId: string, puebloId: string) => {
     const supabase = createClient()
  const { error } = await supabase
    .from('liked')
    .insert([{ user_id: userId, pueblo_id: puebloId }]);
  if (error) throw new Error(error.message);
};

const removePuebloLike = async (userId: string, puebloId: string) => {
  const supabase = createClient()
  const { error } = await supabase
    .from('liked')
    .delete()
    .eq('user_id', userId)
    .eq('pueblo_id', puebloId);
  if (error) throw new Error(error.message);
};


const useUpdateUserLikedPueblos = (userId: string, puebloId: string) => {
    const queryClient = useQueryClient();
  return useMutation({
     mutationFn: (isLiked:boolean) => {
      // If currently liked, remove it. Otherwise, add it.
      return isLiked ? removePuebloLike(userId, puebloId) : addPuebloLike(userId, puebloId);
    },
     onSuccess: () => {
      // Invalidate the 'liked_Pueblos' query to refetch the latest data
     return queryClient.invalidateQueries({ queryKey:["liked_Pueblos", userId, puebloId] });
    },
  });
}

export default useUpdateUserLikedPueblos
