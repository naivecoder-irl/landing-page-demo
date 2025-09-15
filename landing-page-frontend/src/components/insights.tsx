import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Smartphone, Globe, Heart, Rocket } from "lucide-react";

// TODO insights(articles) should be fetched from Strapi CMS
const insights = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for speed and performance. Your users will love the experience.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Enterprise-grade security features built into every component.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Responsive design that works perfectly on all device sizes.",
  },
  {
    icon: Globe,
    title: "Global Ready",
    description: "Internationalization support with multiple language options.",
  },
  {
    icon: Heart,
    title: "Developer Love",
    description: "Clean, maintainable code that developers actually enjoy working with.",
  },
  {
    icon: Rocket,
    title: "Ship Faster",
    description: "Pre-built components and templates to accelerate your development.",
  },
];

export default function Insights() {
  return (
    <section id="insights" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="mb-4">More Insights</Badge>
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card key={feature.title} className="border-2 shadow-none">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}