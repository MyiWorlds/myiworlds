import { useGetCircleByIdQuery } from '../../generated/apolloComponents';
import { useRouter } from 'next/router';

const Post = () => {
  const router = useRouter();
  const { data, loading, error } = useGetCircleByIdQuery({
    variables: { id: '0v0Ua9nf1eUVyAGceDSy' },
  });
  console.log(router.query.id);

  if (loading || error || !data || !data.getCircleById)
    return <div>nothing yet</div>;

  return (
    <div>
      test
      {console.log('Query Response: ', loading, error, data)}
      {data.getCircleById.id}
    </div>
  );
};

export default Post;
