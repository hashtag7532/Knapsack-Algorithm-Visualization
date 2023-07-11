import './App.css';
import React, { useReducer, useState } from "react";
import SetupScreen from './components/SetupScreen';
import { capacityDefaults } from './models/ValueDefaults';
import SolutionController from './components/solution/SolutionController';
import Item from './models/Item';
import KnapsackAlgorithm from './models/KnapsackAlgorithm'
import { CameraIcon } from '@heroicons/react/24/solid';
import hero from './assets/hero.png';
import twitter from './assets/twitter-blue.svg';
import github from './assets/github.png';
import menu from './assets/menu.svg';
import kofi from './assets/Ko-fi_logo_RGB_Outline.png'
import kofiBlue from './assets/kofilogo_bluebg.png'
import AppContext from './AppContext';

const actionTypes = {
  calculate: 1,
  reset: 2,
}

const tipJarLink = "https://ko-fi.com/W7W4CXVBZ";

function App() {

  const initItems = [
    new Item('item 1', 4, 2),
    new Item('item 2', 3, 1),
    new Item('item 3', 5, 3),
    // new Item('item 1', 49.9, 2),
    // new Item('item 2', 3, 1),
    // new Item('item 3', 37.8, 3),
    // new Item('item 4', 21, 1),
    // new Item('item 5', 11.3, 1),
    // new Item('item 6', 4, 2),
    // new Item('item 7', 5, 5),
    // new Item('item 8', 3, 7),
    // new Item('item 9', 1, 1),
    // new Item('item 10', 15, 9),
  ];


  const initialState = {
    capacity: capacityDefaults.defaultValue,
    items: initItems,
    knapsack: null,
    showEntryForm: true,
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [showHeaderMenuItems, setShowHeaderMenuItems] = useState(false);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
    });
  }

  function reducer(state, action) {
    switch (action.type) {
      case actionTypes.calculate:
        scrollToTop();
        return {
          ...state,
          items: action.items,
          capacity: action.capacityValue,
          knapsack: new KnapsackAlgorithm(action.items, action.capacityValue),
          showEntryForm: false,
        };
      case actionTypes.reset:
        scrollToTop();
        return {
          ...state,
          showEntryForm: true,
        };
      default:
        //@todo should default do something else?
        throw new Error();
    }
  }

  function menuBtnClick() {
    setShowHeaderMenuItems(!showHeaderMenuItems)
  }

  return (
    <div>
      <div className="sm:bg-gradient-to-br sm:from-slate-50 sm:to-slate-200 bg-slate-100">
        <header>
          <nav className="bg-gradient-to-b from-navbar-from via-navbar-via to-navbar-to flex flex-wrap px-4 py-2 md:py-0 border border-navbar-border items-center justify-between w-full">
            {/* <div className="justify-self-start logo navbar-font"><a href="/">VIT</a></div> */}
            <button onClick={() => menuBtnClick()} className="navbar-toggler">
              <img className="navbar-toggler-icon" src={menu} alt="navigation menu" />
            </button>
            <div className={`w-full md:flex md:items-center md:w-auto ${showHeaderMenuItems ? "" : "hidden"}`}>
              <ul className="md:flex md:justify-between">
                {/* <li><a className="navbar-link" href="/">Home</a></li>
                <li><a className="navbar-link" href="/about/">About</a></li>
                <li><a className="navbar-link" href="/projects/">Projects</a></li>
                <li><a className="navbar-link" href="/feed.xml">RSS</a></li>
                <li><a className="navbar-tipjar" href={tipJarLink} target="_blank" rel="noreferrer"><img src={kofi} alt="The kofi logo of a coffee mug" /></a></li> */}
              </ul>
            </div>
          </nav>
        </header>
        <div className="rounded">
          <div className="flex justify-center gap-x-2">
            <div className="self-center text-4xl md:text-6xl text-[#BF392C] mb-20 mt-20">Knapsack Algorithm Visualization</div>
          </div>
          <div className="p-2">
            <div className="border bg-white p-6 md:max-w-2xl 2xl:max-w-5xl md:mx-auto rounded-lg">
              <AppContext.Provider value={{ appDispatch: dispatch }}>
                {state.showEntryForm ?
                  <SetupScreen
                    items={state.items}
                    capacity={state.capacity}
                  />
                  :
                  <div>
                    <SolutionController
                      knapsackAlgorithm={state.knapsack}
                    />
                  </div>
                }
              </AppContext.Provider>
            </div>
          </div>
        </div>
        <div className="flex flex-col place-content-center bg-white my-4 place-items-center text-xs">
          <div className="divide-y divide-dashed text-center">
            <div className="pt-2">
              <span className="inline-flex items-center">
                <img className="h-4" src={github} alt="github logo" />
                <span className="mx-1"><a href="https://github.com/hashtag7532" className="link">Github Link</a></span>
              </span>
            </div>
          </div>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
export { actionTypes };
