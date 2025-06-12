import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserProfile(session.user);
      }
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null;
        if(currentUser) {
          await fetchUserProfile(currentUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);
  
  const fetchUserProfile = async (user) => {
    const { data, error } = await supabase
      .from('profiles')
      .select(`username, premium_status, last_username_update`)
      .eq('id', user.id)
      .single();
      
    if (data) {
      setUser(prevUser => ({ ...prevUser, ...data }));
    }
  }

  const createSupabaseNotConfiguredError = () => new Error("La integración con Supabase no está completa. Por favor, conecta tu proyecto de Supabase.");

  const signUp = async (email, password, username) => {
    if (!supabase) throw createSupabaseNotConfiguredError();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
        },
      },
    });
    if (error) throw error;
    return data;
  };

  const signIn = async (email, password) => {
    if (!supabase) throw createSupabaseNotConfiguredError();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };
  
  const signInWithGoogle = async () => {
    if (!supabase) {
      toast({
          title: "¡Integración de Supabase requerida!",
          description: "Por favor, conecta tu proyecto de Supabase para activar el inicio de sesión con Google.",
          variant: "destructive",
          duration: 8000
      });
      return;
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
     if (error) {
      toast({
        title: "Error de inicio de sesión",
        description: error.message,
        variant: "destructive",
      });
    }
    return data;
  };

  const signOut = async () => {
    if (!supabase) throw createSupabaseNotConfiguredError();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  const updateUserProfile = async (updates) => {
    if (!supabase || !user) throw new Error("User not authenticated or Supabase not configured");
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    
    setUser(prevUser => ({ ...prevUser, ...data }));
    return data;
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};