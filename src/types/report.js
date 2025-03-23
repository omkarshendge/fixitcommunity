
// Define report status enum as a simple JavaScript object
export const ReportStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  RESOLVED: 'resolved',
  REJECTED: 'rejected'
};

// For backward compatibility
export const REPORT_STATUS = ReportStatus;
