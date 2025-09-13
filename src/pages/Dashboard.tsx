import { MoodTracker } from "@/components/MoodTracker";
import { MoodTrends } from "@/components/MoodTrends";
import { WellnessRecommendations } from "@/components/WellnessRecommendations";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-wellness bg-clip-text text-transparent mb-2">
            Wellness Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your mental health journey with daily check-ins and insights
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <MoodTracker />
            <WellnessRecommendations />
          </div>
          
          <div>
            <MoodTrends />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;