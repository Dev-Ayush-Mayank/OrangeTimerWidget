import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { toast } from "sonner";
import { Sidebar } from "@/components/SideBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Settings = () => {

  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


   // Update Display Name (in user_metadata)
const saveUserName = async () => {
  const { error } = await supabase.auth.updateUser({
    data: { full_name: fullName },
  });

  if (error) toast.error(error.message);
  else toast.success("Profile updated!");
};

// ✅ Unified update for both Email and Password
  const saveUserAccount = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password to update.");
      return;
    }

    // 1️⃣ Update email first
    const { error: emailError } = await supabase.auth.updateUser({ email });
    if (emailError) {
      toast.error(emailError.message);
      return;
    }

    // 2️⃣ Then update password
    const { error: passError } = await supabase.auth.updateUser({ password });
    if (passError) {
      toast.error(passError.message);
      return;
    }

    toast.success("Email and password updated successfully! Check your inbox for verification.");
    setPassword("");
  };

    // Fetch current user info
useEffect(() => {
  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setFullName(user.user_metadata?.full_name || "");
      setEmail(user.email || "");
    }
  };
  fetchUser();
}, []);

  return (
    <div className='flex bg-gray-50'>
      {/* First grid - 20% width */}
      <div className='fixed left-0 top-0 w-[20%]'>
        <Card className='h-full p-6 border-none bg-gray-50 rounded-none'>
          <Sidebar />
        </Card>
      </div>

      {/* Second grid - 80% width */}
      <div className='h-screen ml-[20%] w-[80%] overflow-y-auto bg-white'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-6'>
          <Card className='h-full p-2 border-none rounded-none outline-none shadow-none'>
            <h2 className='text-lg font-semibold mb-4'>Settings</h2>
            <p className='text-muted-foreground'>
              Manage your profile, account details and current subscriptions
            </p>
            <Tabs defaultValue='profile' className='w-full mt-6'>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value='profile'>Profile</TabsTrigger>
                <TabsTrigger value='account'>Account</TabsTrigger>
                <TabsTrigger value='plans'>Plans</TabsTrigger>
              </TabsList>
              <TabsContent value='profile'>
                <Card>
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>
                      Make changes to your profile here. Click save when
                      you&apos;re done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='grid gap-6'>
                    <div className='grid gap-3'>
                      <Label htmlFor='tabs-demo-name'>Full name</Label>
                      <Input id='tabs-demo-name' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-blue-700 rounded-full hover:bg-blue-800" onClick={saveUserName}>Save changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value='account'>
               <Card>
                  <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>
                      Make changes to your account here. Click save when
                      you&apos;re done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='grid gap-6'>
                    <div className='grid gap-3'>
                      <Label htmlFor='tabs-demo-name'>Login Email</Label>
                      <Input id='tabs-demo-name' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='grid gap-3'>
                      <Label htmlFor='tabs-demo-name'>Password</Label>
                      <Input id='tabs-demo-name' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-blue-700 rounded-full hover:bg-blue-800" onClick={saveUserAccount}>Save changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value='plans'>
                Manage your subscription plans here.
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};
