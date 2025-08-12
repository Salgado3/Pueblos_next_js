import { useQuery } from '@tanstack/react-query';
import { createClient } from '../supabase/utils/client';


const useUserVisitedPueblos = (userId:string,puebloId?:string) => {
    
   return useQuery({
     queryKey: ["visited_Pueblos",userId,puebloId],
     queryFn: async () => {
      if (!userId ) return false;
      const supabase = createClient()
      if(puebloId) {
         const { data, error } = await supabase
        .from('visited')
        .select('id, pueblo_id')
        .eq('user_id', userId)
        .eq('pueblo_id', puebloId).limit(1)

        if (error) throw new Error(error.message);

       return data.length > 0;
      }else{
 const { data, error } = await supabase
        .from('visited')
        .select('id, pueblo_id')
        .eq('user_id', userId)

        if (error) throw new Error(error.message);

      return data
      }
    },
     enabled: !!userId,
   });
}

export default useUserVisitedPueblos
