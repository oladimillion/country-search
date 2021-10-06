import React from "react";
import { FlexBox } from "@oladimillion/react-form";
import { List } from "../../../components/List";
import { Detail } from "../../../components/Detail";
import { SearchInput } from "../../../components/SearchInput";
import { ICountryStore } from "../../../stores/types";
import { isEmptyValue } from "../../../helpers";
import { connect } from "./connect";

type Props = {
  countryStore: ICountryStore;
};

const Home = (props: Props) => {
  const { countryStore } = props;
  const [selectedCountry, setSelectedCountry] = React.useState({});

  return (
    <>
      <FlexBox mb={3}>
        <SearchInput
          countryStore={countryStore}
          setSelectedCountry={setSelectedCountry}
        />
      </FlexBox>
      <FlexBox>
        <List
          {...countryStore}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
        {!isEmptyValue(selectedCountry) && (
          <Detail data={selectedCountry as any} />
        )}
      </FlexBox>
    </>
  );
};

export default connect(Home);
