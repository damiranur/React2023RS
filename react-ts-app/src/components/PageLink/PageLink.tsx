import React, { HTMLProps, useContext } from "react";
import cn from "classnames";
import "./PageLink.css";
import { fetchSearchPlanet } from "../../apis/PlanetsApi";
import { useSearchParams } from "react-router-dom";
import { MyContext, CurrentPageContext } from "../../context/context";

interface IPageLinkProps extends HTMLProps<HTMLAnchorElement> {
  active?: boolean;
  pageNum: number;
}

export const PageLink: React.FC<IPageLinkProps> = ({
  className,
  children,
  active,
  disabled,
  pageNum,
  ...props
}) => {
  const myContext = useContext(MyContext);
  const currentPageContext = useContext(CurrentPageContext);
  const customClassName = cn("page-link", className, { active, disabled });
  const [, setSearchParams] = useSearchParams();

  if (disabled) {
    return <span className={customClassName}>{children}</span>;
  }
  const handleSetCurrentPage = () => {
    myContext?.setMyState((prev) => ({ ...prev, loading: true }));
    fetchSearchPlanet("", pageNum).then((data) => {
      myContext?.setMyState((prev) => ({ ...prev, data: data.results }));
      myContext?.setMyState((prev) => ({ ...prev, loading: false }));
      myContext?.setMyState((prev) => ({ ...prev, planetsPerPage: pageNum }));
      currentPageContext?.setCurrentPage(Number(pageNum));
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
