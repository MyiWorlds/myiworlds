import { GetCircleByIdComponent } from '../../generated/apolloComponents';
import { useRouter } from 'next/router';

export default function Post(props: any) {
  const router = useRouter();

  return (
    <div>
      {console.log(router.query.id)}
      <h1 />
      <p>This is the blog post content.</p>
      <GetCircleByIdComponent variables={{ id: '0v0Ua9nf1eUVyAGceDSy' }}>
        {({ loading, error, data }) => {
          return (
            <div>
              {console.log('TEST', loading, error, data)}
              {data.getCircleById.id}
            </div>
          );
        }}
      </GetCircleByIdComponent>
    </div>
  );
}
