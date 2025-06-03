
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useStore } from "@/store/useStore";
import { useNotifications } from "@/hooks/useNotifications";
import { useValidation, CommonSchemas } from "@/hooks/useValidation";
import { Eye, EyeOff, LogIn } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, setAuthLoading } = useStore();
  const { showSuccess, showError } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { errors, validate, validateSingle, clearError } = useValidation(CommonSchemas.login);

  // Get the page user was trying to access
  const from = location.state?.from?.pathname || "/profile";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      clearError(name);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateSingle(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validate(formData)) {
      showError("Por favor, corrige los errores en el formulario");
      return;
    }

    setIsLoading(true);
    setAuthLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login - Replace with real API call
      if (formData.email === "admin@choco.com" && formData.password === "password") {
        const userData = {
          id: "user-1",
          name: "Admin Usuario",
          email: formData.email,
          firstName: "Admin",
          lastName: "Usuario",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        };
        
        const token = "mock-jwt-token"; // In real app, this comes from API
        
        login(userData, token);
        showSuccess(`¡Bienvenido de vuelta, ${userData.firstName}!`);
        navigate(from, { replace: true });
      } else {
        showError("Credenciales inválidas. Intenta con admin@choco.com / password");
      }
    } catch (error) {
      showError("Error al iniciar sesión. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
      setAuthLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Iniciar Sesión</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="max-w-md mx-auto">
          <div className="bg-white border border-secondary/20 rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="mx-auto w-12 h-12 bg-action rounded-full flex items-center justify-center mb-4">
                <LogIn className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                Iniciar Sesión
              </h1>
              <p className="text-secondary">
                Accede a tu cuenta de Chocó Artesanal
              </p>
            </div>

            {/* Demo credentials */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">Credenciales de prueba:</h3>
              <p className="text-sm text-blue-700">
                <strong>Email:</strong> admin@choco.com<br />
                <strong>Contraseña:</strong> password
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-primary">
                  Correo Electrónico *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`mt-1 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-secondary/30 focus:border-action'}`}
                  placeholder="tu@email.com"
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="text-primary">
                  Contraseña *
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`mt-1 pr-10 ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-secondary/30 focus:border-action'}`}
                    placeholder="Tu contraseña"
                    aria-describedby={errors.password ? "password-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-primary"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.password}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-action hover:bg-action/90 text-white py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <LoadingSpinner size="sm" />
                    <span>Iniciando sesión...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <LogIn className="h-5 w-5" />
                    <span>Iniciar Sesión</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-4">
              <p className="text-secondary">
                ¿No tienes una cuenta?{" "}
                <Link to="/register" className="text-action hover:underline font-semibold">
                  Regístrate aquí
                </Link>
              </p>
              <Link to="/contact" className="text-secondary hover:text-action text-sm inline-block">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
