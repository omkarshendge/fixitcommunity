
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Filter, Search, CheckCircle2, Clock, AlertTriangle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import ReportCard from '@/components/ReportCard';
import { REPORT_STATUS } from '@/models/report';

const MyReports = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data - in a real app, this would come from your API
  const myReports = [
    {
      id: '1',
      title: 'Large pothole on Main Street',
      description: 'There is a large pothole near the intersection of Main Street and Oak Avenue. It\'s approximately 2 feet wide and has already damaged multiple vehicles.',
      location: '123 Main Street',
      imageUrl: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      createdAt: '2 days ago',
      status: REPORT_STATUS.IN_PROGRESS,
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
      status: REPORT_STATUS.PENDING,
      upvotes: 8,
      comments: 2,
      username: 'jane_smith'
    },
    {
      id: '3',
      title: 'Damaged sidewalk',
      description: 'Several concrete slabs on the sidewalk along Market Street between 5th and 6th Avenues are severely cracked and uneven, creating a tripping hazard for pedestrians.',
      location: 'Market St between 5th & 6th Ave',
      imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      createdAt: '1 week ago',
      status: REPORT_STATUS.RESOLVED,
      upvotes: 23,
      comments: 7,
      username: 'john_doe'
    },
    {
      id: '4',
      title: 'Overflowing trash bin',
      description: 'The public trash bin at Central Park entrance has been overflowing for several days. It\'s attracting pests and creating unsanitary conditions.',
      location: 'Central Park Main Entrance',
      imageUrl: 'https://images.unsplash.com/photo-1605600659853-4246158333a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      createdAt: '5 days ago',
      status: REPORT_STATUS.REJECTED,
      upvotes: 5,
      comments: 1,
      username: 'john_doe'
    }
  ];

  const filteredReports = (status) => {
    let filtered = myReports;
    
    // Filter by status if provided
    if (status && status !== 'all') {
      filtered = filtered.filter(report => report.status === status);
    }
    
    // Filter by search query if provided
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        report => 
          report.title.toLowerCase().includes(query) || 
          report.description.toLowerCase().includes(query) || 
          report.location.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Reports</h1>
            <p className="text-muted-foreground mt-1">
              Track the status of your submitted reports
            </p>
          </div>
          
          <Link to="/report" className="mt-4 md:mt-0">
            <Button className="button-hover">
              <Plus size={16} className="mr-2" />
              New Report
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              className="pl-9 input-focus"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-10 flex gap-2">
            <Filter size={16} />
            <span>Filter</span>
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="all" className="flex gap-2">
              All
              <Badge variant="secondary" className="ml-1">
                {myReports.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex gap-2">
              <AlertTriangle size={14} />
              <span className="hidden sm:inline">Pending</span>
              <Badge variant="secondary" className="ml-1">
                {myReports.filter(r => r.status === REPORT_STATUS.PENDING).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="flex gap-2">
              <Clock size={14} />
              <span className="hidden sm:inline">In Progress</span>
              <Badge variant="secondary" className="ml-1">
                {myReports.filter(r => r.status === REPORT_STATUS.IN_PROGRESS).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="resolved" className="flex gap-2">
              <CheckCircle2 size={14} />
              <span className="hidden sm:inline">Resolved</span>
              <Badge variant="secondary" className="ml-1">
                {myReports.filter(r => r.status === REPORT_STATUS.RESOLVED).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex gap-2">
              <XCircle size={14} />
              <span className="hidden sm:inline">Rejected</span>
              <Badge variant="secondary" className="ml-1">
                {myReports.filter(r => r.status === REPORT_STATUS.REJECTED).length}
              </Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports().map((report) => (
                <ReportCard key={report.id} {...report} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports(REPORT_STATUS.PENDING).map((report) => (
                <ReportCard key={report.id} {...report} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="in-progress" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports(REPORT_STATUS.IN_PROGRESS).map((report) => (
                <ReportCard key={report.id} {...report} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="resolved" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports(REPORT_STATUS.RESOLVED).map((report) => (
                <ReportCard key={report.id} {...report} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="rejected" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports(REPORT_STATUS.REJECTED).map((report) => (
                <ReportCard key={report.id} {...report} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MyReports;
