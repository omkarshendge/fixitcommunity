
import React, { useState } from 'react';
import { MapPin, Clock, User, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { REPORT_STATUS } from '@/types/report';

const ReportCard = ({
  id,
  title,
  description,
  location,
  imageUrl,
  createdAt,
  status,
  upvotes,
  comments,
  username,
  onUpvote,
  showActions = true
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
    'resolved': 'bg-green-100 text-green-800 border-green-200',
    'rejected': 'bg-red-100 text-red-800 border-red-200'
  };

  const statusLabel = {
    'pending': 'Pending Review',
    'in-progress': 'In Progress',
    'resolved': 'Resolved',
    'rejected': 'Rejected'
  };

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div className="neo-card overflow-hidden transition-all duration-300 hover:shadow-neo-md">
      <div className={cn(
        "relative w-full h-48 bg-muted/30 overflow-hidden",
        !isImageLoaded && "animate-pulse"
      )}>
        <img
          src={imageUrl}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isImageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsImageLoaded(true)}
        />
        
        <div className="absolute top-3 right-3">
          <Badge className={cn("px-2.5 py-1 font-medium border", statusColors[status])}>
            {statusLabel[status]}
          </Badge>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleExpanded} 
            className="h-8 w-8 p-0"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        <div className="mt-2 space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin size={14} className="mr-1.5" />
            <span className="line-clamp-1">{location}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock size={14} className="mr-1.5" />
            <span>Reported {createdAt}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <User size={14} className="mr-1.5" />
            <span>By {username}</span>
          </div>
        </div>
        
        <div className={cn(
          "mt-3 overflow-hidden transition-all duration-300",
          expanded ? "max-h-96" : "max-h-0"
        )}>
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
        
        {showActions && (
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onUpvote} 
                className="h-8 flex items-center text-muted-foreground hover:text-foreground"
              >
                <ChevronUp size={16} className="mr-1" />
                <span>{upvotes}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 flex items-center text-muted-foreground hover:text-foreground"
              >
                <MessageSquare size={14} className="mr-1" />
                <span>{comments}</span>
              </Button>
            </div>
            
            <Button variant="outline" size="sm" className="h-8">
              View Details
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportCard;
