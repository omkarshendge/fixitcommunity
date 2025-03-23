
import React, { useState } from 'react';
import { MapPin, Search, Filter, TrendingUp, MessageSquare, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import ReportCard from '@/components/ReportCard';
import { ReportStatus } from '@/types/report';

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');
  
  // Sample data - in a real app, this would come from your API
  const communityReports = [
    {
      id: '1',
      title: 'Large pothole on Main Street',
      description: 'There is a large pothole near the intersection of Main Street and Oak Avenue. It\'s approximately 2 feet wide and has already damaged multiple vehicles.',
      location: 'Downtown',
      imageUrl: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      createdAt: '2 days ago',
      status: 'in-progress' as ReportStatus,
      upvotes: 15,
      comments: 4,
      username: 'john_doe'
    },
    {
      id: '2',
      title: 'Broken street light',
      description: 'The street light at the corner of Pine Street and 3rd Avenue has been flickering for weeks and now has completely stopped working. This creates a safety hazard at night.',
      location: 'North District',
      imageUrl: 'https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      createdAt: '4 days ago',
      status: 'pending' as ReportStatus,
      upvotes: 8,
      comments: 2,
      username: 'jane_smith'
    },
    {
      id: '3',
      title: 'Damaged sidewalk',
      description: 'Several concrete slabs on the sidewalk along Market Street between 5th and 6th Avenues are severely cracked and uneven, creating a tripping hazard for pedestrians.',
      location: 'Downtown',
      imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      createdAt: '1 week ago',
      status: 'resolved' as ReportStatus,
      upvotes: 23,
      comments: 7,
      username: 'mark_johnson'
    },
    {
      id: '4',
      title: 'Overflowing trash bin',
      description: 'The public trash bin at Central Park entrance has been overflowing for several days. It\'s attracting pests and creating unsanitary conditions.',
      location: 'Central District',
      imageUrl: 'https://images.unsplash.com/photo-1605600659853-4246158333a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      createdAt: '5 days ago',
      status: 'rejected' as ReportStatus,
      upvotes: 5,
      comments: 1,
      username: 'sarah_wilson'
    },
    {
      id: '5',
      title: 'Fallen tree blocking bike lane',
      description: 'A large tree has fallen and is completely blocking the bike lane on Riverside Drive. Cyclists are forced to merge into car traffic, creating a dangerous situation.',
      location: 'West District',
      imageUrl: 'https://images.unsplash.com/photo-1519591222381-d3bffc4ae855?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      createdAt: '3 days ago',
      status: 'in-progress' as ReportStatus,
      upvotes: 12,
      comments: 3,
      username: 'robert_brown'
    },
    {
      id: '6',
      title: 'Water main break',
      description: 'Water is gushing from what appears to be a broken water main on Elm Street. The street is starting to flood and water pressure in nearby buildings is affected.',
      location: 'South District',
      imageUrl: 'https://images.unsplash.com/photo-1583475020831-fb4fdf366ce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      createdAt: '6 hours ago',
      status: 'pending' as ReportStatus,
      upvotes: 31,
      comments: 9,
      username: 'emily_davis'
    }
  ];

  const areas = [
    { value: 'all', label: 'All Areas' },
    { value: 'downtown', label: 'Downtown' },
    { value: 'north', label: 'North District' },
    { value: 'south', label: 'South District' },
    { value: 'east', label: 'East District' },
    { value: 'west', label: 'West District' },
    { value: 'central', label: 'Central District' }
  ];

  const filteredReports = (filter?: string) => {
    let filtered = communityReports;
    
    // Filter by area if not "all"
    if (selectedArea !== 'all') {
      const areaKeywords: Record<string, string[]> = {
        'downtown': ['downtown'],
        'north': ['north district'],
        'south': ['south district'],
        'east': ['east district'],
        'west': ['west district'],
        'central': ['central district']
      };
      
      filtered = filtered.filter(report => 
        areaKeywords[selectedArea]?.some(keyword => 
          report.location.toLowerCase().includes(keyword)
        )
      );
    }
    
    // Filter by tab selection
    if (filter === 'trending') {
      filtered = [...filtered].sort((a, b) => b.upvotes - a.upvotes);
    } else if (filter === 'recent') {
      // Already sorted by date in our sample data
    } else if (filter === 'discussed') {
      filtered = [...filtered].sort((a, b) => b.comments - a.comments);
    }
    
    // Filter by search query
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

  const handleAreaChange = (value: string) => {
    setSelectedArea(value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Community Reports</h1>
            <p className="text-muted-foreground mt-1">
              Explore infrastructure issues reported in your area
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 w-full md:w-auto">
            <Select value={selectedArea} onValueChange={handleAreaChange}>
              <SelectTrigger className="w-full md:w-[180px]">
                <MapPin size={14} className="mr-2" />
                <SelectValue placeholder="Select area" />
              </SelectTrigger>
              <SelectContent>
                {areas.map(area => (
                  <SelectItem key={area.value} value={area.value}>
                    {area.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search reports in community..."
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
        
        <Tabs defaultValue="recent" className="mb-8">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="recent" className="flex gap-2">
              <Calendar size={14} />
              <span>Recent</span>
              <Badge variant="secondary" className="ml-1">
                {communityReports.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex gap-2">
              <TrendingUp size={14} />
              <span>Trending</span>
            </TabsTrigger>
            <TabsTrigger value="discussed" className="flex gap-2">
              <MessageSquare size={14} />
              <span>Most Discussed</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports('recent').map((report) => (
                <ReportCard key={report.id} {...report} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="trending" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports('trending').map((report) => (
                <ReportCard key={report.id} {...report} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="discussed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports('discussed').map((report) => (
                <ReportCard key={report.id} {...report} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Community;
