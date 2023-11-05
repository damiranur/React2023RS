import React from "react";
import { PageLink } from "../PageLink/PageLink";
import classes from "./Pagination.module.css";
import { IPlanetData } from "../../types";

interface IPageLinkProps {
  currentPage: number;
  lastPage: number;
  setCurrentPage: (currentPage: number) => void;
  changeData: (planets: IPlanetData[]) => void;
  changeLoading: (loading: boolean) => void;
}

export const Pagination: React.FC<IPageLinkProps> = ({
  currentPage,
  lastPage,
  setCurrentPage,
  changeData,
  changeLoading,
}) => {
  const pageNumbers = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <nav className={classes.pagination} aria-label="Pagination">
      <PageLink
        disabled={currentPage === 1}
        pageNum={currentPage - 1}
        changeData={changeData}
        setCurrentPage={setCurrentPage}
        changeLoading={changeLoading}
      >
        Previous
      </PageLink>
      {pageNumbers.map((pageNum, idx) => (
        <PageLink
          key={idx}
          active={pageNum === currentPage}
          pageNum={pageNum}
          changeData={changeData}
          setCurrentPage={setCurrentPage}
          changeLoading={changeLoading}
        >
          {pageNum}
        </PageLink>
      ))}
      <PageLink
        disabled={currentPage === lastPage}
        pageNum={currentPage + 1}
        changeData={changeData}
        setCurrentPage={setCurrentPage}
        changeLoading={changeLoading}
      >
        Next
      </PageLink>
    </nav>
  );
};
