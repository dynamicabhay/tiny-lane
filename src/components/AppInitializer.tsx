import { useAuth } from "@/auth/AuthProvider";
import AuthLoader from "./ui/auth-loader";

const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading } = useAuth(); 

  if (loading) return <AuthLoader />; // Full screen loader

  return <>{children}</>;
};

