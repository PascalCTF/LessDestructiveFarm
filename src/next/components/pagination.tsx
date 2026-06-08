import { useSearchParams } from 'next/navigation';
import Router from 'next/router';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  currentPage: number;
  totalPages: number;
}

//Must be even
const MAX_PAGE_TO_SHOW = 5;

const Pagination = ({ currentPage, totalPages }: Props) => {
  const query = useSearchParams();
  const [currentPageText, setCurrentPageText] = useState(currentPage.toString());

  useEffect(() => {
    setCurrentPageText(currentPage.toString());
  }, [currentPage]);

  const onPageSelected = useCallback(
    (n: number) => {
      const current = new URLSearchParams(Array.from(query.entries())); // -> has to use this form

      current.set('page', n.toString());

      Router.push(`/?${current.toString()}`);
    },
    [query]
  );

  const onCurrentPageKeyDown = useCallback(
    (event: any) => {
      if (event.key !== 'Enter') return;
      onPageSelected(parseInt(currentPageText, 10));
    },
    [currentPageText, onPageSelected]
  );

  const half = Math.ceil(MAX_PAGE_TO_SHOW / 2);
  const firstShown = Math.max(1, currentPage - half);
  const lastShown = Math.min(totalPages, currentPage + half);

  const pageButtons = [];

  if (firstShown > 1)
    pageButtons.push(
      <li className="page-item" key={1}>
        <div className="page-link" onClick={() => onPageSelected(1)}>
          «
        </div>
      </li>
    );

  for (let i = firstShown; i < lastShown + 1; i++) {
    let classes = 'page-item';
    if (i == currentPage) {
      pageButtons.push(
        <li className="page-item active" key={i}>
          <div className="page-link pagination-current-page-container">
            <input
              type="text"
              className="pagination-current-page-input"
              onChange={e => setCurrentPageText(e.target.value)}
              onKeyDown={onCurrentPageKeyDown}
              value={currentPageText}
            />
          </div>
        </li>
      );
    } else {
      pageButtons.push(
        <li className={classes} key={i}>
          <div className="page-link" onClick={() => onPageSelected(i)}>
            {i}
          </div>
        </li>
      );
    }
  }

  if (lastShown < totalPages)
    pageButtons.push(
      <li className="page-item" key={totalPages}>
        <div className="page-link" onClick={() => onPageSelected(totalPages)}>
          »
        </div>
      </li>
    );

  return <ul className="pagination pagination-sm">{pageButtons}</ul>;
};

export default Pagination;
