import { useEffect, useState } from "react";
import { socket } from "../../utils/socket";
import { singletonHook } from "react-singleton-hook";
import ReactDOM from "react-dom";

const ListenEvents = {
  InitialState: "RouletteInitialState",
  Start: "RouletteStart",
  End: "RouletteEnd",
  Bet: "RouletteBet",
};

interface CurrentGameState {
  hash?: string;
  salt?: string;
  result?: number;
}

interface UserBet {
  id: string;
  username: string;
  betColour: string;
  betAmount: number;
  profilePic: string;
}

interface InitialState {
  currentGameState: CurrentGameState;
  bets: UserBet[];
  history: number[];
}

const placeBet = (amount: number, betColour: string) => {
  socket.emit("RouletteBet", amount, betColour);
};

function useRouletteManagerimpl() {
  const [currentGameState, setCurrentGameState] = useState<CurrentGameState>({});
  const [history, setHistory] = useState<number[]>([]);
  const [userBets, setUserBets] = useState<UserBet[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(true);

  useEffect(() => {
    function onInitialState(initialState: InitialState) {
      ReactDOM.unstable_batchedUpdates(() => {
        setCurrentGameState(initialState.currentGameState);
        setHistory(initialState.history);
        setUserBets(initialState.bets);
        setisLoading(false);
      });
    }
    function onStart(state: CurrentGameState) {
      ReactDOM.unstable_batchedUpdates(() => {
        setCurrentGameState(state);
        setUserBets([]);
      });
    }
    function onEnd(state: CurrentGameState) {
      setCurrentGameState(state);
    }
    function onBet(Bet: UserBet) {
      setUserBets(userBets => [...userBets!, Bet]);
    }
    socket.on(ListenEvents.InitialState, onInitialState);
    socket.on(ListenEvents.Start, onStart);
    socket.on(ListenEvents.End, onEnd);
    socket.on(ListenEvents.Bet, onBet);
    return () => {
      socket.off(ListenEvents.InitialState, onInitialState);
      socket.off(ListenEvents.Start, onStart);
      socket.off(ListenEvents.End, onEnd);
      socket.off(ListenEvents.Bet, onBet);
    }

  }, [])

  return {
    isLoading,
    currentGameState,
    history,
    userBets,
    placeBet,
  };
}

export const useRouletteManager = singletonHook(
  {isLoading : true, currentGameState: {}, history: [], userBets: [], placeBet },
  useRouletteManagerimpl
);
