
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { type QuestionnaireData, type RelationshipType } from "@/utils/analyzers";

interface QuestionnaireFormProps {
  onComplete: (data: QuestionnaireData) => void;
}

const QuestionnaireForm = ({ onComplete }: QuestionnaireFormProps) => {
  const [relationshipType, setRelationshipType] = useState<RelationshipType>("pareja");
  const [selfDoubt, setSelfDoubt] = useState<boolean | null>(null);
  const [controlFeelings, setControlFeelings] = useState<boolean | null>(null);
  const [guiltyBreaking, setGuiltyBreaking] = useState<boolean | null>(null);
  const [wantsEvaluation, setWantsEvaluation] = useState<boolean | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selfDoubt !== null && controlFeelings !== null && guiltyBreaking !== null && wantsEvaluation !== null) {
      onComplete({
        relationshipType,
        selfDoubt,
        controlFeelings,
        guiltyBreaking,
        wantsEvaluation,
      });
    }
  };
  
  return (
    <Card className="rel8-card max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <h2 className="rel8-subheader">Cuestionario Inicial</h2>
            <p className="text-muted-foreground mb-4">
              Por favor responde estas preguntas breves para ayudarnos a entender mejor el contexto
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium mb-2 block">
                1. ¿Esta conversación es con una pareja, amigo/a o familiar?
              </Label>
              <RadioGroup 
                value={relationshipType} 
                onValueChange={(value) => setRelationshipType(value as RelationshipType)}
                className="grid grid-cols-2 gap-4 sm:grid-cols-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pareja" id="pareja" />
                  <Label htmlFor="pareja">Pareja</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="amistad" id="amistad" />
                  <Label htmlFor="amistad">Amistad</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="familiar" id="familiar" />
                  <Label htmlFor="familiar">Familiar</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="otro" id="otro" />
                  <Label htmlFor="otro">Otro</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label className="text-base font-medium mb-2 block">
                2. ¿Sientes que esta persona te hace dudar de ti mismo/a o te hace sentir mal contigo mismo/a?
              </Label>
              <RadioGroup 
                value={selfDoubt === null ? "" : selfDoubt.toString()} 
                onValueChange={(value) => setSelfDoubt(value === "true")}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="selfDoubt-yes" />
                  <Label htmlFor="selfDoubt-yes">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="selfDoubt-no" />
                  <Label htmlFor="selfDoubt-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label className="text-base font-medium mb-2 block">
                3. ¿Has sentido que esta persona te controla o te limita?
              </Label>
              <RadioGroup 
                value={controlFeelings === null ? "" : controlFeelings.toString()} 
                onValueChange={(value) => setControlFeelings(value === "true")}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="control-yes" />
                  <Label htmlFor="control-yes">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="control-no" />
                  <Label htmlFor="control-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label className="text-base font-medium mb-2 block">
                4. ¿Alguna vez has querido cortar la relación, pero te sentiste culpable o incapaz?
              </Label>
              <RadioGroup 
                value={guiltyBreaking === null ? "" : guiltyBreaking.toString()} 
                onValueChange={(value) => setGuiltyBreaking(value === "true")}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="guilty-yes" />
                  <Label htmlFor="guilty-yes">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="guilty-no" />
                  <Label htmlFor="guilty-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label className="text-base font-medium mb-2 block">
                5. ¿Te gustaría recibir una evaluación sobre si estás viviendo una relación emocionalmente dañina?
              </Label>
              <RadioGroup 
                value={wantsEvaluation === null ? "" : wantsEvaluation.toString()} 
                onValueChange={(value) => setWantsEvaluation(value === "true")}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="evaluation-yes" />
                  <Label htmlFor="evaluation-yes">Sí</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="evaluation-no" />
                  <Label htmlFor="evaluation-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <Button 
            type="submit"
            className="w-full rel8-gradient"
            disabled={
              selfDoubt === null || 
              controlFeelings === null || 
              guiltyBreaking === null || 
              wantsEvaluation === null
            }
          >
            Continuar
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default QuestionnaireForm;
