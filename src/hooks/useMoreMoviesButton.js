import { useCallback } from "react";
import { useEffect, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";

let arrayForHoldingMovies = [];
let slicedMovies = [];

export default function useMoreMoviesButton(moviesArray) {
  const { width } = useWindowSize();

  const [moviesToShow, setMoviesToShow] = useState([]);
  const [next, setNext] = useState();
  const [moviesPerPage, setMoviesPerPage] = useState();

  const loopWithSlice = useCallback((start, end) => {
    const slice = moviesArray.slice(start, end);
    slicedMovies = [...slice];
    arrayForHoldingMovies = [...arrayForHoldingMovies, ...slicedMovies];
    setMoviesToShow(arrayForHoldingMovies);
  }, [moviesArray]);

  const moviesToShowAmong = useCallback(() => {
    if (width > 1200) {
      setMoviesPerPage(4);
      setNext(4);
    } else if (width <= 1200 && width >= 1118) {
      setMoviesPerPage(3);
      setNext(3);
    } else if (width <= 1117 && width >= 691) {
      setMoviesPerPage(2);
      setNext(2);
    } else {
      setMoviesPerPage(5);
      setNext(5);
    }
  }, [width]);

  useEffect(() => {
    moviesToShowAmong();
    arrayForHoldingMovies = [];
    loopWithSlice(0, moviesPerPage);
  }, [loopWithSlice, moviesPerPage, moviesToShowAmong]);

  const handleShowMoreMovies = () => {
    loopWithSlice(next, next + moviesPerPage);
    setNext(next + moviesPerPage);
  };
  return { handleShowMoreMovies, slicedMovies, moviesToShow, moviesPerPage };
}
