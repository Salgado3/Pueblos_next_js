
import { createClient } from '../supabase/utils/client';
import { useQuery } from '@tanstack/react-query';

const supabase = createClient();

const fetchUserActions = async (userId:string) => {
  if (!userId) {
    return null;
  }
  
  const { data, error } = await supabase
    .from('user_pueblo_actions')
    .select('pueblo_id, action_type')
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

 const useFetchUserActions = (userId:string)=> {
  return useQuery({
    queryKey: ['user_pueblo_actions', userId],
    queryFn: () => fetchUserActions(userId),
    enabled: !!userId, // The query will only run if a userId is provided
  });
};


export default useFetchUserActions
