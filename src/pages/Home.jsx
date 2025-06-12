import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Newspaper, MessageSquare, Users, Gamepad2, CalendarDays, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
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

  const latestNews = [
    {
      id: 1,
      title: "Actualización 1.22: El Renacer de los Océanos",
      excerpt: "Nuevos biomas marinos, criaturas y tesoros te esperan en las profundidades.",
      image: "Minecraft ocean update with colorful coral reefs and new fish",
      category: "Actualizaciones",
      date: "JUN 10, 2025"
    },
    {
      id: 2,
      title: "Guía Esencial: Domina el Arte del Redstone",
      excerpt: "Conviértete en un maestro de la ingeniería con nuestros consejos y trucos de Redstone.",
      image: "Complex redstone contraption in Minecraft",
      category: "Guías",
      date: "JUN 08, 2025"
    },
    {
      id: 3,
      title: "Construcción del Mes: Castillo Flotante Celestial",
      excerpt: "Maravíllate con la increíble creación de nuestra comunidad este mes.",
      image: "Floating celestial castle build in Minecraft",
      category: "Comunidad",
      date: "JUN 05, 2025"
    }
  ];

  const features = [
    {
      icon: Newspaper,
      title: "Últimas Noticias",
      description: "Mantente al día con las actualizaciones, parches y anuncios oficiales de Minecraft.",
      link: "/noticias"
    },
    {
      icon: MessageSquare,
      title: "Comunidad Activa",
      description: "Únete a nuestro foro, comparte tus creaciones y conoce a otros jugadores apasionados.",
      link: "/foro"
    },
    {
      icon: CalendarDays,
      title: "Eventos Exclusivos",
      description: "Participa en concursos de construcción, torneos PvP y eventos comunitarios.",
      link: "/proximos-eventos"
    },
  ];

  return (
    <div className="min-h-screen text-foreground">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-5rem)] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-40"
            alt="Paisaje de Minecraft con montañas y un río al atardecer"
           src="https://images.unsplash.com/photo-1536507035043-d66e21c6e0e1" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background z-10"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 container mx-auto px-4"
        >
          <h1 className="orbitron-font text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="block">Explora el Mundo de</span>
            <span className="text-gradient-cyan">Minecraft</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Únete a la Comunidad Pixelada. Descubre noticias, guías y eventos exclusivos en notmine.com.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/noticias">
              <Button size="lg" className="modern-button w-full sm:w-auto group">
                Últimas Noticias
                <Newspaper className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/foro">
              <Button variant="outline" size="lg" className="modern-button-outline w-full sm:w-auto group">
                Unirse al Foro
                <Users className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="orbitron-font text-3xl md:text-4xl font-bold mb-4">
              Todo sobre <span className="text-gradient-cyan">Minecraft</span> en un Solo Lugar
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Desde las últimas actualizaciones hasta guías detalladas y una comunidad vibrante.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-background p-8 rounded-lg shadow-xl hover:shadow-primary/20 transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="p-4 bg-primary/10 rounded-full mb-6">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="orbitron-font text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow">{feature.description}</p>
                  <Link to={feature.link}>
                    <Button variant="link" className="text-primary font-semibold group">
                      Descubrir más
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Latest News Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="orbitron-font text-3xl md:text-4xl font-bold mb-4 md:mb-0">
              Noticias <span className="text-gradient-cyan">Recientes</span>
            </h2>
            <Link to="/noticias">
              <Button variant="outline" className="modern-button-outline border-primary/50 text-primary/80 hover:text-primary-foreground hover:bg-primary">
                Ver Todas las Noticias
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map((article, i) => (
              <motion.article
                key={article.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="modern-card bg-card overflow-hidden group"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={article.image}
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                      {article.category}
                    </span>
                    <span className="text-muted-foreground text-xs">{article.date}</span>
                  </div>
                  <h3 className="orbitron-font text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <Link to={`/noticias/${article.id}`}>
                    <Button variant="link" className="text-primary p-0 h-auto font-semibold group/link">
                      Leer más
                      <ArrowRight className="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Join Community */}
      <section className="py-20 relative overflow-hidden">
         <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-20"
            alt="Comunidad de Minecraft construyendo juntos"
           src="https://images.unsplash.com/photo-1697479670670-d2a299df749c" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/90 to-background z-10"></div>
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl mx-auto text-center bg-card/70 backdrop-blur-sm p-10 rounded-xl shadow-2xl">
            <ShieldCheck className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="orbitron-font text-3xl md:text-4xl font-bold text-foreground mb-6">
              Únete a la Élite de <span className="text-gradient-cyan">notmine.com</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Forma parte de una comunidad exclusiva, accede a contenido premium, participa en eventos privados y mucho más. ¡Tu aventura épica comienza aquí!
            </p>
            <Link to="/foro">
              <Button size="lg" className="modern-button group">
                Conviértete en Miembro
                <Gamepad2 className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;