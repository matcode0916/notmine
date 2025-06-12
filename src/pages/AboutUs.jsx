import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Eye, Gem, HeartHandshake as Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutUs = () => {
  const teamMembers = [
    { name: 'Alex "PixelLord" Chen', role: 'Fundador y Desarrollador Principal', image: 'Modern avatar of a focused game developer with glasses', bio: 'Apasionado por Minecraft desde la Alpha, Alex creó notmine.com para unir a la comunidad y compartir su amor por el juego.' },
    { name: 'Mia "StoryWeaver" Silva', role: 'Editora de Contenido y Community Manager', image: 'Friendly avatar of a community manager with a headset', bio: 'Mia se encarga de que las noticias sean frescas y el foro un lugar acogedor. ¡Siempre está lista para charlar sobre mods!' },
    { name: 'Sam "BuildMaster" Kim', role: 'Gurú de Construcción y Creador de Guías', image: 'Creative avatar of an architect or builder with tools', bio: 'Si necesitas inspiración para tu próxima mega-construcción, Sam es tu persona. Sus guías detalladas son legendarias.' },
  ];

  const milestones = [
    { year: '2023', event: 'Nacimiento de notmine.com', description: 'Lanzamiento inicial con noticias y un pequeño foro.' },
    { year: '2024', event: 'Crecimiento de la Comunidad', description: 'Superamos los 10,000 usuarios registrados y expandimos las categorías del foro.' },
    { year: '2025', event: 'Introducción de Eventos', description: 'Lanzamos los primeros eventos comunitarios y concursos de construcción.' },
    { year: 'HOY', event: 'Mirando al Futuro', description: 'Continuamos innovando para ser el mejor portal de Minecraft en español.' },
  ];

  return (
    <div className="min-h-screen py-12 bg-background text-foreground">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 pt-8"
        >
          <Gem className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse" />
          <h1 className="orbitron-font text-4xl md:text-6xl font-bold mb-4">
            Acerca de <span className="text-gradient-cyan">notmine.com</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Somos más que un sitio de noticias; somos una comunidad apasionada, un centro de conocimiento y el hogar de innumerables aventuras en Minecraft.
          </p>
        </motion.section>

        {/* Our Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="modern-card bg-card p-8"
          >
            <Target className="h-12 w-12 text-primary mb-4" />
            <h2 className="orbitron-font text-3xl font-semibold mb-3">Nuestra Misión</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ser la principal fuente de información, inspiración y conexión para la comunidad de habla hispana de Minecraft. Queremos potenciar tu creatividad, ayudarte a resolver dudas y celebrar juntos cada bloque colocado.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="modern-card bg-card p-8"
          >
            <Eye className="h-12 w-12 text-primary mb-4" />
            <h2 className="orbitron-font text-3xl font-semibold mb-3">Nuestra Visión</h2>
            <p className="text-muted-foreground leading-relaxed">
              Construir un ecosistema digital donde cada jugador de Minecraft, sin importar su nivel de experiencia, encuentre un espacio para aprender, compartir y crecer. Aspiramos a ser el referente de la cultura Minecraft en español.
            </p>
          </motion.div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="orbitron-font text-3xl md:text-4xl font-bold text-center mb-12">
            Conoce al <span className="text-gradient-cyan">Equipo</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="modern-card bg-card p-6 text-center flex flex-col items-center"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-primary shadow-lg">
                  <img  className="w-full h-full object-cover" alt={member.image} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                </div>
                <h3 className="orbitron-font text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Milestones Timeline */}
        <section className="mb-20">
          <h2 className="orbitron-font text-3xl md:text-4xl font-bold text-center mb-16">
            Nuestra <span className="text-gradient-cyan">Trayectoria</span>
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2 hidden md:block"></div>
            
            {milestones.map((milestone, index) => (
              <motion.div 
                key={milestone.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`mb-12 flex md:items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="hidden md:block w-1/2"></div>
                <div className="hidden md:block relative">
                  <div className="absolute w-4 h-4 bg-primary rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-background shadow-md"></div>
                </div>
                <div className="w-full md:w-1/2 md:pl-8 rtl:md:pr-8">
                  <div className={`modern-card bg-card p-6 ${index % 2 === 0 ? 'md:ml-auto md:text-right' : 'md:mr-auto'}`}>
                    <p className="text-primary orbitron-font text-2xl font-bold mb-1">{milestone.year}</p>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.event}</h3>
                    <p className="text-muted-foreground text-sm">{milestone.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Join Us CTA */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="modern-card bg-gradient-to-r from-primary via-teal-500 to-cyan-600 p-10 rounded-xl text-center shadow-2xl"
        >
          <Handshake className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="orbitron-font text-3xl font-bold text-primary-foreground mb-4">
            Únete a la Familia Notmine
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Ya sea que busques las últimas noticias, guías detalladas, o un lugar para compartir tus creaciones, notmine.com es tu comunidad.
          </p>
          <Link to="/foro">
            <Button size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-2 border-primary-foreground hover:border-primary-foreground/90 modern-button">
              Explorar la Comunidad
            </Button>
          </Link>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutUs;