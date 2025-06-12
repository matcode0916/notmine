import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Shield, Bell, Palette, Lock, Sun, Moon, Monitor, Gem, Edit, KeyRound, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


const sidebarNavItems = [
  { id: 'perfil', title: 'Perfil', icon: User },
  { id: 'cuenta', title: 'Cuenta', icon: Shield },
  { id: 'apariencia', title: 'Apariencia', icon: Palette },
  { id: 'notificaciones', title: 'Notificaciones', icon: Bell },
  { id: 'privacidad', title: 'Privacidad', icon: Lock },
];

const Settings = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tab || 'perfil');

  useEffect(() => {
    if (tab && sidebarNavItems.some(item => item.id === tab)) {
      setActiveTab(tab);
    } else {
      navigate('/ajustes/perfil', { replace: true });
    }
  }, [tab, navigate]);

  const renderContent = () => {
    switch (activeTab) {
      case 'perfil': return <ProfileSettings />;
      case 'cuenta': return <AccountSettings />;
      case 'apariencia': return <AppearanceSettings />;
      case 'notificaciones': return <NotificationSettings />;
      case 'privacidad': return <PrivacySettings />;
      default: return <ProfileSettings />;
    }
  };

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="orbitron-font text-4xl md:text-5xl font-bold text-foreground">
            Ajustes del <span className="text-gradient-cyan">Usuario</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-2">Gestiona tu perfil, cuenta y preferencias.</p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-10">
          <aside className="md:w-1/4 lg:w-1/5">
            <nav className="flex flex-row md:flex-col gap-2">
              {sidebarNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    onClick={() => navigate(`/ajustes/${item.id}`)}
                    className="w-full justify-start modern-button"
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    <span className="truncate">{item.title}</span>
                  </Button>
                );
              })}
            </nav>
          </aside>
          
          <main className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {renderContent()}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  const { user, updateUserProfile } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [loading, setLoading] = useState(false);
  
  const lastUpdate = user?.last_username_update ? new Date(user.last_username_update) : null;
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const canUpdateUsername = !lastUpdate || lastUpdate < thirtyDaysAgo;

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updates = { bio };
      if (canUpdateUsername && username !== user.username) {
        updates.username = username;
        updates.last_username_update = new Date().toISOString();
      }
      await updateUserProfile(updates);
      toast({ title: '✅ ¡Perfil actualizado!', description: 'Tus cambios han sido guardados.' });
    } catch (error) {
      toast({ title: '❌ Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil Público</CardTitle>
        <CardDescription>Esta información será visible para otros usuarios.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSave}>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-6">
            <Avatar className="h-24 w-24 border-4 border-primary/50">
              <AvatarImage src={user?.user_metadata?.avatar_url || `https://source.boringavatars.com/beam/120/${user?.id}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`} alt={user?.username} />
              <AvatarFallback>{user?.username?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <Button variant="outline" type="button" onClick={() => toast({ title: "🚧 Función no implementada."})}><Edit className="mr-2 h-4 w-4"/>Cambiar Avatar</Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={!canUpdateUsername || loading} className="modern-input" />
            <p className="text-xs text-muted-foreground">
              {canUpdateUsername ? "Puedes cambiar tu nombre de usuario." : `Puedes cambiar tu nombre de usuario de nuevo en ${Math.ceil((lastUpdate - thirtyDaysAgo) / (1000 * 60 * 60 * 24))} días.`}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Biografía</Label>
            <textarea id="bio" rows="4" className="w-full modern-input" value={bio} onChange={(e) => setBio(e.target.value)} disabled={loading}></textarea>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="modern-button ml-auto" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : 'Guardar Cambios'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};


const AccountSettings = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast({ title: '❌ Error', description: 'Las contraseñas no coinciden.', variant: 'destructive' });
            return;
        }
        if (newPassword.length < 6) {
            toast({ title: '❌ Error', description: 'La contraseña debe tener al menos 6 caracteres.', variant: 'destructive' });
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) throw error;
            toast({ title: '✅ ¡Contraseña actualizada!', description: 'Tu contraseña ha sido cambiada exitosamente.' });
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            toast({ title: '❌ Error', description: error.message, variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cuenta</CardTitle>
                <CardDescription>Gestiona los ajustes de tu cuenta.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="space-y-2">
                    <Label htmlFor="email">Dirección de correo</Label>
                    <Input id="email" type="email" value={user?.email || ''} disabled className="modern-input" />
                </div>
                
                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <h3 className="text-lg font-medium">Cambiar Contraseña</h3>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">Nueva Contraseña</Label>
                        <Input id="new-password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="modern-input" disabled={loading}/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                        <Input id="confirm-password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="modern-input" disabled={loading}/>
                    </div>
                    <Button type="submit" variant="outline" className="w-full" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <><KeyRound className="mr-2 h-4 w-4"/>Actualizar Contraseña</>}
                    </Button>
                </form>

                <div>
                    <Label>Suscripción</Label>
                    <div className={`flex items-center justify-between p-4 rounded-md border mt-2 ${user?.premium_status !== 'free' ? 'border-amber-500 bg-amber-500/10' : 'border-border'}`}>
                        <div className="flex items-center">
                            <Gem className={`h-6 w-6 mr-4 ${user?.premium_status !== 'free' ? 'text-amber-500' : 'text-muted-foreground'}`}/>
                            <div>
                                <p className={`font-semibold ${user?.premium_status !== 'free' ? 'text-amber-400' : ''}`}>{user?.premium_status !== 'free' ? `Plan ${user.premium_status}` : 'Plan Gratuito'}</p>
                                {user?.premium_status !== 'free' && <p className="text-xs text-muted-foreground">Se renueva el 15 de Agosto, 2025.</p>}
                            </div>
                        </div>
                        <Button variant="link" className="text-primary" onClick={() => toast({ title: "🚧 Función no implementada."})}>Gestionar Plan</Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="mr-auto">Eliminar Cuenta</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente tu
                                cuenta y eliminará tus datos de nuestros servidores.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => toast({ title: '🚧 Esta función aún no está disponible.' })}>
                                Continuar
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    );
};

