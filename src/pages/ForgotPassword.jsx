import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Loader2, MailQuestion, AtSign } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!supabase) {
      toast({
        title: "¡Integración de Supabase requerida!",
        description: "Por favor, conecta tu proyecto de Supabase para activar esta función.",
        variant: "destructive",
        duration: 8000
      });
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
      if (error) throw error;
      toast({
        title: 'Correo enviado',
        description: 'Si tu correo está registrado, recibirás un enlace para restablecer tu contraseña.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'No se pudo enviar el correo de restablecimiento.',
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
              <MailQuestion className="h-12 w-12 text-primary"/>
            </div>
            <CardTitle className="orbitron-font text-3xl">¿Olvidaste tu Contraseña?</CardTitle>
            <CardDescription>Ingresa tu correo y te enviaremos un enlace para restablecerla.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordReset} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="pl-10 modern-input" />
                </div>
              </div>
              <Button type="submit" className="w-full modern-button" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Enviar Enlace'}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              ¿Recordaste tu contraseña?{' '}
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

export default ForgotPassword;