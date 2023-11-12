import React, { useContext } from "react";
import { PageLink } from "../PageLink/PageLink";
import classes from "./Pagination.module.css";
import { CurrentPageContext } from "../../context/context";

interface IPageLinkProps {
  lastPage: number;
}

export const Pagination: React.FC<IPageLinkProps> = ({ lastPage }) => {
  const currentPageContext = useContext(CurrentPageContext);
  const pageNumbers = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <nav className={classes.pagination} aria-label="Pagination">
      <PageLink
        disabled={currentPageContext?.currentPage === 1}
        pageNum={currentPageContext?.currentPage || 1 - 1}
      >
        Previous
      </PageLink>
      {pageNumbers.map((pageNum, idx) => (
        <PageLink
          key={idx}
          active={pageNum === currentPageContext?.currentPage}
          pageNum={pageNum}
        >
          {pageNum}
        </PageLink>
      ))}
      <PageLink
        disabled={currentPageContext?.currentPage === lastPage}
        pageNum={currentPageContext?.currentPage || 1 + 1}
      >
        Next
      </PageLink>
    </nav>
  );
};
