import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { BASE_URL } from "@/config";
import { LoadingSpinner } from "@/components/Loader";
import { useAppDispatch } from "@/redux/hooks";
import { setAccessToken } from "@/redux/features/storeSlice";

const Login: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    try {
      if (!username || !password) {
        toast({
          description: "Enter username and password",
          variant: "destructive",
        });
        return;
      }
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        password,
      });
      dispatch(setAccessToken(response.data.token));
      toast({
        description: "Login successful",
      });
      navigate("/");
    } catch (err) {
      toast({
        title: "Unable to login",
        description:
          axios.isAxiosError(err) && err?.response?.data
            ? err?.response.data
            : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Store at your fingerprint.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="enter your username (johnd)"
                type="username"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="**** (m38rmF$)"
                type="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Forgot password</Button>
        <Button onClick={handleSubmit} className="w-20">
          {loading ? <LoadingSpinner /> : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
