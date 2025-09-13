import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface MoodEntry {
  mood: number;
  note: string;
  timestamp: string;
}

export const MoodTrends = () => {
  const [moodData, setMoodData] = useState<any[]>([]);

  useEffect(() => {
    const loadMoodData = () => {
      const storedMoods = JSON.parse(localStorage.getItem("moodHistory") || "[]");
      
      // Process data for the last 7 days
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date.toISOString().split('T')[0];
      });

      const processedData = last7Days.map(date => {
        const dayMoods = storedMoods.filter((entry: MoodEntry) => 
          entry.timestamp.split('T')[0] === date
        );
        
        const avgMood = dayMoods.length > 0 
          ? dayMoods.reduce((sum: number, entry: MoodEntry) => sum + entry.mood, 0) / dayMoods.length
          : null;

        return {
          date: new Date(date).toLocaleDateString('en', { weekday: 'short' }),
          mood: avgMood,
        };
      });

      setMoodData(processedData);
    };

    loadMoodData();
    
    // Listen for storage changes to update in real-time
    window.addEventListener('storage', loadMoodData);
    
    // Custom event for same-tab updates
    const handleMoodUpdate = () => loadMoodData();
    window.addEventListener('moodUpdated', handleMoodUpdate);
    
    return () => {
      window.removeEventListener('storage', loadMoodData);
      window.removeEventListener('moodUpdated', handleMoodUpdate);
    };
  }, []);

  // Trigger custom event when mood is recorded
  useEffect(() => {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
      originalSetItem.apply(this, [key, value]);
      if (key === 'moodHistory') {
        window.dispatchEvent(new Event('moodUpdated'));
      }
    };
  }, []);

  const getMoodEmoji = (mood: number | null) => {
    if (mood === null) return "😐";
    if (mood <= 1.5) return "😢";
    if (mood <= 2.5) return "😟";
    if (mood <= 3.5) return "😐";
    if (mood <= 4.5) return "😊";
    return "😄";
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload[0]) {
      const mood = payload[0].value;
      return (
        <div className="bg-card p-3 rounded-lg shadow-card border">
          <p className="font-medium">{label}</p>
          <p className="text-primary">
            Mood: {getMoodEmoji(mood)} {mood ? mood.toFixed(1) : 'No data'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-xl">📊</span>
          Your Mood Trends (7 Days)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moodData}>
              <XAxis dataKey="date" />
              <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>😢</span> Very Sad (1)
          </div>
          <div className="flex items-center gap-1">
            <span>😟</span> Sad (2)
          </div>
          <div className="flex items-center gap-1">
            <span>😐</span> Neutral (3)
          </div>
          <div className="flex items-center gap-1">
            <span>😊</span> Happy (4)
          </div>
          <div className="flex items-center gap-1">
            <span>😄</span> Very Happy (5)
          </div>
        </div>
      </CardContent>
    </Card>
  );
};