import { country } from "../Constant";

const useCountry = () => {
  const getAll = () => country;
  const getByValue = (value: string | undefined) => {
    return country.find((i) => i.value === value);
  };

  return { getAll, getByValue };
};

export default useCountry;
