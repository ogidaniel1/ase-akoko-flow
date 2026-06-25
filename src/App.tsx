import { TranslationInterface } from "./components/TranslationInterface";
import { Toaster } from "./components/ui/sonner";
import { Languages, Info } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Background Image / Overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, color-mix(in oklch, var(--primary) 4%, transparent) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, color-mix(in oklch, var(--accent) 6%, transparent) 0%, transparent 50%)'
        }}
      />
      <div
        className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: `url('https://storage.googleapis.com/dala-prod-public-storage/generated-images/2f5e4e9c-5fed-4b3c-9bd5-39afc69a901c/yoruba-culture-background-b194b6bc-1782405551220.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-xl shadow-lg shadow-primary/20">
                <Languages className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-tight">EdeAse</h1>
                <span className="text-[10px] font-medium text-primary uppercase tracking-widest leading-none">Ase Akoko Translation</span>
              </div>
            </div>
            
            {/* Mobile indicator */}
            <div className="flex md:hidden items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">Ase Akoko</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Dialects</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Dictionary</a>
              <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                <Info className="w-4 h-4" />
                Help
              </button>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
              Bridge the Language&nbsp;Gap
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Easily translate between Yoruba (Ase Akoko dialect) and English. 
              Preserving culture through seamless communication.
            </p>
          </div>

          <TranslationInterface />
        </main>

        {/* Footer */}
        <footer className="border-t border-border/40 py-12 mt-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Languages className="w-5 h-5 text-primary" />
                <span className="text-lg font-bold">EdeAse</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dedicated to the preservation and promotion of the Yoruba language 
                and its diverse dialects, starting with Ase Akoko.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About Ase Akoko</a></li>
                <li><a href="#" className="hover:text-primary">Linguistic Resources</a></li>
                <li><a href="#" className="hover:text-primary">Cultural Heritage</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: hello@edease.org</li>
                <li>Location: Ondo State, Nigeria</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-border/20 text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} EdeAse Translation System. All rights reserved.
          </div>
        </footer>
      </div>

      <Toaster position="top-center" />
    </div>
  );
}

export default App;
