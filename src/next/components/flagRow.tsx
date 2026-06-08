import { format } from 'date-fns';
import FlagModel from '../../lib/models/flag';
import { InferAttributes } from 'sequelize';

const FlagRow = ({ flag }: { flag: InferAttributes<FlagModel> }) => {
  return (
    <tr>
      <th scope="row">{flag.sploit}</th>
      <td>{flag.team}</td>
      <td>{flag.flag}</td>
      <td>{format(new Date(flag.timestamp), 'yyyy-MM-dd HH:mm:ss')}</td>
      <td>{flag.status}</td>
      <td>{flag.checksystem_response}</td>
    </tr>
  );
};

export default FlagRow;
