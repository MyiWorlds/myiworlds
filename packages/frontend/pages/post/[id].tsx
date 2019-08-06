import Test from './../../components/test';
import { GetCircleByIdComponent } from '../../generated/apolloComponents';
import { useRouter } from 'next/router';

export default function Post(props: any) {
  const router = useRouter();

  return (
    <div>
      {console.log(router.query.id)}
      <h1 />
      <GetCircleByIdComponent variables={{ id: '0v0Ua9nf1eUVyAGceDSy' }}>
        {({ loading, error, data }) => {
          if (loading || error) return <div>nothing yet</div>;
          return (
            <div>
              {console.log('Query Response: ', loading, error, data)}
              {data.getCircleById.id}
              <Test title={data.getCircleById.id} />
            </div>
          );
        }}
      </GetCircleByIdComponent>
    </div>
  );
}
