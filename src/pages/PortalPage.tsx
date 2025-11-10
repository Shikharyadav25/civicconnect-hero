import PortalContent from '@/components/PortalContent';
import { uploadImage } from '@/lib/firebase';
import { createIssue } from '@/lib/issues';
import { useAuth } from '@/contexts/AuthContext';

const PortalPage = () => {
  const { user } = useAuth();

  const handleReportSubmit = async (issueData: any) => {
    if (!user) {
      throw new Error("You must be logged in to report an issue.");
    }

    let imageUrl = '';
    if (issueData.image) {
      imageUrl = await uploadImage(issueData.image, `issues/${Date.now()}_${issueData.image.name}`);
    }

    const issueToCreate = {
      ...issueData,
      imageUrl,
      reportedBy: user.uid,
      createdAt: new Date(),
      resolved: false,
    };

    // The image file should not be saved in the database
    delete issueToCreate.image;

    await createIssue(issueToCreate);
  };

  return <PortalContent onSubmit={handleReportSubmit} />;
};

export default PortalPage;
