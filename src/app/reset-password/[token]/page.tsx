import { checkIfTokenExists } from '@/app/api/utils/checkIfTokenExists';
import PageLayout from './PageLayout';

const ResetPasswordWithTokenPage = async ({
  params
}: {
  params: { token: string };
}) => {
  if (!(await checkIfTokenExists(params.token))) {
    return <p>Lol Ci w zęby</p>;
  } else {
    console.log('nie ma tokena haha');
  }
  return <PageLayout token={params.token} />;
};

export default ResetPasswordWithTokenPage;
