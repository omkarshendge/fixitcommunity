
// Define report status constants as a simple JavaScript object
export const REPORT_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  RESOLVED: 'resolved',
  REJECTED: 'rejected'
};

// Define a named export for ReportStatus to maintain backward compatibility with imports
export const ReportStatus = REPORT_STATUS;
