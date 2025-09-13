import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Recommendation {
  id: number;
  title: string;
  description: string;
  type: "exercise" | "mindfulness" | "social" | "sleep" | "nutrition";
  icon: string;
  duration: string;
}

const allRecommendations: Recommendation[] = [
  {
    id: 1,
    title: "5-Minute Breathing Exercise",
    description: "Try deep breathing to reduce stress and anxiety",
    type: "mindfulness",
    icon: "🧘‍♀️",
    duration: "5 min"
  },
  {
    id: 2,
    title: "Take a Short Walk",
    description: "Fresh air and movement can boost your mood",
    type: "exercise",
    icon: "🚶‍♀️",
    duration: "15 min"
  },
  {
    id: 3,
    title: "Call a Friend",
    description: "Social connection is vital for mental health",
    type: "social",
    icon: "📞",
    duration: "20 min"
  },
  {
    id: 4,
    title: "Listen to Calming Music",
    description: "Music therapy can help regulate emotions",
    type: "mindfulness",
    icon: "🎵",
    duration: "10 min"
  },
  {
    id: 5,
    title: "Write in a Journal",
    description: "Express your thoughts and feelings on paper",
    type: "mindfulness",
    icon: "📝",
    duration: "15 min"
  },
  {
    id: 6,
    title: "Prepare a Healthy Snack",
    description: "Nutrition affects mood and energy levels",
    type: "nutrition",
    icon: "🥗",
    duration: "10 min"
  },
  {
    id: 7,
    title: "Practice Gratitude",
    description: "List three things you're grateful for today",
    type: "mindfulness",
    icon: "🙏",
    duration: "5 min"
  },
  {
    id: 8,
    title: "Do Some Stretching",
    description: "Gentle stretches can release tension",
    type: "exercise",
    icon: "🤸‍♀️",
    duration: "10 min"
  }
];

export const WellnessRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    // Get recent mood to personalize recommendations
    const recentMoods = JSON.parse(localStorage.getItem("moodHistory") || "[]");
    const lastMood = recentMoods[recentMoods.length - 1]?.mood || 3;

    let filteredRecs = [...allRecommendations];

    // Personalize based on mood
    if (lastMood <= 2) {
      // Focus on mood-boosting activities
      filteredRecs = allRecommendations.filter(rec => 
        rec.type === "mindfulness" || rec.type === "exercise" || rec.type === "social"
      );
    } else if (lastMood >= 4) {
      // Maintain good mood
      filteredRecs = allRecommendations.filter(rec => 
        rec.type === "exercise" || rec.type === "social" || rec.type === "nutrition"
      );
    }

    // Shuffle and take 3 recommendations
    const shuffled = filteredRecs.sort(() => 0.5 - Math.random());
    setRecommendations(shuffled.slice(0, 3));
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "mindfulness": return "bg-accent/20 text-accent-foreground border-accent/30";
      case "exercise": return "bg-success/20 text-success-foreground border-success/30";
      case "social": return "bg-primary/20 text-primary-foreground border-primary/30";
      case "nutrition": return "bg-warning/20 text-warning-foreground border-warning/30";
      case "sleep": return "bg-secondary/20 text-secondary-foreground border-secondary/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <Card className="shadow-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-xl">💡</span>
          Personalized Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div 
            key={rec.id}
            className="p-4 rounded-xl border border-border/50 bg-gradient-to-r from-card to-card/50 hover:shadow-wellness transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl group-hover:animate-float">
                {rec.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {rec.title}
                  </h3>
                  <Badge variant="outline" className={getTypeColor(rec.type)}>
                    {rec.duration}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {rec.description}
                </p>
                <Badge 
                  variant="secondary" 
                  className="mt-2 text-xs capitalize"
                >
                  {rec.type}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};