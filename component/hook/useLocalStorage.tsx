import { useState } from "react";

export function useLocalStorage(key:string, initalValue:any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initalValue;
    } catch (error) {
      return initalValue;
    }
  });

  const setValue = (value:any) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue,setValue]
}
