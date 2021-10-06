import React from "react";
import { Search } from "semantic-ui-react";
import { ICountryStore } from "../../stores/types";
import { debounce } from "../../helpers";

type Props = {
  countryStore: ICountryStore;
  setSelectedCountry: Function;
};

export const SearchInput = (props: Props) => {
  const { countryStore, setSelectedCountry } = props;
  const results = React.useMemo(() => {
    return countryStore.data.map((d, index) => ({ title: d?.name, index }));
  }, [countryStore.data]);

  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSearchChange = React.useCallback(async (e: any, data: any) => {
    try {
      setValue(() => data.value);
      setLoading(() => true);
      if (data.value.length > 2) {
        await debounce((data: any) => {
          setSelectedCountry({});
          countryStore.search(data);
        }, 2000)(data.value);
      }
    } finally {
      setLoading(() => false);
    }
  }, []);

  const onResultSelect = React.useCallback((_, data: any) => {
    setValue(() => data.result.title);
    setSelectedCountry(
      countryStore.data.find((_, i) => data.result.index === i)
    );
  }, []);

  return (
    <Search
      loading={loading}
      onResultSelect={onResultSelect}
      onSearchChange={handleSearchChange}
      results={results}
      value={value}
    />
  );
};

SearchInput.defaultProps = {
  data: [
    {
      name: "Nigeria",
      topLevelDomain: [".ng"],
      alpha2Code: "NG",
      alpha3Code: "NGA",
      callingCodes: ["234"],
      capital: "Abuja",
      altSpellings: [
        "NG",
        "Nijeriya",
        "Naíjíríà",
        "Federal Republic of Nigeria",
      ],
      region: "Africa",
    },
    {
      name: "Niger",
      topLevelDomain: [".ne"],
      alpha2Code: "NE",
      alpha3Code: "NER",
      callingCodes: ["227"],
      capital: "Niamey",
      altSpellings: ["NE", "Nijar", "Republic of Niger", "République du Niger"],
      region: "Africa",
    },
    {
      name: "Algeria",
      topLevelDomain: [".dz"],
      alpha2Code: "DZ",
      alpha3Code: "DZA",
      callingCodes: ["213"],
      capital: "Algiers",
      altSpellings: ["DZ", "Dzayer", "Algérie"],
      region: "Africa",
    },
    {
      name: "Georgia",
      topLevelDomain: [".ge"],
      alpha2Code: "GE",
      alpha3Code: "GEO",
      callingCodes: ["995"],
      capital: "Tbilisi",
      altSpellings: ["GE", "Sakartvelo"],
      region: "Asia",
    },
    {
      name: "Liberia",
      topLevelDomain: [".lr"],
      alpha2Code: "LR",
      alpha3Code: "LBR",
      callingCodes: ["231"],
      capital: "Monrovia",
      altSpellings: ["LR", "Republic of Liberia"],
      region: "Africa",
    },
    {
      name: "Hungary",
      topLevelDomain: [".hu"],
      alpha2Code: "HU",
      alpha3Code: "HUN",
      callingCodes: ["36"],
      capital: "Budapest",
      altSpellings: ["HU"],
      region: "Europe",
    },
  ],
};
