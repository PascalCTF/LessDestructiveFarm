import Router from 'next/router';
import { useCallback } from 'react';
import FlagCounter from '../next/components/flagCounter';
import FlagsTable from '../next/components/flagsTable';
import ManualSubmission from '../next/components/manualSubmission';
import Pagination from '../next/components/pagination';
import Search from '../next/components/search';
import { queries } from '../next/lib/graphql';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@apollo/client/react';

const FLAGS_PER_PAGE = 30;

const Index = () => {
  const query = useSearchParams();

  const currentPage = parseInt(query.get('page') ?? '1', 10);
  const offset = (currentPage - 1) * FLAGS_PER_PAGE;
  const sploit = query.get('sploit') ?? undefined;
  const team = query.get('team') ?? undefined;
  const status = query.get('status') ?? undefined;
  const flag = query.get('flag') ?? undefined;
  const since = query.get('since') ?? undefined;
  const until = query.get('until') ?? undefined;
  const checksystem_response = query.get('checksystem_response') ?? undefined;

  const { loading, error, data, refetch } = useQuery(queries.GET_ALL_DATA, {
    variables: {
      offset,
      limit: FLAGS_PER_PAGE,
      sploit,
      team,
      status,
      flag,
      since: new Date(since),
      until: new Date(until),
      checksystem_response
    }
  });

  const refreshData = useCallback(() => {
    refetch();
  }, [refetch]);

  const resetSearch = useCallback(() => {
    Router.push('/');
  }, []);

  const totalFlags = parseInt(data?.getFlagCount, 10);
  const pages = Math.ceil(totalFlags / FLAGS_PER_PAGE);

  return (
    <>
      <div className="container mt-4">
        <div className="row mb-4">
          <Search
            searchParams={{
              sploit,
              team,
              status,
              flag,
              since,
              until,
              checksystem_response
            }}
            searchValues={
              data?.getSearchValues ?? {
                sploits: [],
                teams: [],
                statuses: []
              }
            }
            onReset={() => resetSearch()}
          />

          <ManualSubmission
            gameInfo={data?.getGameInfo ?? { flagFormat: '' }}
            onSubmit={refreshData}
          />
        </div>
        <div className="search-results">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error : {error.message}</p>
          ) : (
            <>
              <FlagCounter flagCount={totalFlags} />
              <Pagination totalPages={pages} currentPage={currentPage} />
              <FlagsTable flags={data.getFlags} />
              <Pagination totalPages={pages} currentPage={currentPage} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
