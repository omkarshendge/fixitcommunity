
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  ArrowRight,
  Users,
  BarChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import StatisticCard from '@/components/StatisticCard';
import ReportCard from '@/components/ReportCard';

const Index = () => {
  // Sample data - in a real app, this would come from your API
  const stats = [
    { title: 'Total Reports', value: 487, trend: { value: 12, isPositive: true }, icon: BarChart },
    { title: 'Issues Resolved', value: 342, trend: { value: 8, isPositive: true }, icon: CheckCircle },
    { title: 'In Progress', value: 98, trend: { value: 5, isPositive: true }, icon: Clock },
    { title: 'Pending Review', value: 47, trend: { value: 3, isPositive: false }, icon: AlertTriangle }
  ];
  
  const recentReports = [
    {
      id: '1',
      title: 'Large pothole on Main Street',
      description: 'There is a large pothole near the intersection of Main Street and Oak Avenue. It\'s approximately 2 feet wide and has already damaged multiple vehicles.',
      location: '123 Main Street',
      imageUrl: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      createdAt: '2 days ago',
      status: 'in-progress',
      upvotes: 15,
      comments: 4,
      username: 'john_doe'
    },
    {
      id: '2',
      title: 'Broken street light',
      description: 'The street light at the corner of Pine Street and 3rd Avenue has been flickering for weeks and now has completely stopped working. This creates a safety hazard at night.',
      location: 'Corner of Pine St & 3rd Ave',
      imageUrl: 'https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      createdAt: '4 days ago',
      status: 'pending',
      upvotes: 8,
      comments: 2,
      username: 'jane_smith'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8 animate-fade-in">
        <section className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Monitor infrastructure issues and government responses in your area
              </p>
            </div>
            
            <Link to="/report">
              <Button className="button-hover">
                Report New Issue
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <StatisticCard
                key={index}
                icon={stat.icon}
                title={stat.title}
                value={stat.value}
                trend={stat.trend}
              />
            ))}
          </div>
        </section>
        
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Recent Reports</h2>
            <Link to="/community">
              <Button variant="ghost" className="flex items-center">
                View All
                <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentReports.map((report) => (
              <ReportCard
                key={report.id}
                {...report}
              />
            ))}
          </div>
        </section>
        
        <section>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                  <div className="inline-block p-2 bg-primary/10 text-primary rounded-full mb-3">
                    <Users size={24} />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Community Impact</h2>
                  <p className="text-muted-foreground max-w-xl">
                    Join 10,000+ citizens who have reported issues and helped improve infrastructure in their communities.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/community">
                    <Button variant="outline" className="button-hover">
                      View Community
                    </Button>
                  </Link>
                  <Link to="/report">
                    <Button className="button-hover">
                      Make a Difference
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Index;
