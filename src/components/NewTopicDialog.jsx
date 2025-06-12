
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const NewTopicDialog = ({ children, categories, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !categoryId || !user) {
      toast({
        title: "Error de validación",
        description: "Por favor, completa todos los campos.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    
    const { data, error } = await supabase
      .from('forum_topics')
      .insert({ title, content, category_id: categoryId, user_id: user.id })
      .select('*, profiles(*), forum_categories(*), forum_replies(id)')
      .single();

    setLoading(false);
    if (error) {
      toast({
        title: "Error al crear el tema",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "¡Tema creado exitosamente!" });
      onSuccess(data);
      setOpen(false);
      setTitle('');
      setContent('');
      setCategoryId('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="orbitron-font text-2xl">Crear Nuevo Tema</DialogTitle>
          <DialogDescription>
            Comparte tus ideas o preguntas con la comunidad. Rellena los detalles a continuación.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Título</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3 modern-input" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Categoría</Label>
              <select id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="col-span-3 modern-input w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                <option value="" disabled>Selecciona una categoría</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right pt-2">Contenido</Label>
              <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="col-span-3 modern-input" rows={8} required />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="modern-button" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Publicar Tema
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTopicDialog;
