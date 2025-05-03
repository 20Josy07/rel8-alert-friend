
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type AnalysisResult, type RedFlag } from "@/utils/analyzers";
import { AlertCircle, CheckCircle, RefreshCcw } from "lucide-react";

interface ResultsDisplayProps {
  result: AnalysisResult;
  onReset: () => void;
}

const ResultsDisplay = ({ result, onReset }: ResultsDisplayProps) => {
  const { riskLevel, redFlags, summary, recommendations } = result;
  
  const riskLevelMap = {
    bajo: {
      color: "bg-green-100",
      textColor: "text-green-800",
      borderColor: "border-green-200",
      title: "Nivel de riesgo: Bajo",
      icon: CheckCircle,
    },
    medio: {
      color: "bg-yellow-100",
      textColor: "text-yellow-800",
      borderColor: "border-yellow-200",
      title: "Nivel de riesgo: Medio",
      icon: AlertCircle,
    },
    alto: {
      color: "bg-red-100",
      textColor: "text-red-800", 
      borderColor: "border-red-200",
      title: "Nivel de riesgo: Alto",
      icon: AlertCircle,
    }
  };
  
  const currentRisk = riskLevelMap[riskLevel];
  
  const categoryIcons = {
    control: "🔒",
    gaslighting: "💭",
    guilt: "🔗",
    isolation: "🏝️",
    aggression: "🎭"
  };
  
  return (
    <Card className="rel8-card max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <h2 className="rel8-subheader">Resultados del análisis</h2>
        </div>
        
        <div className={`p-4 rounded-md ${currentRisk.color} ${currentRisk.borderColor} border flex items-start gap-3`}>
          <currentRisk.icon className={`h-5 w-5 mt-0.5 ${currentRisk.textColor}`} />
          <div>
            <h3 className={`font-medium ${currentRisk.textColor}`}>{currentRisk.title}</h3>
            <p className={currentRisk.textColor}>{summary}</p>
          </div>
        </div>
        
        {redFlags.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Señales detectadas</h3>
            {redFlags.map((flag, index) => (
              <RedFlagCard key={index} flag={flag} />
            ))}
          </div>
        ) : (
          <div className="p-4 bg-gray-100 rounded-md">
            <p className="text-gray-700">
              No se detectaron señales claras de manipulación o abuso emocional en esta conversación.
              Sin embargo, confía en tus instintos si sientes que algo no está bien en la relación.
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Recomendaciones</h3>
          <ul className="list-disc pl-5 space-y-1">
            {recommendations.map((rec, index) => (
              <li key={index} className="text-gray-700">{rec}</li>
            ))}
          </ul>
        </div>
        
        <div className="pt-2">
          <Button 
            onClick={onReset}
            className="w-full flex items-center justify-center rel8-gradient"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Analizar otra conversación
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground border-t pt-4">
          <p>
            <strong>Nota importante:</strong> Este análisis es una herramienta educativa y no reemplaza el juicio profesional.
            Si te encuentras en una situación de riesgo, busca ayuda profesional de inmediato.
          </p>
        </div>
      </div>
    </Card>
  );
};

interface RedFlagCardProps {
  flag: RedFlag;
}

const RedFlagCard = ({ flag }: RedFlagCardProps) => {
  const categoryIcons = {
    control: "🔒",
    gaslighting: "💭",
    guilt: "🔗",
    isolation: "🏝️",
    aggression: "🎭"
  };
  
  const categoryColors = {
    control: "bg-blue-50 border-blue-200 text-blue-800",
    gaslighting: "bg-purple-50 border-purple-200 text-purple-800",
    guilt: "bg-yellow-50 border-yellow-200 text-yellow-800",
    isolation: "bg-orange-50 border-orange-200 text-orange-800",
    aggression: "bg-red-50 border-red-200 text-red-800",
  };
  
  return (
    <div className={`p-4 rounded-md border ${categoryColors[flag.category]}`}>
      <div className="flex items-start space-x-2">
        <span className="text-xl">{categoryIcons[flag.category]}</span>
        <div className="space-y-2 w-full">
          <h4 className="font-medium">{flag.description}</h4>
          <div className="text-sm">
            <p className="mb-1 font-medium">Ejemplos detectados:</p>
            <ul className="list-disc pl-5 space-y-0.5">
              {flag.examples.slice(0, 3).map((example, index) => (
                <li key={index}>"{example}"</li>
              ))}
              {flag.examples.length > 3 && (
                <li>... y {flag.examples.length - 3} más</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