const AppearanceSettings = () => {
  const handleThemeChange = () => {
     toast({
      title: "🚧 ¡Función en desarrollo!",
      description: "El cambio de tema estará disponible muy pronto. ¡Gracias por tu paciencia!",
    });
  }
  return (
  <Card>
    <CardHeader>
      <CardTitle>Apariencia</CardTitle>
      <CardDescription>Personaliza la apariencia de la aplicación.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div>
        <Label>Tema</Label>
        <p className="text-sm text-muted-foreground mb-4">Selecciona el tema de color para la interfaz.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button onClick={handleThemeChange} variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
            <Sun className="h-6 w-6"/>
            <span>Claro</span>
          </Button>
          <Button onClick={handleThemeChange} variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 border-primary ring-2 ring-primary">
            <Moon className="h-6 w-6"/>
            <span>Oscuro</span>
          </Button>
          <Button onClick={handleThemeChange} variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
            <Monitor className="h-6 w-6"/>
            <span>Sistema</span>
          </Button>
        </div>
      </div>
    </CardContent>
     <CardFooter>
      <Button onClick={() => toast({ title: "✅ ¡Ajustes guardados!" })} className="modern-button ml-auto">Guardar Cambios</Button>
    </CardFooter>
  </Card>
)};

const NotificationSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Notificaciones</CardTitle>
      <CardDescription>Elige cómo quieres ser notificado.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="flex items-center justify-between p-4 rounded-md border">
        <div>
          <Label htmlFor="forum-replies">Respuestas del foro</Label>
          <p className="text-sm text-muted-foreground">Recibir notificaciones cuando alguien responda a tus temas o comentarios.</p>
        </div>
        <Switch id="forum-replies" defaultChecked />
      </div>
       <div className="flex items-center justify-between p-4 rounded-md border">
        <div>
          <Label htmlFor="new-events">Nuevos eventos</Label>
          <p className="text-sm text-muted-foreground">Ser notificado sobre próximos torneos y eventos comunitarios.</p>
        </div>
        <Switch id="new-events" defaultChecked />
      </div>
       <div className="flex items-center justify-between p-4 rounded-md border">
        <div>
          <Label htmlFor="newsletter">Noticias y actualizaciones</Label>
          <p className="text-sm text-muted-foreground">Recibir el boletín semanal con las últimas noticias de Minecraft.</p>
        </div>
        <Switch id="newsletter" />
      </div>
    </CardContent>
     <CardFooter>
      <Button onClick={() => toast({ title: "✅ ¡Ajustes guardados!" })} className="modern-button ml-auto">Guardar Cambios</Button>
    </CardFooter>
  </Card>
);

const PrivacySettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Privacidad</CardTitle>
      <CardDescription>Controla tu privacidad en la plataforma.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
       <div className="flex items-center justify-between p-4 rounded-md border">
        <div>
          <Label htmlFor="profile-visibility">Perfil público</Label>
          <p className="text-sm text-muted-foreground">Permitir que otros usuarios vean tu perfil.</p>
        </div>
        <Switch id="profile-visibility" defaultChecked />
      </div>
      <div className="flex items-center justify-between p-4 rounded-md border">
        <div>
          <Label htmlFor="online-status">Mostrar estado en línea</Label>
          <p className="text-sm text-muted-foreground">Permitir que otros vean si estás conectado.</p>
        </div>
        <Switch id="online-status" defaultChecked />
      </div>
      <div className="flex items-center justify-between p-4 rounded-md border">
        <div>
          <Label htmlFor="data-usage">Uso de datos para análisis</Label>
          <p className="text-sm text-muted-foreground">Permitir el uso de tus datos de forma anónima para mejorar el sitio.</p>
        </div>
        <Switch id="data-usage" />
      </div>
    </CardContent>
     <CardFooter>
      <Button onClick={() => toast({ title: "✅ ¡Ajustes guardados!" })} className="modern-button ml-auto">Guardar Cambios</Button>
    </CardFooter>
  </Card>
);

export default Settings;