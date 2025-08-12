
import { createClient } from '../supabase/utils/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const addPuebloVisited = async (userId: string, puebloId: string) => {
     const supabase = createClient()
  const { error } = await supabase
    .from('visited')
    .insert([{ user_id: userId, pueblo_id: puebloId }]);
  if (error) throw new Error(error.message);
};

const removePuebloVisited = async (userId: string, puebloId: string) => {
  const supabase = createClient()
  const { error } = await supabase
    .from('visited')
    .delete()
    .eq('user_id', userId)
    .eq('pueblo_id', puebloId);
  if (error) throw new Error(error.message);
};


const useUpdateUserVisitedPueblos = (userId: string, puebloId: string) => {
    const queryClient = useQueryClient();
  return useMutation({
     mutationFn: (isVisited:boolean) => {
      // If currently visited, remove it. Otherwise, add it.
      return isVisited ? removePuebloVisited(userId, puebloId) : addPuebloVisited(userId, puebloId);
    },
     onSuccess: () => {
      // Invalidate the 'visited_Pueblos' query to refetch the latest data
     return queryClient.invalidateQueries({ queryKey:["visited_Pueblos", userId, puebloId] });
    },
  });
}
export default useUpdateUserVisitedPueblos
