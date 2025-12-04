import Home from "../pages/HomePage/Home";
import BurgersPage from "../pages/BurgersPage/BurgersPage";
import DrinksPage from "../pages/DrinksPage/DrinksPage";
import CombosPage from "../pages/CombosPage/CombosPage";
import DetailPage from "../pages/DetailPage/Detail";

import {
  HOME_PAGE,
  BURGERS_PAGE,
  DRINKS_PAGE,
  COMBOS_PAGE,
  DETAIL_PAGE,
} from "./consts";

export const routes = [
  {
    path: HOME_PAGE,
    element: Home,
  },
  {
    path: BURGERS_PAGE,
    element: BurgersPage,
  },
  {
    path: DRINKS_PAGE,
    element: DrinksPage,
  },
  {
    path: COMBOS_PAGE,
    element: CombosPage,
  },
  {
    path: DETAIL_PAGE,
    element: DetailPage,
  },
];
