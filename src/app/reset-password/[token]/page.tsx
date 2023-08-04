import { checkIfTokenExists } from '@/app/api/utils/checkIfTokenExists';
import PageLayout from './PageLayout';

const ResetPasswordWithTokenPage = async ({
  params
}: {
  params: { token: string };
}) => {
  if (!(await checkIfTokenExists(params.token))) {
    return <p>Lol Ci w zęby</p>;
  }

  return <PageLayout token={params.token} />;
};

export default ResetPasswordWithTokenPage;
