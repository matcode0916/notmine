import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Search, ChevronDown, Home as HomeIcon, Newspaper, MessageSquare, Info, CalendarDays, Gem, User as UserIcon, Settings, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { path: '/', label: 'Inicio', icon: HomeIcon },
    { path: '/noticias', label: 'Noticias', icon: Newspaper },
    { path: '/foro', label: 'Foro', icon: MessageSquare },
    { path: '/proximos-eventos', label: 'Eventos', icon: CalendarDays },
  ];

  const moreNavItems = [
    { path: '/guias', label: 'Guías', icon: Info },
    { path: '/comunidad', label: 'Comunidad', icon: MessageSquare },
    { path: '/acerca-de-nosotros', label: 'Acerca de', icon: Info },
  ];

  const premiumNavItem = { path: '/planes-premium', label: 'Premium', icon: Gem };

  const isActive = (path) => location.pathname.startsWith(path) && path !== '/';

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "¡Hasta pronto!",
        description: "Has cerrado sesión correctamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 25H35V40H20V25Z" fill="hsl(var(--primary))"/>
                <path d="M42.5 25H57.5V40H42.5V25Z" fill="hsl(var(--primary))"/>
                <path d="M65 25H80V40H65V25Z" fill="hsl(var(--primary))"/>
                <path d="M30 47.5H45V62.5H30V47.5Z" fill="hsl(var(--primary))"/>
                <path d="M52.5 47.5H67.5V62.5H52.5V47.5Z" fill="hsl(var(--primary))"/>
              </svg>
              <span className="orbitron-font text-2xl font-bold text-foreground ml-2">notmine.com</span>
            </motion.div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const active = item.path === '/' ? location.pathname === '/' : isActive(item.path);
              return (
                <Link key={item.path} to={item.path}>
                  <Button variant="ghost" className={`text-sm font-medium px-3 py-2 ${active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                    {item.label}
                  </Button>
                </Link>
              );
            })}
             <Link to={premiumNavItem.path}>
                <Button variant="ghost" className={`text-sm font-medium px-3 py-2 flex items-center ${isActive(premiumNavItem.path) ? 'text-amber-400' : 'text-muted-foreground hover:text-amber-400'}`}>
                  <Gem className="mr-1 h-4 w-4 text-amber-400" />
                  {premiumNavItem.label}
                </Button>
              </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium px-3 py-2 text-muted-foreground hover:text-foreground">
                  Más <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border text-foreground w-48">
                {moreNavItems.map(item => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className={`flex items-center w-full ${isActive(item.path) ? 'text-primary' : ''}`}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={user.user_metadata?.avatar_url || `https://source.boringavatars.com/beam/120/${user.id}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`} alt={user.user_metadata?.username || 'Avatar'} />
                      <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-card border-border text-foreground mr-4" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.user_metadata?.username || user.email}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link to="/ajustes/perfil"><DropdownMenuItem><UserIcon className="mr-2 h-4 w-4" /><span>Perfil</span></DropdownMenuItem></Link>
                    <Link to="/ajustes"><DropdownMenuItem><Settings className="mr-2 h-4 w-4" /><span>Ajustes</span></DropdownMenuItem></Link>
                    <Link to="/planes-premium"><DropdownMenuItem><Gem className="mr-2 h-4 w-4 text-amber-400" /><span>Premium</span></DropdownMenuItem></Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" /><span>Cerrar sesión</span></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className='hidden lg:flex items-center space-x-2'>
                <Link to="/login"><Button variant="ghost">Iniciar Sesión</Button></Link>
                <Link to="/signup"><Button className='modern-button'>Registrarse</Button></Link>
              </div>
            )}

            <Button variant="ghost" size="icon" className="lg:hidden text-muted-foreground hover:text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isSearchOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="py-2">
            <Input type="search" placeholder="Buscar..." className="w-full modern-input" />
          </motion.div>
        )}
        
        {isMenuOpen && (
          <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-1">
              {[...navItems, premiumNavItem, ...moreNavItems].map((item) => {
                const Icon = item.icon;
                const active = item.path === '/' ? location.pathname === '/' : isActive(item.path);
                return (
                  <Link key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className={`w-full justify-start flex items-center space-x-3 py-3 ${active ? (item.path === '/planes-premium' ? 'text-amber-400 bg-amber-400/10' : 'text-primary bg-primary/10') : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'}`}>
                      <Icon className={`h-5 w-5 ${item.path === '/planes-premium' ? 'text-amber-400' : ''}`} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
              <DropdownMenuSeparator />
              {!user ? (
                 <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}><Button variant='ghost' className="w-full justify-start"><LogIn className="mr-2 h-4 w-4"/>Iniciar Sesión</Button></Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}><Button variant='default' className="w-full justify-start"><UserIcon className="mr-2 h-4 w-4"/>Registrarse</Button></Link>
                 </>
              ) : (
                <Button onClick={() => { handleLogout(); setIsMenuOpen(false); }} variant='ghost' className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-500/10">
                  <LogOut className="mr-2 h-4 w-4"/>
                  Cerrar Sesión
                </Button>
              )}
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
};

export default Header;