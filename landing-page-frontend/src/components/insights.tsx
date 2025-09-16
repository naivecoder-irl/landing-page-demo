import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Smartphone, Globe, Heart, Rocket } from "lucide-react";

// TODO insights(articles) should be fetched from Strapi CMS
const insights = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built for speed and performance. Your users will love the experience.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description:
      "Enterprise-grade security features built into every component.",
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
    description:
      "Clean, maintainable code that developers actually enjoy working with.",
  },
  {
    icon: Rocket,
    title: "Ship Faster",
    description:
      "Pre-built components and templates to accelerate your development.",
  },
];

export default function Insights() {
  return (
    <section id="insights" className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <h2 className="hidden text-3xl tracking-tight md:block md:text-4xl">
            More Insights
          </h2>
        </div>

        {/* Insights Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight) => {
            const IconComponent = insight.icon;
            return (
              <Card key={insight.title} className="border-2 shadow-none">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{insight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{insight.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
