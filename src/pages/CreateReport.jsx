
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ListChecks } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import ReportForm from '@/components/ReportForm';
import { useToast } from '@/components/ui/use-toast';

const CreateReport = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (data) => {
    setIsSubmitting(true);
    
    // Simulate API call to submit the report
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Report Submitted Successfully",
        description: "Your report has been sent to the relevant authorities.",
      });
      
      navigate('/my-reports');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8 animate-fade-in">
        <div className="mb-10">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Report an Issue</h1>
              <p className="text-muted-foreground mt-1">
                Help improve your community by reporting infrastructure problems
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center text-muted-foreground text-sm bg-accent/50 px-3 py-1.5 rounded-full">
              <ListChecks size={16} className="mr-2" />
              <span>All reports are verified by local authorities</span>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-xl shadow-sm p-6 md:p-8">
            <ReportForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateReport;
