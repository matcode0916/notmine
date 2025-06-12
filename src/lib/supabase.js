import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY";


// =================================================================================
// ¡ATENCIÓN! PARA QUE LA AUTENTICACIÓN Y LA BASE DE DATOS FUNCIONEN,
// DEBES COMPLETAR LA INTEGRACIÓN CON SUPABASE.
//
// Sigue estos pasos:
// 1. Haz clic en el botón "Supabase" en la esquina superior derecha de la pantalla.
// 2. Conecta tu cuenta de Supabase y autoriza el acceso.
// 3. Selecciona o crea un proyecto de Supabase para conectarlo.
// 4. Una vez conectado, las variables de entorno (URL y clave anónima) se
//    inyectarán automáticamente aquí y la aplicación será 100% funcional.
//
// NO necesitas reemplazar manualmente "YOUR_SUPABASE_URL" y "YOUR_SUPABASE_ANON_KEY".
// El sistema lo hará por ti después de que completes la integración.
// =================================================================================


const supabase = (supabaseUrl && supabaseUrl.startsWith('http'))
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export { supabase };