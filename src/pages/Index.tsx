
const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="relative">
        {/* Punto principal */}
        <div className="w-24 h-24 bg-blue-500 rounded-full shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 ease-out cursor-pointer animate-pulse">
          {/* Efecto de brillo interno */}
          <div className="absolute inset-2 bg-gradient-to-tr from-blue-300 to-transparent rounded-full opacity-60"></div>
          {/* Punto de luz */}
          <div className="absolute top-4 left-4 w-4 h-4 bg-white rounded-full opacity-80"></div>
        </div>
        
        {/* Anillos decorativos */}
        <div className="absolute inset-0 w-32 h-32 border-2 border-blue-200 rounded-full -m-4 animate-ping opacity-20"></div>
        <div className="absolute inset-0 w-40 h-40 border border-blue-100 rounded-full -m-8 animate-pulse opacity-10"></div>
      </div>
    </div>
  );
};

export default Index;
