import { useState } from 'react';
import { uploadImage } from '@/lib/firebase';

interface AdminIssuePanelProps {
  issue: any;
  onResolve: (issueId: string, resolutionImage: string) => void;
}

const AdminIssuePanel = ({ issue, onResolve }: AdminIssuePanelProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleResolve = async () => {
    if (image) {
      setUploading(true);
      const imageUrl = await uploadImage(image, `resolutions/${Date.now()}_${image.name}`);
      onResolve(issue.id, imageUrl);
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-bold">{issue.title}</h3>
      <p>{issue.description}</p>
      {issue.imageUrl && <img src={issue.imageUrl} alt="Issue" className="max-w-full h-auto" />}
      <div className="mt-4">
        <h4 className="font-bold">Resolve Issue</h4>
        <input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
        <button onClick={handleResolve} disabled={!image || uploading} className="bg-blue-500 text-white p-2 rounded mt-2">
          {uploading ? 'Uploading...' : 'Upload Resolution Image'}
        </button>
      </div>
    </div>
  );
};

export default AdminIssuePanel;
