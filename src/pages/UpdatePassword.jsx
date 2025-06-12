import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Loader2, KeyRound, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!supabase) {
      if (hasMounted) {
        toast({
          title: "¡Integración de Supabase requerida!",
          description: "Conecta tu proyecto de Supabase para actualizar la contraseña.",
          variant: "destructive",
          duration: 8000
        });
        navigate('/login');
      }
      return;
    }
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        // Here you can do something when the user is recovering the password.
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, hasMounted]);


  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast({
        title: '¡Contraseña actualizada!',
        description: 'Tu contraseña ha sido cambiada. Ya puedes iniciar sesión.',
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'No se pudo actualizar la contraseña.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

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
              <ShieldCheck className="h-12 w-12 text-primary"/>
            </div>
            <CardTitle className="orbitron-font text-3xl">Crea una Nueva Contraseña</CardTitle>
            <CardDescription>Ingresa una nueva contraseña segura para tu cuenta.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdatePassword} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password">Nueva Contraseña</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="password" type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} required className="pl-10 modern-input" />
                </div>
              </div>
              <Button type="submit" className="w-full modern-button" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Actualizar Contraseña'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UpdatePassword;