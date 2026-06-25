import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowRightLeft, Copy, RotateCcw, Volume2, History as HistoryIcon, Languages } from "lucide-react";
import { toast } from "sonner";
import { translateMock } from "@/data/translations";

interface HistoryItem {
  id: string;
  source: string;
  translated: string;
  timestamp: number;
}

export const TranslationInterface: React.FC = () => {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("translation_history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveToHistory = (source: string, translated: string) => {
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      source,
      translated,
      timestamp: Date.now(),
    };
    const updatedHistory = [newItem, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem("translation_history", JSON.stringify(updatedHistory));
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await translateMock(sourceText);
      setTranslatedText(result);
      saveToHistory(sourceText, result);
    } catch (error) {
      toast.error("Translation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("translation_history");
    toast.info("History cleared.");
  };

  const handleReset = () => {
    setSourceText("");
    setTranslatedText("");
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Translation Main Area */}
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input Side */}
            <Card className="border-primary/20 shadow-lg overflow-hidden bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:border-primary/30">
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Languages className="w-5 h-5 text-primary" />
                    <Label className="text-lg font-semibold tracking-tight">Yoruba (Ase Akoko)</Label>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => copyToClipboard(sourceText)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <Textarea
                  placeholder="Type Yoruba text here..."
                  className="min-h-[200px] text-lg border-none focus-visible:ring-0 resize-none p-0 bg-transparent"
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                />
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-muted-foreground/60">{sourceText.length} characters</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button 
                    onClick={handleTranslate} 
                    disabled={isLoading || !sourceText.trim()}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 rounded-full"
                  >
                    {isLoading ? "Translating..." : "Translate"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Output Side */}
            <Card className="border-primary/20 shadow-lg overflow-hidden bg-card/50 backdrop-blur-sm relative transition-all duration-300 hover:shadow-xl hover:border-primary/30">
              <CardHeader className="bg-muted border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label className="text-lg font-semibold tracking-tight">English</Label>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(translatedText)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="min-h-[200px] text-lg text-foreground/80 leading-relaxed">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full pt-12 space-y-4 w-full">
                      <div className="space-y-4 w-full">
                        <div className="h-4 rounded w-3/4 animate-shimmer"></div>
                        <div className="h-4 rounded w-1/2 animate-shimmer" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-4 rounded w-5/6 animate-shimmer" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  ) : (
                    translatedText ? <span className="animate-fade-in-up" key={translatedText}>{translatedText}</span> : <span className="text-muted-foreground italic text-base">Translation will appear here...</span>
                  )}
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="icon" className="rounded-full" onClick={handleReset}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* History Sidebar */}
        <Card className="w-full md:w-80 border-primary/20 shadow-md bg-card/40 backdrop-blur-sm">
          <CardHeader className="border-b border-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HistoryIcon className="w-4 h-4 text-primary" />
                <CardTitle className="text-base">Recent History</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-xs h-7" onClick={clearHistory}>
                Clear
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/40 max-h-[500px] overflow-y-auto">
              {history.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  No recent translations
                </div>
              ) : (
                history.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-4 hover:bg-primary/5 cursor-pointer transition-all duration-200 group animate-slide-in-right border-l-2 border-transparent hover:border-primary/40"
                    onClick={() => {
                      setSourceText(item.source);
                      setTranslatedText(item.translated);
                    }}
                  >
                    <p className="font-medium text-sm truncate text-primary">{item.source}</p>
                    <p className="text-xs text-muted-foreground mt-1 truncate">{item.translated}</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-2">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
