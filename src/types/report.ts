
// Define report status enum
export enum ReportStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  RESOLVED = 'resolved',
  REJECTED = 'rejected'
}

// Define the report type interface
export interface Report {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  images?: string[];
  comments?: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  userName: string;
  createdAt: string;
}

// For backward compatibility
export const REPORT_STATUS = ReportStatus;
