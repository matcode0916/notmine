
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Plus, MessageSquare, Users, TrendingUp, Clock, Pin, Lock, Eye, Tag, Filter, User as UserIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import NewTopicDialog from '@/components/NewTopicDialog';

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      setLoading(true);
      
      const fetchCategories = supabase.from('forum_categories').select('id, name, icon, description');
      const fetchTopics = supabase.from('forum_topics').select(`
        id, title, created_at, is_pinned, is_locked,
        profiles ( id, username, avatar_url, premium_status ),
        forum_categories ( id, name ),
        forum_replies ( id )
      `).order('is_pinned', { ascending: false }).order('created_at', { ascending: false });

      const [categoriesRes, topicsRes] = await Promise.all([fetchCategories, fetchTopics]);
      
      if (categoriesRes.data) setCategories(categoriesRes.data.map(c => ({ ...c, icon: TrendingUp }))); 
      if (topicsRes.data) setTopics(topicsRes.data);

      setLoading(false);
    };

    fetchData();
  }, []);
  
  const handleNewTopicSuccess = (newTopic) => {
    setTopics(prevTopics => [newTopic, ...prevTopics]);
  };

  const filteredTopics = topics.filter(topic => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = topic.title.toLowerCase().includes(searchLower) ||
                         topic.profiles.username.toLowerCase().includes(searchLower);
    const matchesCategory = selectedCategory === 'Todas' || topic.forum_categories.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.07, duration: 0.4, ease: "easeOut" }
    })
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!supabase) {
     return (
       <div className="text-center py-16">
          <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h3 className="orbitron-font text-2xl font-semibold text-foreground mb-3">Foro no disponible</h3>
          <p className="text-muted-foreground mb-6">
            La integración con Supabase es necesaria para ver el foro. Por favor, conecta tu proyecto.
          </p>
        </div>
     );
  }

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="orbitron-font text-4xl md:text-5xl font-bold text-foreground mb-4">
            Foros de la <span className="text-gradient-cyan">Comunidad</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Conéctate, discute y comparte con miles de jugadores apasionados por Minecraft.
          </p>
          <NewTopicDialog categories={categories} onSuccess={handleNewTopicSuccess}>
            <Button size="lg" className="modern-button group" disabled={!user}>
              <Plus className="mr-2 h-5 w-5" />
              Crear Nuevo Tema
            </Button>
          </NewTopicDialog>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 lg:sticky lg:top-28"
          >
            <div className="modern-card p-6 bg-card">
              <h2 className="orbitron-font text-xl font-semibold text-foreground mb-6 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-primary"/>
                Categorías
              </h2>
              <div className="space-y-2">
                 <button
                    onClick={() => setSelectedCategory('Todas')}
                    className={`w-full flex items-center justify-between p-3 rounded-md transition-all duration-200 text-sm font-medium group ${
                      selectedCategory === 'Todas'
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <MessageSquare className={`h-4 w-4 ${selectedCategory === 'Todas' ? 'text-primary-foreground' : 'text-primary group-hover:text-primary'}`} />
                      <span>Todas</span>
                    </div>
                  </button>
                {categories.map((category) => {
                  const Icon = category.icon || MessageSquare;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full flex items-center justify-between p-3 rounded-md transition-all duration-200 text-sm font-medium group ${
                        selectedCategory === category.name
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className={`h-4 w-4 ${selectedCategory === category.name ? 'text-primary-foreground' : 'text-primary group-hover:text-primary'}`} />
                        <span>{category.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 modern-card p-4 bg-card/50 backdrop-blur-sm"
            >
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Buscar temas, etiquetas o autores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 modern-input w-full"
                />
              </div>
            </motion.div>

            <div className="space-y-4">
              {filteredTopics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="modern-card bg-card hover:border-primary/50 transition-colors duration-200"
                >
                  <Link to={`/foro/${topic.id}`} className="block p-5 sm:p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12 border-2 border-secondary flex-shrink-0">
                        <img  alt={`Avatar de ${topic.profiles.username}`} src="https://images.unsplash.com/photo-1616698050140-65f3194e7b71" />
                        <AvatarFallback>{topic.profiles.username.substring(0,1).toUpperCase()}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1.5">
                          <h3 className="orbitron-font text-lg font-semibold text-foreground mb-1 sm:mb-0 line-clamp-1 group-hover:text-primary transition-colors">
                            {topic.title}
                          </h3>
                          <span className="px-2.5 py-0.5 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full self-start sm:self-center">
                            {topic.forum_categories.name}
                          </span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1 mb-2 sm:mb-0">
                            <UserIcon className="h-3.5 w-3.5" /> 
                            <span className="font-medium text-primary/90">{topic.profiles.username}</span>
                            <Clock className="h-3.5 w-3.5 ml-2" />
                            <span>hace {formatDistanceToNow(new Date(topic.created_at), { locale: es })}</span>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            {topic.is_pinned && <Pin className="h-4 w-4 text-primary" title="Fijado" />}
                            {topic.is_locked && <Lock className="h-4 w-4 text-destructive" title="Bloqueado" />}
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-3.5 w-3.5" />
                              <span>{topic.forum_replies.length}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {filteredTopics.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="modern-card p-10 max-w-md mx-auto bg-card">
                  <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                  <h3 className="orbitron-font text-2xl font-semibold text-foreground mb-3">No se encontraron temas</h3>
                  <p className="text-muted-foreground mb-6">
                    Intenta con otros términos de búsqueda o crea el primer tema.
                  </p>
                   <NewTopicDialog categories={categories} onSuccess={handleNewTopicSuccess}>
                    <Button className="modern-button group" disabled={!user}>
                      <Plus className="mr-2 h-4 w-4" />
                      Crear Nuevo Tema
                    </Button>
                  </NewTopicDialog>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
