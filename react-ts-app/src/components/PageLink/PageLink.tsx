import React, { HTMLProps } from "react";
import cn from "classnames";
import "./PageLink.css";
import { fetchSearchPlanet } from "../../apis/PlanetsApi";
import { IPlanetData } from "../../types";
import { useSearchParams } from "react-router-dom";

interface IPageLinkProps extends HTMLProps<HTMLAnchorElement> {
  active?: boolean;
  pageNum: number;
  changeData: (planets: IPlanetData[]) => void;
  setCurrentPage: (currentPage: number) => void;
  changeLoading: (loading: boolean) => void;
}

export const PageLink: React.FC<IPageLinkProps> = ({
  className,
  children,
  active,
  disabled,
  pageNum,
  setCurrentPage,
  changeData,
  changeLoading,
  ...props
}) => {
  const customClassName = cn("page-link", className, { active, disabled });
  const [, setSearchParams] = useSearchParams();

  if (disabled) {
    return <span className={customClassName}>{children}</span>;
  }
  const handleSetCurrentPage = () => {
    changeLoading(true);
    fetchSearchPlanet("", pageNum).then((data) => {
      changeData(data.results);
      setCurrentPage(pageNum);
      setSearchParams((prev) => ({ ...prev, pageNumber: pageNum.toString() }));
    });
  };

  return (
    <a
      {...props}
      className={customClassName}
      aria-current={active ? "page" : undefined}
      onClick={handleSetCurrentPage}
    >
      {children}
    </a>
  );
};
