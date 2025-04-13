
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface TextInputProps {
  onTextSubmit: (text: string) => void;
}

const TextInput = ({ onTextSubmit }: TextInputProps) => {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter text to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      onTextSubmit(text);
      toast({
        title: "Text processed",
        description: "Your input has been analyzed successfully.",
      });
    } catch (error) {
      console.error("Error processing text:", error);
      toast({
        title: "Processing error",
        description: "There was an error analyzing your text.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Enter your text here..."
        className="min-h-[150px] resize-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button 
        type="submit" 
        disabled={isSubmitting || !text.trim()}
        className="w-full"
      >
        {isSubmitting ? "Processing..." : "Analyze Text"}
      </Button>
    </form>
  );
};

export default TextInput;
