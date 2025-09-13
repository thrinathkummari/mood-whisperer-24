import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-wellness bg-clip-text text-transparent animate-fade-in">
              MindfulMe
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your personal mental health companion. Track moods, discover insights, and nurture your wellbeing with daily check-ins and personalized recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                variant="wellness" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => navigate("/dashboard")}
              >
                Start Your Journey
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-4xl animate-float">🧘‍♀️</div>
        <div className="absolute top-32 right-16 text-3xl animate-float" style={{animationDelay: "1s"}}>💚</div>
        <div className="absolute bottom-20 left-1/4 text-2xl animate-float" style={{animationDelay: "2s"}}>🌱</div>
        <div className="absolute bottom-32 right-1/4 text-3xl animate-float" style={{animationDelay: "0.5s"}}>✨</div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need for <span className="bg-gradient-wellness bg-clip-text text-transparent">mental wellness</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="shadow-card border-0 bg-card/50 backdrop-blur-sm hover:shadow-wellness transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-3">Mood Tracking</h3>
                <p className="text-muted-foreground">
                  Daily check-ins with visual trends to understand your emotional patterns over time.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card border-0 bg-card/50 backdrop-blur-sm hover:shadow-wellness transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold mb-3">Smart Insights</h3>
                <p className="text-muted-foreground">
                  AI-powered sentiment analysis and personalized recommendations for your wellbeing.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card border-0 bg-card/50 backdrop-blur-sm hover:shadow-wellness transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-semibold mb-3">Wellness Tools</h3>
                <p className="text-muted-foreground">
                  Guided exercises, mindfulness practices, and activities tailored to your current mood.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
