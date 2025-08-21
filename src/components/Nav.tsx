import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/auth/AuthProvider";
const Nav = () =>{ 
  
  const {user,signOutUser} = useAuth();
  return (
    <nav className="relative z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ChopURL
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
              <Button 
                variant="ghost" 
                onClick={signOutUser}
                className="text-muted-foreground hover:text-foreground"
              >
                Sign Out
              </Button>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                    Sign Up for Free
                  </Button>
                </Link>
              </>
            )}
            </div>
          </div>
        </div>
      </nav>
) 
}

export default Nav;