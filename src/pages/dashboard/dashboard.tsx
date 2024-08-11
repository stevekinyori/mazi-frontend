
import { useTitle } from '../../helpers';
import DeviceList from '../../components/tables/DeviceList';
import SummaryDashboard from '../../components/summary/summary';

export default function Farmers() {
  useTitle('DashBoard');
  return (
    <div>
      <SummaryDashboard />
      <div className="my-s-2 rounded-md bg-white p-4">
        <DeviceList />
      </div>
    </div>
  );
}
