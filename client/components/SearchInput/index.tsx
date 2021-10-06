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
