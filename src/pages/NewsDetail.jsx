import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, CalendarDays, User, TrendingUp, Share2, MessageSquare, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NewsDetail = () => {
  const { id } = useParams();

  // Simulamos obtener el artículo por ID
  const article = {
    id: parseInt(id),
    title: "Actualización 1.22: El Renacer de los Océanos",
    content: `
      <p class="text-lg mb-6">La nueva actualización "El Renacer de los Océanos" para Minecraft ha llegado, trayendo una ola de contenido fresco y emocionante que transformará tus aventuras acuáticas. Mojang ha puesto un gran énfasis en revitalizar los vastos océanos del juego, añadiendo profundidad, misterio y vida como nunca antes.</p>
      
      <h2 class="orbitron-font text-2xl font-semibold text-primary my-6">Nuevos Biomas Marinos y Estructuras</h2>
      <img  class="w-full h-auto object-cover rounded-lg my-6 shadow-lg" alt="Nuevo bioma de arrecife de coral en Minecraft" src="https://images.unsplash.com/photo-1694064416775-7ccd3235d2db" />
      <p class="mb-4">Prepárate para explorar una variedad de nuevos biomas submarinos, cada uno con su flora, fauna y secretos únicos:</p>
      <ul class="list-disc list-inside space-y-2 mb-6 pl-4">
        <li><strong>Arrecifes de Coral Vibrantes:</strong> Llenos de coloridos corales, peces tropicales y tortugas marinas.</li>
        <li><strong>Bosques de Kelp Gigantes:</strong> Imponentes bosques de algas que se elevan desde el lecho marino, hogar de nuevas criaturas.</li>
        <li><strong>Fosas Abisales Misteriosas:</strong> Zonas profundas y oscuras donde solo los más valientes se atreven a aventurarse, con la posibilidad de encontrar tesoros raros y peligros desconocidos.</li>
        <li><strong>Volcanes Submarinos Activos:</strong> Áreas geotérmicas con géiseres, fumarolas y bloques únicos.</li>
      </ul>
      <p class="mb-6">Además de los biomas, se han añadido nuevas estructuras como ruinas hundidas de antiguas civilizaciones, barcos naufragados con botines valiosos y misteriosas ciudadelas submarinas custodiadas por nuevos guardianes.</p>

      <h2 class="orbitron-font text-2xl font-semibold text-primary my-6">Criaturas Marinas y Mobs</h2>
      <p class="mb-4">Los océanos ahora están más vivos que nunca con la introducción de nuevas criaturas:</p>
      <img  class="w-full h-auto object-cover rounded-lg my-6 shadow-lg" alt="Nuevo mob Kraken en Minecraft" src="https://images.unsplash.com/photo-1576578013745-86563fff88fd" />
      <ul class="list-disc list-inside space-y-2 mb-6 pl-4">
        <li><strong>El Kraken:</strong> Un jefe colosal que acecha en las fosas abisales, un desafío para los jugadores más experimentados.</li>
        <li><strong>Anguilas Eléctricas:</strong> Criaturas que pueden aturdir a sus presas con descargas eléctricas.</li>
        <li><strong>Peces Linterna:</strong> Iluminan las profundidades oscuras y pueden ser recolectados.</li>
        <li><strong>Medusas Bioluminiscentes:</strong> Crean un espectáculo de luces en la noche oceánica.</li>
        <li><strong>Variedades de Delfines y Ballenas:</strong> Añadiendo más realismo y majestuosidad a los mares.</li>
      </ul>
      
      <h2 class="orbitron-font text-2xl font-semibold text-primary my-6">Nuevos Bloques, Items y Mecánicas</h2>
      <p class="mb-4">Esta actualización también introduce una plétora de nuevos bloques y objetos, así como mecánicas de juego mejoradas:</p>
      <ul class="list-disc list-inside space-y-2 mb-6 pl-4">
        <li><strong>Prismarina Oscura y Ladrillos Oceánicos:</strong> Nuevos materiales de construcción con temática acuática.</li>
        <li><strong>Equipamiento de Buceo Mejorado:</strong> Trajes que permiten respirar más tiempo bajo el agua y moverse con mayor agilidad.</li>
        <li><strong>Submarinos Personales:</strong> Un nuevo vehículo para explorar las profundidades de forma segura y eficiente.</li>
        <li><strong>Arqueología Submarina:</strong> Descubre artefactos antiguos y fragmentos de historia en las ruinas hundidas.</li>
        <li><strong>Sistema de Corrientes Oceánicas:</strong> Afectarán la navegación y podrán ser aprovechadas para viajar más rápido.</li>
      </ul>
      
      <h2 class="orbitron-font text-2xl font-semibold text-primary my-6">Impacto y Conclusión</h2>
      <p class="mb-6">"El Renacer de los Océanos" no es solo una actualización estética; redefine por completo la exploración y la vida marina en Minecraft. Con nuevos desafíos, tesoros y misterios por descubrir, los jugadores tendrán incontables horas de nuevo contenido para disfrutar. ¡Es hora de sumergirse y explorar este nuevo mundo acuático!</p>
    `,
    image: "Minecraft ocean update with colorful coral reefs and new fish",
    category: "Actualizaciones",
    readTime: "6 min",
    date: "JUN 10, 2025",
    author: "Equipo Notmine",
    authorAvatar: "notmine.com team avatar logo",
    views: "22.1K",
    likes: 1250,
    comments: 230
  };

  const relatedArticles = [
    { id: 2, title: "Guía Esencial: Domina el Arte del Redstone", image: "Complex redstone contraption in Minecraft", category: "Guías" },
    { id: 3, title: "Construcción del Mes: Castillo Flotante Celestial", image: "Floating celestial castle build in Minecraft", category: "Comunidad" }
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article.title, text: article.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "¡Enlace copiado!", description: "El enlace ha sido copiado al portapapeles." });
    }
  };

  const handleLike = () => {
    toast({ title: "¡Gracias por tu Me Gusta!", description: "Tu reacción ha sido registrada.", variant: "default" });
  };

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link to="/noticias">
            <Button variant="ghost" className="text-primary hover:bg-primary/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Noticias
            </Button>
          </Link>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="mb-8">
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4 inline-block">
              {article.category}
            </span>
            <h1 className="orbitron-font text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-3 mb-3 md:mb-0">
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <img  src={article.authorAvatar} alt={article.author} src="https://images.unsplash.com/photo-1493938121525-4bc68538bf25" />
                  <AvatarFallback>{article.author.substring(0,1)}N</AvatarFallback>
                </Avatar>
                <div>
                  <span className="font-semibold text-foreground">{article.author}</span>
                  <div className="flex items-center space-x-3">
                    <span><CalendarDays className="inline h-4 w-4 mr-1" />{article.date}</span>
                    <span><Clock className="inline h-4 w-4 mr-1" />{article.readTime}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="flex items-center"><TrendingUp className="h-4 w-4 mr-1" />{article.views} vistas</span>
                <span className="flex items-center"><MessageSquare className="h-4 w-4 mr-1" />{article.comments}</span>
              </div>
            </div>
          </header>

          <div className="aspect-video overflow-hidden rounded-xl mb-8 shadow-2xl">
            <img 
              className="w-full h-full object-cover"
              alt={`Imagen principal de ${article.title}`}
             src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
          </div>
          
          <div 
            className="prose prose-lg max-w-none mb-10"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="flex items-center justify-between border-t border-border pt-6">
            <div className="flex items-center space-x-2">
              <Button onClick={handleLike} variant="outline" className="modern-button-outline group">
                <ThumbsUp className="h-5 w-5 mr-2 group-hover:text-primary-foreground transition-colors" /> {article.likes}
              </Button>
              <Button variant="outline" className="modern-button-outline group">
                <MessageSquare className="h-5 w-5 mr-2 group-hover:text-primary-foreground transition-colors" /> Comentar
              </Button>
            </div>
            <Button onClick={handleShare} variant="outline" className="modern-button-outline group">
              <Share2 className="h-5 w-5 mr-2 group-hover:text-primary-foreground transition-colors" /> Compartir
            </Button>
          </div>
        </motion.article>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16"
        >
          <h2 className="orbitron-font text-2xl font-semibold text-foreground mb-8">Artículos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedArticles.map((related) => (
              <Link key={related.id} to={`/noticias/${related.id}`}>
                <div className="modern-card bg-card overflow-hidden group">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={related.image}
                     src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  </div>
                  <div className="p-5">
                    <span className="px-2.5 py-0.5 bg-secondary text-secondary-foreground text-xs font-bold rounded-full mb-2 inline-block">
                      {related.category}
                    </span>
                    <h3 className="orbitron-font text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {related.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default NewsDetail;