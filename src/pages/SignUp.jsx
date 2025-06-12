import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Loader2, KeyRound, AtSign, User, PlusCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

     if (!supabase) {
      toast({
        title: "¡Integración de Supabase requerida!",
        description: "Por favor, conecta tu proyecto de Supabase para activar el registro. Te he dejado las instrucciones en el chat.",
        variant: "destructive",
        duration: 8000
      });
      setLoading(false);
      return;
    }

    try {
      await signUp(email, password, username);
      toast({
        title: '¡Registro exitoso!',
        description: 'Hemos enviado un enlace de confirmación a tu correo electrónico.',
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Error de registro',
        description: error.message || 'No se pudo crear la cuenta.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!supabase) {
      toast({
        title: "¡Integración de Supabase requerida!",
        description: "Por favor, conecta tu proyecto de Supabase para activar el registro con Google.",
        variant: "destructive",
        duration: 8000
      });
      return;
    }
    await signInWithGoogle();
    navigate('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md mx-auto modern-card">
          <CardHeader className="text-center">
             <div className="mx-auto w-fit mb-4">
              <PlusCircle className="h-12 w-12 text-primary"/>
            </div>
            <CardTitle className="orbitron-font text-3xl">Crear una Cuenta</CardTitle>
            <CardDescription>Únete a la comunidad de notmine.com</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Nombre de usuario</Label>
                 <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="username" type="text" placeholder="TuNick" value={username} onChange={(e) => setUsername(e.target.value)} required className="pl-10 modern-input" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="pl-10 modern-input" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="password" type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} required className="pl-10 modern-input" />
                </div>
              </div>
              <Button type="submit" className="w-full modern-button" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Registrarse'}
              </Button>
            </form>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">O regístrate con</span>
              </div>
            </div>
             <Button variant="outline" className="w-full modern-button-outline" onClick={handleGoogleLogin}>
              <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4"><path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.08-2.58 2-5.07 2-4.64 0-8.5-3.82-8.5-8.5s3.86-8.5 8.5-8.5c2.66 0 4.31 1.08 5.24 2.05l2.72-2.72C18.69 1.24 15.47 0 12.48 0 5.88 0 .02 5.88.02 12.5s5.86 12.5 12.46 12.5c7.05 0 12.22-4.92 12.22-12.37 0-.8-.08-1.57-.2-2.31z"></path></svg>
              Google
            </Button>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Inicia sesión
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUp;