
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Zap, DollarSign } from "lucide-react";

export const StatsSection = () => {
  const stats = [
    {
      title: "Total Volume",
      value: "2,847 SUI",
      icon: DollarSign,
      change: "+12.5%",
      changeColor: "text-green-400"
    },
    {
      title: "Active Holders",
      value: "1,234",
      icon: Users,
      change: "+8.2%",
      changeColor: "text-green-400"
    },
    {
      title: "Floor Price",
      value: "0.08 SUI",
      icon: TrendingUp,
      change: "+5.1%",
      changeColor: "text-green-400"
    },
    {
      title: "Avg. Transaction",
      value: "< 1s",
      icon: Zap,
      change: "Fast",
      changeColor: "text-blue-400"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-700 hover:bg-gray-800/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className={`text-sm ${stat.changeColor}`}>{stat.change}</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
