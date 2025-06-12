import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, ArrowRight, TrendingUp, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = ['Todas', 'Actualizaciones', 'Mobs', 'Construcciones', 'Guías', 'Eventos', 'Mods', 'Comunidad'];

  const newsArticles = [
    {
      id: 1,
      title: "Actualización 1.22: El Renacer de los Océanos",
      excerpt: "Nuevos biomas marinos, criaturas y tesoros te esperan en las profundidades con la última gran actualización de Minecraft.",
      image: "Minecraft ocean update with colorful coral reefs and new fish",
      category: "Actualizaciones",
      readTime: "6 min",
      date: "JUN 10, 2025",
      featured: true,
      views: "22.1K"
    },
    {
      id: 2,
      title: "Guía Esencial: Domina el Arte del Redstone",
      excerpt: "Conviértete en un maestro de la ingeniería con nuestros consejos y trucos de Redstone, desde lo básico hasta mecanismos complejos.",
      image: "Complex redstone contraption in Minecraft",
      category: "Guías",
      readTime: "10 min",
      date: "JUN 08, 2025",
      featured: true,
      views: "18.5K"
    },
    {
      id: 3,
      title: "Construcción del Mes: Castillo Flotante Celestial",
      excerpt: "Maravíllate con la increíble creación de nuestra comunidad este mes. Un castillo que desafía la gravedad.",
      image: "Floating celestial castle build in Minecraft",
      category: "Comunidad",
      readTime: "4 min",
      date: "JUN 05, 2025",
      featured: false,
      views: "12.3K"
    },
    {
      id: 4,
      title: "Top 5 Mods Indispensables para Minecraft en 2025",
      excerpt: "Descubre los mods que están revolucionando la forma de jugar Minecraft este año, mejorando gráficos, añadiendo contenido y más.",
      image: "Selection of popular Minecraft mods interface",
      category: "Mods",
      readTime: "7 min",
      date: "JUN 02, 2025",
      featured: false,
      views: "15.9K"
    },
    {
      id: 5,
      title: "Evento Comunitario: El Gran Desafío de Construcción PixelArt",
      excerpt: "Prepara tus bloques y tu creatividad para el evento de PixelArt más grande del año. ¡Premios increíbles esperan!",
      image: "Large pixel art construction in Minecraft event",
      category: "Eventos",
      readTime: "3 min",
      date: "MAY 30, 2025",
      featured: false,
      views: "9.1K"
    },
    {
      id: 6,
      title: "Conociendo al 'Warden': Estrategias para Enfrentar la Oscuridad",
      excerpt: "El Warden es uno de los desafíos más grandes. Aprende sus mecánicas y cómo sobrevivir a un encuentro en las Deep Dark.",
      image: "Minecraft Warden mob in a dark cave",
      category: "Mobs",
      readTime: "8 min",
      date: "MAY 27, 2025",
      featured: false,
      views: "11.8K"
    }
  ];

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="orbitron-font text-4xl md:text-5xl font-bold text-foreground mb-4">
            Archivo de <span className="text-gradient-cyan">Noticias</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora todas las novedades, guías y eventos del universo Minecraft.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-10 p-6 modern-card bg-card/50 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Buscar noticias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 modern-input w-full"
              />
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category 
                      ? 'modern-button' 
                      : 'modern-button-outline border-border text-muted-foreground hover:text-primary-foreground hover:bg-primary'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <TrendingUp className="h-7 w-7 text-primary mr-3" />
              <h2 className="orbitron-font text-2xl md:text-3xl font-semibold text-foreground">Destacadas</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="modern-card overflow-hidden group"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={article.image}
                     src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-lg">
                        DESTACADA
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="px-3 py-1 bg-secondary text-secondary-foreground font-semibold rounded-full">
                        {article.category}
                      </span>
                      <div className="flex items-center space-x-3 text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {article.readTime}
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          {article.views}
                        </div>
                      </div>
                    </div>
                    <h3 className="orbitron-font text-xl font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-muted-foreground text-xs">
                        <CalendarDays className="h-4 w-4 mr-1.5" />
                        {article.date}
                      </div>
                      <Link to={`/noticias/${article.id}`}>
                        <Button variant="link" className="text-primary p-0 h-auto font-semibold group/link">
                          Leer más
                          <ArrowRight className="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        {/* Regular Articles */}
        <section>
          <h2 className="orbitron-font text-2xl md:text-3xl font-semibold text-foreground mb-8">Todas las Noticias</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, index) => (
              <motion.article
                key={article.id}
                custom={index + (featuredArticles.length > 0 ? 2 : 0)} // Adjust delay for staggered animation
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="modern-card overflow-hidden group"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={article.image}
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="px-3 py-1 bg-secondary text-secondary-foreground font-semibold rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center space-x-3 text-muted-foreground">
                       <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {article.views}
                      </div>
                    </div>
                  </div>
                  <h3 className="orbitron-font text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                   <div className="flex items-center justify-between">
                      <div className="flex items-center text-muted-foreground text-xs">
                        <CalendarDays className="h-4 w-4 mr-1.5" />
                        {article.date}
                      </div>
                      <Link to={`/noticias/${article.id}`}>
                        <Button variant="link" className="text-primary p-0 h-auto font-semibold group/link">
                          Leer más
                          <ArrowRight className="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* No results */}
        {filteredArticles.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="modern-card p-10 max-w-md mx-auto">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h3 className="orbitron-font text-2xl font-semibold text-foreground mb-3">No se encontraron noticias</h3>
              <p className="text-muted-foreground">
                Prueba con otros términos de búsqueda o explora nuestras categorías.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default News;