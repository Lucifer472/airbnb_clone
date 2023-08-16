"use client";
import useCountry from "@/app/hooks/useCountry";
import { CountrySelectValue, ICountrySelectProps } from "@/app/types";
import Select from "react-select";

const CountrySelect: React.FC<ICountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountry();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(opt: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{opt.flag}</div>
            <div>
              {opt.label},{" "}
              <span className="text-neutral-500 ml-1">{opt.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
