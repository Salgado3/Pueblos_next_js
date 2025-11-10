import { createClient } from "../supabase/utils/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const addPuebloAction = async (
  userId: string,
  puebloId: string,
  actionType: string,
) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("user_pueblo_actions")
    .insert([{
      user_id: userId,
      pueblo_id: puebloId,
      action_type: actionType,
    }]);
  if (error) throw new Error(error.message);
};

const removePuebloAction = async (
  userId: string,
  puebloId: string,
  actionType: string,
) => {
  const supabase = createClient();

  const { error } = await supabase
    .from("user_pueblo_actions")
    .delete()
    .eq("user_id", userId)
    .eq("pueblo_id", puebloId)
    .eq("action_type", actionType);
  if (error) throw new Error(error.message);
};

const useUpdateUserPuebloAction = (userId: string, puebloId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      { isActioned, actionType }: { isActioned: boolean; actionType: string },
    ) => {
      // If currently actioned, remove it. Otherwise, add it.
      return isActioned
        ? removePuebloAction(userId, puebloId, actionType)
        : addPuebloAction(userId, puebloId, actionType);
    },
    onSuccess: (_) => {
      // Invalidate the 'pueblo_actions' query to refetch the latest data
      // This is a more effective way to invalidate the cache for multiple actions
      return queryClient.invalidateQueries({
        queryKey: ["user_pueblo_actions", userId],
      });
    },
  });
};

export default useUpdateUserPuebloAction;
