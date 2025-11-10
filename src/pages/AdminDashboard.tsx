import { useState, useEffect } from 'react';
import AdminIssuePanel from '@/components/AdminIssuePanel';
import { getIssues, resolveIssue } from '@/lib/issues';

const AdminDashboard = () => {
  const [issues, setIssues] = useState<any[]>([]);

  useEffect(() => {
    const fetchIssues = async () => {
      const issues = await getIssues();
      setIssues(issues);
    };

    fetchIssues();
  }, []);

  const handleResolve = async (issueId: string, resolutionImage: string) => {
    await resolveIssue(issueId, resolutionImage);
    setIssues(issues.map(issue => 
      issue.id === issueId ? { ...issue, resolved: true, resolutionImage } : issue
    ));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="space-y-4">
        {issues.map(issue => (
          <AdminIssuePanel key={issue.id} issue={issue} onResolve={handleResolve} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
