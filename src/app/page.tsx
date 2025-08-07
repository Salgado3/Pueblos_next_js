import LoginPage from "./login/page";
import { createClient } from "@/lib/supabase/utils/server";
import Page from "./grid/page";

const page = async () => {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData?.user) {
    return <LoginPage />;
  }

  return <Page />;
};

export default page;
