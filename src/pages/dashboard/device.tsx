
import { useTitle } from '../../helpers';
import DeviceListById from '../../components/tables/deviceTable';
import { useParams } from 'react-router-dom';

export default function SingleDevice() {
  useTitle('Device Dashboard');
  const { deviceId } = useParams<{ deviceId: string }>();
  return (
    <div>
      <div className="my-s-2 rounded-md bg-white p-4">
        <DeviceListById  deviceId={deviceId}/>
      </div>
    </div>
  );
}
