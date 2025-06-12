
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquare, ThumbsUp, ThumbsDown, Share2, Clock, Pin, User, Reply, Edit, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ForumTopic = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [topic, setTopic] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReply, setNewReply] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  const fetchTopicAndReplies = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data: topicData, error: topicError } = await supabase
      .from('forum_topics')
      .select('*, profiles(*), forum_categories(*)')
      .eq('id', id)
      .single();

    if (topicError || !topicData) {
      toast({ title: "Error", description: "No se pudo encontrar el tema.", variant: "destructive" });
      navigate('/foro');
      return;
    }
    setTopic(topicData);

    const { data: repliesData, error: repliesError } = await supabase
      .from('forum_replies')
      .select('*, profiles(*)')
      .eq('topic_id', id)
      .order('created_at', { ascending: true });
      
    if (repliesData) setReplies(repliesData);
    setLoading(false);
  };

  useEffect(() => {
    fetchTopicAndReplies();
  }, [id, navigate]);

  const handlePostReply = async () => {
    if (!newReply.trim() || !user) return;
    setIsReplying(true);
    const { data, error } = await supabase
      .from('forum_replies')
      .insert({ content: newReply, topic_id: id, user_id: user.id })
      .select('*, profiles(*)')
      .single();

    if (error) {
      toast({ title: "Error", description: "No se pudo publicar la respuesta.", variant: "destructive" });
    } else {
      setReplies([...replies, data]);
      setNewReply('');
      toast({ title: "¡Respuesta publicada!" });
    }
    setIsReplying(false);
  };

  const handleDeleteReply = async (replyId) => {
    const { error } = await supabase.from('forum_replies').delete().eq('id', replyId);
    if (error) {
       toast({ title: "Error", description: "No se pudo eliminar la respuesta.", variant: "destructive" });
    } else {
      setReplies(replies.filter(r => r.id !== replyId));
      toast({ title: "Respuesta eliminada." });
    }
  };
  
  const handleUpdateReply = async () => {
    if (!editingContent.trim()) return;
    
    const { data, error } = await supabase
      .from('forum_replies')
      .update({ content: editingContent })
      .eq('id', editingReplyId)
      .select('*, profiles(*)')
      .single();
      
    if (error) {
      toast({ title: "Error", description: "No se pudo actualizar la respuesta.", variant: "destructive" });
    } else {
      setReplies(replies.map(r => r.id === editingReplyId ? data : r));
      setEditingReplyId(null);
      setEditingContent('');
      toast({ title: "Respuesta actualizada." });
    }
  };
  
  const startEditing = (reply) => {
    setEditingReplyId(reply.id);
    setEditingContent(reply.content);
  }

  if (loading) {
    return <div className="flex justify-center items-center h-[60vh]"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>;
  }
  
  if (!topic) {
    return <div className="text-center py-16">No se encontró el tema o Supabase no está conectado.</div>
  }

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link to="/foro">
            <Button variant="ghost" className="text-primary hover:bg-primary/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Foro
            </Button>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="modern-card bg-card p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            {topic.is_pinned && <Pin className="h-5 w-5 text-primary" title="Fijado" />}
            <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-semibold rounded-full">
              {topic.forum_categories.name}
            </span>
          </div>
          <h1 className="orbitron-font text-3xl md:text-4xl font-bold text-foreground mb-4">{topic.title}</h1>
          <div className="flex flex-wrap items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-3 mb-2 md:mb-0">
              <Avatar className="h-10 w-10 border-2 border-primary">
                 <img  alt={topic.profiles.username} src="https://images.unsplash.com/photo-1515182218245-1e6cfbd0f95b" />
                <AvatarFallback>{topic.profiles.username.substring(0,1).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <span className="font-semibold text-primary">{topic.profiles.username}</span>
                <div className="flex items-center space-x-2"><Clock className="inline h-4 w-4" /><span>hace {formatDistanceToNow(new Date(topic.created_at), { locale: es })}</span></div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="modern-card bg-card p-6 mb-8">
          <div className="prose prose-lg max-w-none whitespace-pre-line text-card-foreground">{topic.content}</div>
        </motion.div>

        <div className="space-y-6 mb-10">
          <h2 className="orbitron-font text-2xl font-semibold text-foreground">Respuestas ({replies.length})</h2>
          {replies.map((reply, index) => (
            <motion.div key={reply.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className={`modern-card p-5 ${reply.profiles.id === topic.profiles.id ? 'bg-primary/5 border-primary/30' : 'bg-card'}`}>
              <div className="flex items-start space-x-4">
                <Avatar className="h-11 w-11 border-2 border-secondary flex-shrink-0">
                  <img  alt={reply.profiles.username} src="https://images.unsplash.com/photo-1691398495617-18457fbf826d" />
                  <AvatarFallback>{reply.profiles.username.substring(0,1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold text-primary">{reply.profiles.username}</span>
                      <span className="text-xs text-muted-foreground ml-2">hace {formatDistanceToNow(new Date(reply.created_at), { locale: es })}</span>
                    </div>
                    {user?.id === reply.user_id && editingReplyId !== reply.id && (
                       <div className='flex items-center'>
                          <Button onClick={() => startEditing(reply)} variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Edit className="h-4 w-4" /></Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader><AlertDialogTitle>¿Confirmar eliminación?</AlertDialogTitle><AlertDialogDescription>Esta acción es permanente y no se puede deshacer.</AlertDialogDescription></AlertDialogHeader>
                                <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => handleDeleteReply(reply.id)}>Eliminar</AlertDialogAction></AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                       </div>
                    )}
                  </div>
                   {editingReplyId === reply.id ? (
                      <div className='space-y-2'>
                          <Textarea value={editingContent} onChange={(e) => setEditingContent(e.target.value)} className="modern-input" />
                          <div className='flex justify-end gap-2'>
                              <Button variant="ghost" onClick={() => setEditingReplyId(null)}>Cancelar</Button>
                              <Button onClick={handleUpdateReply} className="modern-button">Guardar</Button>
                          </div>
                      </div>
                   ) : (
                      <div className="prose max-w-none text-sm whitespace-pre-line text-card-foreground">{reply.content}</div>
                   )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {user ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="modern-card bg-card p-6">
            <h3 className="orbitron-font text-xl font-semibold text-foreground mb-4">Añadir una Respuesta</h3>
            <div className="space-y-4">
              <Textarea placeholder="Escribe tu respuesta aquí..." value={newReply} onChange={(e) => setNewReply(e.target.value)} className="modern-input min-h-[120px] text-sm" rows={4} />
              <div className="flex justify-end"><Button onClick={handlePostReply} className="modern-button group" disabled={isReplying}>{isReplying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Publicar Respuesta</Button></div>
            </div>
          </motion.div>
        ) : (
          <div className='text-center modern-card bg-card p-8'>
            <h3 className='text-xl font-semibold mb-4'>¡Únete a la conversación!</h3>
            <p className='text-muted-foreground mb-4'>Debes iniciar sesión para poder responder a este tema.</p>
            <Link to={`/login?redirect=/foro/${id}`}><Button className='modern-button'>Iniciar Sesión</Button></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumTopic;
