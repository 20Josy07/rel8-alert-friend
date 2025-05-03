
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { type QuestionnaireData, type AnalysisResult, analyzeConversation } from "@/utils/analyzers";
import { ArrowRight } from "lucide-react";

interface ConversationAnalyzerProps {
  questionnaireData: QuestionnaireData;
  onAnalysisComplete: (result: AnalysisResult) => void;
  onBack: () => void;
}

const ConversationAnalyzer = ({
  questionnaireData,
  onAnalysisComplete,
  onBack
}: ConversationAnalyzerProps) => {
  const [conversation, setConversation] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const handleAnalyze = () => {
    if (conversation.trim().length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulating analysis time
    setTimeout(() => {
      const result = analyzeConversation(conversation, questionnaireData);
      onAnalysisComplete(result);
      setIsAnalyzing(false);
    }, 1500);
  };
  
  return (
    <Card className="rel8-card max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <h2 className="rel8-subheader">Analiza tu conversación</h2>
          <p className="text-muted-foreground mb-4">
            Copia y pega una parte de la conversación que quieras analizar. 
            Te recomendamos incluir al menos 10 intercambios para un análisis más preciso.
          </p>
        </div>
        
        <div className="space-y-4">
          <Textarea
            value={conversation}
            onChange={(e) => setConversation(e.target.value)}
            placeholder="Copia y pega aquí tu conversación..."
            className="min-h-[200px] border-rel8-soft-purple focus:border-rel8-purple focus-visible:ring-rel8-purple"
          />
          
          <div className="flex flex-col sm:flex-row gap-2 justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={onBack}
              className="border-rel8-soft-purple hover:bg-rel8-soft-purple/20"
            >
              Volver
            </Button>
            
            <Button
              type="button"
              onClick={handleAnalyze}
              className="rel8-gradient"
              disabled={conversation.trim().length === 0 || isAnalyzing}
            >
              {isAnalyzing ? (
                <div className="flex items-center">
                  <span className="animate-pulse mr-2">Analizando</span>
                  <div className="h-2 w-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                  <div className="h-2 w-2 bg-white rounded-full animate-pulse ml-1" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 bg-white rounded-full animate-pulse ml-1" style={{ animationDelay: '0.4s' }}></div>
                </div>
              ) : (
                <div className="flex items-center">
                  Analizar conversación <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              )}
            </Button>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>
            <strong>Nota:</strong> Toda la información que compartas es analizada localmente en tu dispositivo 
            y no se almacena en ninguna base de datos. Tu privacidad es importante para nosotros.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ConversationAnalyzer;
