
type RelationshipType = "pareja" | "amistad" | "familiar" | "otro";

interface QuestionnaireData {
  relationshipType: RelationshipType;
  selfDoubt: boolean;
  controlFeelings: boolean;
  guiltyBreaking: boolean;
  wantsEvaluation: boolean;
}

interface AnalysisResult {
  riskLevel: "bajo" | "medio" | "alto";
  redFlags: RedFlag[];
  summary: string;
  recommendations: string[];
}

interface RedFlag {
  category: "control" | "gaslighting" | "guilt" | "isolation" | "aggression";
  examples: string[];
  description: string;
}

// Patrones para detectar en las conversaciones
const patterns = {
  control: [
    /no hables con nadie más/i,
    /avísame cuando llegues/i,
    /te revisé el celular/i,
    /con quién estás/i,
    /qué estás haciendo/i,
    /por qué no contestas/i,
    /quién es ese\/esa/i,
    /no te vistas así/i,
  ],
  gaslighting: [
    /eso nunca pasó/i,
    /estás loc[oa]/i,
    /te lo imaginas/i,
    /estás exagerando/i,
    /eso no fue lo que dije/i,
    /siempre malinterpretas todo/i,
    /eres muy sensible/i,
    /estás paranoic[oa]/i,
  ],
  guilt: [
    /si me dejas es tu culpa/i,
    /si te enojas es porque no me amas/i,
    /después de todo lo que hice por ti/i,
    /nadie te va a querer como yo/i,
    /me vas a hacer daño/i,
    /sin ti no puedo vivir/i,
    /vas a ser responsable si algo me pasa/i,
  ],
  isolation: [
    /nadie más te entiende/i,
    /yo soy el único que te quiere/i,
    /tus amigos son mala influencia/i,
    /tu familia no te apoya como yo/i,
    /solo deberías confiar en mí/i,
    /los demás hablan mal de ti/i,
  ],
  aggression: [
    /es broma, no seas sensible/i,
    /solo estoy jugando/i,
    /no aguantas nada/i,
    /no tienes sentido del humor/i,
    /qué estúpid[oa]/i,
    /pareces ton[ta|to]/i,
    /no sirves para nada/i,
    /qué ridícul[oa]/i,
  ],
};

// Descripciones para cada categoría
const flagDescriptions = {
  control: "Control excesivo: frases que buscan limitar, monitorear o controlar tus actividades, relaciones o decisiones.",
  gaslighting: "Gaslighting: expresiones que te hacen dudar de tu memoria, percepción o cordura.",
  guilt: "Culpabilización: intentos de hacerte sentir responsable por el bienestar o las emociones de la otra persona.",
  isolation: "Aislamiento: mensajes que buscan separarte de tu red de apoyo o generar desconfianza hacia otras personas.",
  aggression: "Agresión disfrazada: humillaciones, insultos o críticas presentadas como bromas o comentarios casuales."
};

// Recomendaciones para cada nivel de riesgo
const recommendations = {
  bajo: [
    "Mantén conversaciones abiertas sobre cómo te sientes en la relación.",
    "Establece límites claros sobre lo que te hace sentir cómodo/a e incómodo/a.",
    "Habla con amigos de confianza sobre tus percepciones.",
    "Edúcate sobre relaciones saludables a través de recursos en línea."
  ],
  medio: [
    "Considera hablar con un consejero escolar o profesional sobre tu relación.",
    "Mantén conexión con amigos y familia que te apoyen.",
    "No justifiques comportamientos que te hagan sentir mal.",
    "Busca información sobre patrones de relaciones poco saludables.",
    "Establece límites firmes y observa si son respetados."
  ],
  alto: [
    "Busca apoyo profesional de inmediato (consejeros, psicólogos, líneas de ayuda).",
    "No enfrentes solo/a esta situación, apóyate en personas de confianza.",
    "Crea un plan de seguridad emocional y, si es necesario, física.",
    "Recuerda que no eres responsable del comportamiento de la otra persona.",
    "Considera distanciarte de esta relación por tu bienestar."
  ]
};

export const analyzeConversation = (text: string, questionnaire: QuestionnaireData): AnalysisResult => {
  // Detectar banderas rojas en el texto
  const redFlags: RedFlag[] = [];
  let totalFlags = 0;
  
  // Analizar el texto para cada categoría
  for (const [category, regexList] of Object.entries(patterns)) {
    const examples: string[] = [];
    
    regexList.forEach(regex => {
      const matches = text.match(new RegExp(regex, 'gi'));
      if (matches && matches.length > 0) {
        matches.forEach(match => {
          examples.push(match);
          totalFlags++;
        });
      }
    });
    
    if (examples.length > 0) {
      redFlags.push({
        category: category as "control" | "gaslighting" | "guilt" | "isolation" | "aggression",
        examples,
        description: flagDescriptions[category as keyof typeof flagDescriptions]
      });
    }
  }
  
  // Determinar nivel de riesgo basado en banderas rojas y cuestionario
  let riskPoints = totalFlags;
  
  // Aumentar puntos de riesgo basado en respuestas del cuestionario
  if (questionnaire.selfDoubt) riskPoints += 2;
  if (questionnaire.controlFeelings) riskPoints += 2;
  if (questionnaire.guiltyBreaking) riskPoints += 3;
  
  // Factor relación (parejas suelen tener mayor riesgo estadísticamente)
  if (questionnaire.relationshipType === "pareja") riskPoints += 1;
  
  let riskLevel: "bajo" | "medio" | "alto";
  if (riskPoints < 5) {
    riskLevel = "bajo";
  } else if (riskPoints < 10) {
    riskLevel = "medio";
  } else {
    riskLevel = "alto";
  }
  
  // Generar resumen
  const summary = generateSummary(redFlags, riskLevel, questionnaire);
  
  return {
    riskLevel,
    redFlags,
    summary,
    recommendations: recommendations[riskLevel]
  };
};

const generateSummary = (
  redFlags: RedFlag[], 
  riskLevel: "bajo" | "medio" | "alto",
  questionnaire: QuestionnaireData
): string => {
  if (redFlags.length === 0) {
    return "No se detectaron señales claras de manipulación o abuso emocional en esta conversación.";
  }
  
  const relationshipText = {
    pareja: "relación de pareja",
    amistad: "amistad",
    familiar: "relación familiar",
    otro: "relación"
  }[questionnaire.relationshipType];
  
  const severityText = {
    bajo: "algunas señales preocupantes",
    medio: "varias señales preocupantes",
    alto: "múltiples señales alarmantes"
  }[riskLevel];
  
  const categories = redFlags.map(flag => flag.category);
  let patternText = "";
  
  if (categories.includes("control") && categories.includes("isolation")) {
    patternText = "especialmente orientadas al control y aislamiento";
  } else if (categories.includes("gaslighting") && categories.includes("guilt")) {
    patternText = "que incluyen manipulación emocional y culpabilización";
  } else if (categories.includes("aggression")) {
    patternText = "incluyendo agresiones verbales disfrazadas";
  }
  
  return `Se detectaron ${severityText} en esta ${relationshipText} ${patternText}. Es importante que evalúes cómo te sientes en esta relación y consideres las recomendaciones proporcionadas.`;
};

export type { QuestionnaireData, AnalysisResult, RedFlag, RelationshipType };
