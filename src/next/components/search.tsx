import { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { SearchParams, SearchValues } from '../lib/types';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import Router from 'next/router';

interface Props {
  searchParams: SearchParams;
  searchValues: SearchValues;
  onReset: () => any;
}

interface State {
  sploit: string;
  team: string;
  status: string;
  flag: string;
  since?: Date;
  until?: Date;
  checksystemResponse: string;
}

const Search = ({ searchParams, searchValues, onReset }: Props) => {
  const query = useSearchParams();

  const [sploit, setSploit] = useState(searchParams.sploit || '');
  const [team, setTeam] = useState(searchParams.team || '');
  const [status, setStatus] = useState(searchParams.status || '');
  const [flag, setFlag] = useState(searchParams.flag || '');
  const [since, setSince] = useState(searchParams.since && new Date(searchParams.since));
  const [until, setUntil] = useState(searchParams.until && new Date(searchParams.until));
  const [checksystemResponse, setChecksystemResponse] = useState(
    searchParams.checksystem_response || ''
  );

  useEffect(() => {
    setSploit(searchParams.sploit || '');
    setTeam(searchParams.team || '');
    setStatus(searchParams.status || '');
    setFlag(searchParams.flag || '');
    setSince(searchParams.since && new Date(searchParams.since));
    setUntil(searchParams.until && new Date(searchParams.until));
    setChecksystemResponse(searchParams.checksystem_response || '');
  }, [searchParams]);

  const onResetClick = useCallback(() => {
    setSploit('');
    setTeam('');
    setStatus('');
    setFlag('');
    setSince(undefined);
    setUntil(undefined);
    setChecksystemResponse('');

    onReset();
  }, [onReset]);

  const onSearchClick = useCallback(() => {
    const current = new URLSearchParams(Array.from(query.entries())); // -> has to use this form

    if (sploit) {
      current.set('sploit', sploit);
    } else {
      current.delete('sploit');
    }

    if (team) {
      current.set('team', team);
    } else {
      current.delete('team');
    }

    if (status) {
      current.set('status', status);
    } else {
      current.delete('status');
    }

    if (flag) {
      current.set('flag', flag);
    } else {
      current.delete('flag');
    }

    if (since) {
      current.set('since', format(new Date(since), 'yyyy-MM-dd HH:mm'));
    } else {
      current.delete('since');
    }

    if (until) {
      current.set('until', format(new Date(until), 'yyyy-MM-dd HH:mm'));
    } else {
      current.delete('until');
    }

    if (checksystemResponse) {
      current.set('checksystem_response', checksystemResponse);
    } else {
      current.delete('checksystem_response');
    }

    Router.push(`/?${current.toString()}`);
  }, [sploit, team, status, flag, since, until, checksystemResponse, query]);

  return (
    <div className="col-lg-8">
      <div className="card border-light">
        <div className="card-body">
          <h4 className="card-title">Show Flags</h4>
          <div className="row mb-2">
            <div className="col-md-4">
              <label>Sploit</label>
              <select
                className="form-control form-control-sm"
                onChange={e => setSploit(e.target.value)}
                value={sploit}
              >
                <option value="">All</option>
                {searchValues.sploits.map((value, i) => {
                  return (
                    <option key={i} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-md-4">
              <label>Team</label>
              <select
                className="form-control form-control-sm"
                onChange={e => setTeam(e.target.value)}
                value={team}
              >
                <option value="">All</option>
                {searchValues.teams.map((value, i) => {
                  return (
                    <option key={i} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-md-4">
              <label>Flag</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={flag}
                id="flag"
                onChange={e => setFlag(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3">
              <label>Since</label>
              <div>
                <DatePicker
                  className="form-control form-control-sm"
                  selected={since}
                  onChange={date => setSince(date)}
                  timeInputLabel="Time:"
                  dateFormat="yyyy-MM-dd HH:mm"
                  showTimeInput={true}
                  shouldCloseOnSelect={false}
                />
              </div>
            </div>
            <div className="col-md-3">
              <label>Until</label>
              <div>
                <DatePicker
                  className="form-control form-control-sm"
                  selected={until}
                  onChange={date => setUntil(date)}
                  timeInputLabel="Time:"
                  dateFormat="yyyy-MM-dd HH:mm"
                  showTimeInput={true}
                  shouldCloseOnSelect={false}
                />
              </div>
            </div>
            <div className="col-md-2">
              <label>Status</label>
              <select
                className="form-control form-control-sm"
                onChange={e => setStatus(e.target.value)}
                value={status}
              >
                <option value="">All</option>
                {searchValues.statuses.map((value, i) => {
                  return (
                    <option key={i} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-md-4">
              <label>Checksystem response</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={checksystemResponse}
                id="checksystemResponse"
                onChange={e => setChecksystemResponse(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button className="btn btn-primary btn-sm submit-btn" onClick={onSearchClick}>
                Search
              </button>
              &nbsp;
              <button className="btn btn-primary btn-sm submit-btn" onClick={onResetClick}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
