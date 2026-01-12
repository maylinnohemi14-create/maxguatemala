import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { User, Session } from '@supabase/supabase-js';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [hasExistingUsers, setHasExistingUsers] = useState(true);
  const [checkingUsers, setCheckingUsers] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there are existing users (profiles)
    const checkExistingUsers = async () => {
      try {
        const { count, error } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          console.error('Error checking users:', error);
          setHasExistingUsers(true); // Default to login only on error
        } else {
          setHasExistingUsers((count ?? 0) > 0);
          // If no users exist, show signup form
          if ((count ?? 0) === 0) {
            setIsLogin(false);
          }
        }
      } catch (err) {
        console.error('Error:', err);
        setHasExistingUsers(true);
      } finally {
        setCheckingUsers(false);
      }
    };

    checkExistingUsers();

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Redirect authenticated users to admin
        if (session?.user) {
          setTimeout(() => {
            navigate("/admin");
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        navigate("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Email ou senha incorretos");
          } else {
            toast.error(error.message);
          }
          return;
        }

        toast.success("Login realizado com sucesso!");
      } else {
        // Check again if user already exists before signup
        const { count } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        if ((count ?? 0) > 0) {
          toast.error("Já existe uma conta cadastrada. Faça login.");
          setIsLogin(true);
          setHasExistingUsers(true);
          return;
        }

        const redirectUrl = `${window.location.origin}/`;
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl
          }
        });

        if (error) {
          if (error.message.includes("User already registered")) {
            toast.error("Este email já está cadastrado");
          } else {
            toast.error(error.message);
          }
          return;
        }

        toast.success("Conta criada com sucesso! Você já pode fazer login.");
        setIsLogin(true);
        setHasExistingUsers(true);
      }
    } catch (error: any) {
      toast.error("Erro ao processar solicitação");
    } finally {
      setLoading(false);
    }
  };

  if (checkingUsers) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background p-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-xl p-8 border border-border">
          <h1 className="text-3xl font-bold text-center mb-2 text-foreground">
            {isLogin ? "Login" : "Criar Conta Admin"}
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            {isLogin 
              ? "Acesse o painel administrativo" 
              : "Crie sua conta de administrador"}
          </p>

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                isLogin ? "Entrar" : "Criar Conta Admin"
              )}
            </Button>
          </form>

          {/* Only show toggle if no users exist yet */}
          {!hasExistingUsers && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline"
                disabled={loading}
              >
                {isLogin ? "Criar conta de administrador" : "Já tem conta? Fazer login"}
              </button>
            </div>
          )}

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              ← Voltar para a página inicial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
