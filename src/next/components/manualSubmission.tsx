import { useCallback, useState } from 'react';
import { queries } from '../lib/graphql';
import { GameInfo } from '../lib/types';
import { useMutation } from '@apollo/client/react';

const ManualSubmission = ({ gameInfo, onSubmit }: { gameInfo: GameInfo; onSubmit: () => any }) => {
  const [input, setInput] = useState('');
  const [submitFlags] = useMutation(queries.POST_FLAGS);

  const onSendClick = useCallback(async () => {
    const re = new RegExp(gameInfo.flagFormat, 'g');
    const matches = Array.from(input.matchAll(re));
    if (matches.length !== 0) {
      const flags = matches.map(r => r[0]);

      submitFlags({
        variables: { flags },
        onCompleted: () => {
          setInput('');
          onSubmit();
        },
        onError: e => {
          console.log(e);
        }
      });
    }
  }, [gameInfo, onSubmit, input]);

  return (
    <div className="col-lg-4 mt-3">
      <div className="card border-light">
        <div className="card-body">
          <h4 className="card-title">Add Flags Manually</h4>
          <label>
            Text with flags
            <small className="text-muted ml-2">flag format: {gameInfo.flagFormat}</small>
          </label>
          <textarea
            className="form-control form-control-sm mb-3 text-with-flags"
            onChange={e => setInput(e.target.value)}
            value={input}
          ></textarea>
          <button className="btn btn-primary btn-sm" onClick={onSendClick}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualSubmission;
