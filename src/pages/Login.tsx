
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Validation Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, any login succeeds
      toast({
        title: "Login Successful",
        description: "Welcome back to FixInfra",
      });
      
      navigate('/');
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen w-full flex flex-col sm:flex-row">
      {/* Left side - Illustration/image */}
      <div className="sm:w-1/2 bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center p-8 sm:p-12">
        <div className="max-w-md text-white">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary font-bold text-xl mr-3">
              FI
            </div>
            <h1 className="text-2xl font-bold">FixInfra</h1>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Making our communities better, together.
          </h2>
          
          <p className="text-white/80 mb-8 leading-relaxed">
            Join thousands of citizens working with local government to improve infrastructure and address community needs.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-1">Report Issues</h3>
              <p className="text-white/70 text-sm">Document and report infrastructure problems in your area</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-1">Track Progress</h3>
              <p className="text-white/70 text-sm">Follow the status of repairs and government responses</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-1">Community Forum</h3>
              <p className="text-white/70 text-sm">Connect with neighbors on local infrastructure concerns</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-1">Government Partnership</h3>
              <p className="text-white/70 text-sm">Direct collaboration with local officials</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Login form */}
      <div className="sm:w-1/2 flex items-center justify-center p-6 sm:p-12 animate-fade-in">
        <Card className="w-full max-w-md shadow-lg border-0 neo-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-focus h-11"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-focus h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff size={16} className="text-muted-foreground" />
                    ) : (
                      <Eye size={16} className="text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-11 button-hover"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={16} className="mr-2" />
                    Sign in
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full">
              <Button variant="outline" className="button-hover">
                Google
              </Button>
              <Button variant="outline" className="button-hover">
                Microsoft
              </Button>
            </div>
            
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
