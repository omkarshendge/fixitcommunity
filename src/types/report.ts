
export type ReportStatus = 'pending' | 'in-progress' | 'resolved' | 'rejected';

export interface Report {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  createdAt: string;
  status: ReportStatus;
  upvotes: number;
  comments: number;
  username: string;
}
