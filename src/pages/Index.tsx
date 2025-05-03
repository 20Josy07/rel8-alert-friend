
import { useState } from "react";
import QuestionnaireForm from "@/components/QuestionnaireForm";
import ConversationAnalyzer from "@/components/ConversationAnalyzer";
import ResultsDisplay from "@/components/ResultsDisplay";
import { type QuestionnaireData, type AnalysisResult } from "@/utils/analyzers";

enum Step {
  WELCOME = "welcome",
  QUESTIONNAIRE = "questionnaire",
  CONVERSATION = "conversation",
  RESULTS = "results",
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.WELCOME);
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  
  const handleQuestionnaireComplete = (data: QuestionnaireData) => {
    setQuestionnaireData(data);
    setCurrentStep(Step.CONVERSATION);
  };
  
  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setCurrentStep(Step.RESULTS);
  };
  
  const handleReset = () => {
    setCurrentStep(Step.WELCOME);
    setQuestionnaireData(null);
    setAnalysisResult(null);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rel8-soft-purple/30 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold rel8-header mb-3">Rel8</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Identifica señales de manipulación emocional o relaciones tóxicas en tus conversaciones digitales
          </p>
        </header>
        
        <main>
          {currentStep === Step.WELCOME && (
            <div className="rel8-card max-w-2xl mx-auto text-center">
              <h2 className="rel8-subheader">Bienvenid@ a Rel8</h2>
              <p className="mb-6 text-gray-700">
                Esta herramienta te ayuda a detectar posibles señales de abuso emocional o manipulación 
                en tus conversaciones digitales. Analizaremos mensajes de WhatsApp, Instagram, o cualquier 
                otra plataforma para identificar patrones preocupantes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-rel8-soft-purple/40 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">¿Cómo funciona?</h3>
                  <ul className="text-left text-gray-700 space-y-1">
                    <li>• Responde un breve cuestionario</li>
                    <li>• Copia y pega una conversación</li>
                    <li>• Recibe un análisis personalizado</li>
                    <li>• Obtén recomendaciones útiles</li>
                  </ul>
                </div>
                <div className="bg-rel8-soft-blue/40 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">¿Qué detectamos?</h3>
                  <ul className="text-left text-gray-700 space-y-1">
                    <li>• Control excesivo</li>
                    <li>• Invalidación emocional (gaslighting)</li>
                    <li>• Culpabilización constante</li>
                    <li>• Aislamiento social</li>
                    <li>• Agresión verbal disfrazada</li>
                  </ul>
                </div>
              </div>
              <button 
                onClick={() => setCurrentStep(Step.QUESTIONNAIRE)}
                className="w-full py-3 rounded-md rel8-gradient text-white font-medium"
              >
                Comenzar análisis
              </button>
              <p className="mt-4 text-sm text-gray-500">
                Tu información es privada y se procesa localmente en tu dispositivo.
              </p>
            </div>
          )}
          
          {currentStep === Step.QUESTIONNAIRE && (
            <QuestionnaireForm onComplete={handleQuestionnaireComplete} />
          )}
          
          {currentStep === Step.CONVERSATION && questionnaireData && (
            <ConversationAnalyzer 
              questionnaireData={questionnaireData}
              onAnalysisComplete={handleAnalysisComplete}
              onBack={() => setCurrentStep(Step.QUESTIONNAIRE)}
            />
          )}
          
          {currentStep === Step.RESULTS && analysisResult && (
            <ResultsDisplay 
              result={analysisResult}
              onReset={handleReset}
            />
          )}
        </main>
        
        <footer className="mt-10 text-center text-gray-500 text-sm">
          <p>
            Rel8 © 2025 - Esta aplicación es una herramienta educativa y no sustituye la ayuda profesional.
            <br />Si estás en una situación de riesgo, busca ayuda inmediata.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
