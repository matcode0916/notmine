import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, MapPin, Users, Clock, ArrowRight, Tag, Search, Filter as FilterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Events = () => {
  const [filter, setFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const eventCategories = ['Todos', 'Torneos', 'Construcción', 'Comunidad', 'Talleres', 'Especiales'];

  const eventsData = [
    {
      id: 1,
      title: 'Gran Torneo de Constructores: Edición Medieval',
      date: '15 JUL, 2025 - 10:00 AM',
      location: 'Servidor Eventos A',
      type: 'Construcción',
      excerpt: 'Demuestra tus habilidades de construcción medieval y compite por premios épicos. ¡Temática libre dentro del medievo!',
      attendees: 128,
      duration: '3 días',
      image: 'Epic medieval castle build in Minecraft for a competition',
      tags: ['medieval', 'construcción', 'competitivo', 'premios']
    },
    {
      id: 2,
      title: 'Noche de Minijuegos Comunitarios',
      date: '22 JUL, 2025 - 7:00 PM',
      location: 'Servidor Comunidad B',
      type: 'Comunidad',
      excerpt: '¡Únete a una noche llena de diversión con una variedad de minijuegos! SkyWars, BedWars, Parkour y más.',
      attendees: 75,
      duration: '3 horas',
      image: 'Minecraft players participating in various minigames',
      tags: ['minijuegos', 'diversión', 'skywars', 'bedwars']
    },
    {
      id: 3,
      title: 'Taller de Redstone Avanzado: Automatización Total',
      date: '29 JUL, 2025 - 2:00 PM',
      location: 'Discord - Sala Talleres',
      type: 'Talleres',
      excerpt: 'Aprende los secretos de la automatización con Redstone. Desde granjas automáticas hasta sistemas complejos.',
      attendees: 45,
      duration: '2 horas',
      image: 'Complex redstone contraption for automation workshop',
      tags: ['redstone', 'taller', 'educativo', 'automatización']
    },
    {
      id: 4,
      title: 'Evento Especial: Búsqueda del Tesoro Interdimensional',
      date: '05 AGO, 2025 - Todo el día',
      location: 'Múltiples Servidores',
      type: 'Especiales',
      excerpt: 'Una épica búsqueda del tesoro a través de diferentes dimensiones. ¡Pistas, acertijos y grandes recompensas!',
      attendees: 'Ilimitado',
      duration: '24 horas',
      image: 'Minecraft players exploring different dimensions for a treasure hunt',
      tags: ['búsqueda del tesoro', 'aventura', 'multi-servidor', 'evento especial']
    },
  ];

  const filteredEvents = eventsData.filter(event => {
    const matchesFilter = filter === 'Todos' || event.type === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (event.tags && event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesFilter && matchesSearch;
  });

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
    <div className="min-h-screen py-12 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <motion.section 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 pt-8"
        >
          <CalendarDays className="h-16 w-16 text-primary mx-auto mb-6 float-animation" />
          <h1 className="orbitron-font text-4xl md:text-6xl font-bold mb-4">
            Próximos <span className="text-gradient-cyan">Eventos</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            No te pierdas nuestros emocionantes eventos comunitarios, torneos y talleres. ¡Siempre hay algo sucediendo en notmine.com!
          </p>
        </motion.section>

        {/* Filters and Search */}
        <div className="mb-10 p-6 modern-card bg-card/50 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Buscar eventos, etiquetas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 modern-input w-full"
              />
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
              <FilterIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              {eventCategories.map((category) => (
                <Button
                  key={category}
                  variant={filter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(category)}
                  className={`whitespace-nowrap transition-all duration-200 ${
                    filter === category 
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

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="modern-card bg-card overflow-hidden group flex flex-col"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={event.image}
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-3">
                    <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold">{event.type}</Badge>
                  </div>
                  <h3 className="orbitron-font text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <div className="text-sm text-muted-foreground space-y-1.5 mb-3">
                    <p className="flex items-center"><CalendarDays className="h-4 w-4 mr-2 text-primary/80" /> {event.date}</p>
                    <p className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-primary/80" /> {event.location}</p>
                    <p className="flex items-center"><Clock className="h-4 w-4 mr-2 text-primary/80" /> Duración: {event.duration}</p>
                    <p className="flex items-center"><Users className="h-4 w-4 mr-2 text-primary/80" /> {event.attendees} asistentes</p>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
                    {event.excerpt}
                  </p>
                  {event.tags && event.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {event.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs border-border text-muted-foreground">#{tag}</Badge>
                      ))}
                    </div>
                  )}
                  <Button className="modern-button w-full mt-auto group/btn">
                    Más Información <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="modern-card p-10 max-w-md mx-auto bg-card">
              <CalendarDays className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h3 className="orbitron-font text-2xl font-semibold text-foreground mb-3">No hay eventos que coincidan</h3>
              <p className="text-muted-foreground">
                Intenta ajustar tus filtros o revisa más tarde. ¡Siempre estamos planeando algo nuevo!
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Events;