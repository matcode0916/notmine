import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, Gem, Zap, ShieldCheck, MessageSquare, Newspaper, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

const PremiumPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'crafter',
      name: 'Crafter Pixel',
      priceMonthly: '4.99',
      priceYearly: '49.99',
      icon: Star,
      color: 'bg-blue-500',
      textColor: 'text-blue-400',
      borderColor: 'border-blue-500',
      features: [
        { text: 'Acceso a artículos premium', icon: Newspaper },
        { text: 'Emblema "Crafter Pixel" en el foro', icon: MessageSquare },
        { text: 'Participación anticipada en eventos', icon: CalendarDays },
        { text: 'Sin anuncios', icon: ShieldCheck },
      ],
      description: 'Ideal para el jugador casual que busca un extra.'
    },
    {
      id: 'explorer',
      name: 'Explorador Épico',
      priceMonthly: '9.99',
      priceYearly: '99.99',
      icon: Zap,
      color: 'bg-purple-500',
      textColor: 'text-purple-400',
      borderColor: 'border-purple-500',
      features: [
        { text: 'Todos los beneficios de Crafter Pixel', icon: CheckCircle },
        { text: 'Acceso a guías de construcción exclusivas', icon: Newspaper },
        { text: 'Emblema "Explorador Épico" brillante', icon: MessageSquare },
        { text: 'Descuentos en merchandising (próximamente)', icon: ShieldCheck },
        { text: 'Soporte prioritario', icon: Zap },
      ],
      description: 'Para el aventurero dedicado que quiere más.',
      popular: true,
    },
    {
      id: 'legend',
      name: 'Leyenda del Bloque',
      priceMonthly: '19.99',
      priceYearly: '199.99',
      icon: Gem,
      color: 'bg-amber-500',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500',
      features: [
        { text: 'Todos los beneficios de Explorador Épico', icon: CheckCircle },
        { text: 'Acceso a servidor VIP de Discord', icon: MessageSquare },
        { text: 'Emblema animado "Leyenda del Bloque"', icon: Gem },
        { text: 'Consultas directas con el equipo (limitado)', icon: Zap },
        { text: 'Contenido descargable exclusivo', icon: ShieldCheck },
      ],
      description: 'La experiencia definitiva para el verdadero maestro de Minecraft.'
    },
  ];

  const handleSelectPlan = (planId, priceId) => {
    setSelectedPlan(planId);
    // Aquí es donde llamarías a Stripe Checkout
    // Por ahora, mostraremos un toast
    toast({
      title: "Preparando Checkout...",
      description: `Has seleccionado el plan ${planId}. Price ID: ${priceId}. La integración con Stripe está pendiente.`,
    });
    // Aquí llamarías a la función para iniciar Stripe Checkout
    // Por ejemplo: redirectToCheckout(priceId);
    // Esta función necesitará tu clave publicable de Stripe.
    // Te guiaré para obtener esta clave y el Price ID una vez que decidas integrar Stripe.
    console.log(`Plan seleccionado: ${planId}, Price ID (simulado): ${priceId}`);
    // Simulación de Price IDs (estos DEBEN ser reemplazados por los reales de tu cuenta de Stripe)
    // DEBES crear estos productos y precios en tu dashboard de Stripe.
    // Y luego usar los Price IDs que Stripe te proporcione.
    // Ejemplo: price_1LqX0v2eZvKYlo2Cl2XqX0v1 (mensual)
    // Ejemplo: price_1LqX1b2eZvKYlo2C1aB2c3D4 (anual)
    
    // ¡ATENCIÓN! NECESITAS PROPORCIONARME TU CLAVE PUBLICABLE DE STRIPE Y LOS PRICE IDs
    // DE TUS PRODUCTOS PARA QUE PUEDA IMPLEMENTAR EL CHECKOUT.
    // Por ahora, esta función es solo un placeholder.
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
          <Gem className="h-16 w-16 text-primary mx-auto mb-6 animate-bounce" />
          <h1 className="orbitron-font text-4xl md:text-6xl font-bold mb-4">
            Planes <span className="text-gradient-cyan">Premium</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Desbloquea beneficios exclusivos y apoya a la comunidad notmine.com. ¡Elige el plan perfecto para tu aventura!
          </p>
        </motion.section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            // Simulamos un Price ID. ¡DEBES REEMPLAZAR ESTO CON TU PRICE ID REAL DE STRIPE!
            const simulatedPriceId = `price_simulated_${plan.id}_monthly`; 
            return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={cn(
                "modern-card bg-card p-8 rounded-xl shadow-2xl flex flex-col relative overflow-hidden border-2",
                plan.popular ? plan.borderColor + ' ring-4 ring-offset-2 ring-offset-background ' + plan.borderColor.replace('border-','ring-') : 'border-border hover:' + plan.borderColor,
                selectedPlan === plan.id && plan.borderColor 
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 -right-12">
                  <div className={cn("transform rotate-45 text-center text-sm font-semibold py-1 px-12 shadow-md", plan.color, "text-primary-foreground")}>
                    Popular
                  </div>
                </div>
              )}
              <div className="flex-grow">
                <div className="flex items-center mb-6">
                  <Icon className={cn("h-10 w-10 mr-4", plan.textColor)} />
                  <h2 className={cn("orbitron-font text-3xl font-bold", plan.textColor)}>{plan.name}</h2>
                </div>
                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                
                <div className="mb-8">
                  <span className={cn("text-5xl font-extrabold", plan.textColor)}>${plan.priceMonthly}</span>
                  <span className="text-muted-foreground text-lg">/mes</span>
                  <p className="text-xs text-muted-foreground mt-1">o ${plan.priceYearly}/año (ahorra 2 meses)</p>
                </div>

                <ul className="space-y-3 mb-10">
                  {plan.features.map((feature, fIndex) => {
                    const FeatureIcon = feature.icon;
                    return (
                    <li key={fIndex} className="flex items-start">
                      <FeatureIcon className={cn("h-5 w-5 mr-3 mt-0.5 flex-shrink-0", plan.textColor)} />
                      <span className="text-sm text-foreground">{feature.text}</span>
                    </li>
                  )})}
                </ul>
              </div>

              <Button 
                onClick={() => handleSelectPlan(plan.id, simulatedPriceId)}
                className={cn(
                  "w-full modern-button text-lg py-3 mt-auto",
                  plan.popular ? plan.color + ' hover:' + plan.color + '/90' : 'bg-primary hover:bg-primary/90',
                  "text-primary-foreground"
                )}
                variant={plan.popular ? 'default' : 'default'}
              >
                {selectedPlan === plan.id ? 'Seleccionado' : 'Elegir Plan'}
              </Button>
            </motion.div>
          )})}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-16 text-center p-8 modern-card bg-card/50 backdrop-blur-sm"
        >
          <h3 className="orbitron-font text-2xl font-semibold mb-4">¿Listo para integrar Stripe?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Para activar los pagos, necesitaré tu **Clave Publicable de Stripe** y los **IDs de Precio** de cada uno de estos planes (tanto mensual como anual si ofreces ambos).
            <br />
            Puedes crear tus productos y precios en tu <a href="https://dashboard.stripe.com/products" target="_blank" rel="noopener noreferrer" className="text-primary underline">Dashboard de Stripe</a>.
            Una vez los tengas, ¡házmelo saber para completar la integración!
          </p>
           <p className="text-xs text-muted-foreground">Recuerda también activar "Client-only Checkout" en tus <a href="https://dashboard.stripe.com/settings/checkout" target="_blank" rel="noopener noreferrer" className="text-primary underline">ajustes de Checkout de Stripe</a>.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumPlans;