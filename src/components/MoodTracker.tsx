import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const moodOptions = [
  { emoji: "😢", label: "Very Sad", value: 1, color: "text-destructive" },
  { emoji: "😟", label: "Sad", value: 2, color: "text-orange-500" },
  { emoji: "😐", label: "Neutral", value: 3, color: "text-warning" },
  { emoji: "😊", label: "Happy", value: 4, color: "text-primary" },
  { emoji: "😄", label: "Very Happy", value: 5, color: "text-success" },
];

export const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const { toast } = useToast();

  const handleMoodSubmit = () => {
    if (selectedMood === null) return;
    
    // Here you would typically save to a database
    const moodData = {
      mood: selectedMood,
      note,
      timestamp: new Date().toISOString(),
    };
    
    // Save to localStorage for demo purposes
    const existingMoods = JSON.parse(localStorage.getItem("moodHistory") || "[]");
    existingMoods.push(moodData);
    localStorage.setItem("moodHistory", JSON.stringify(existingMoods));
    
    toast({
      title: "Mood recorded!",
      description: "Your daily mood check-in has been saved.",
    });
    
    setSelectedMood(null);
    setNote("");
  };

  return (
    <Card className="shadow-card border-0 bg-gradient-calm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl bg-gradient-wellness bg-clip-text text-transparent">
          How are you feeling today?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-5 gap-3">
          {moodOptions.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`
                p-4 rounded-2xl transition-all duration-300 border-2
                ${selectedMood === mood.value 
                  ? 'border-primary bg-primary/10 shadow-wellness scale-105' 
                  : 'border-border bg-card hover:border-primary/50 hover:scale-105'
                }
              `}
            >
              <div className="text-3xl mb-2 animate-pulse-slow">{mood.emoji}</div>
              <div className={`text-xs font-medium ${mood.color}`}>
                {mood.label}
              </div>
            </button>
          ))}
        </div>
        
        <div className="space-y-3">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="How was your day? (optional)"
            className="w-full p-3 rounded-xl border border-border bg-card/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            rows={3}
          />
          
          <Button 
            onClick={handleMoodSubmit}
            disabled={selectedMood === null}
            className="w-full bg-gradient-wellness hover:opacity-90 transition-opacity shadow-wellness"
          >
            Record Mood
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};