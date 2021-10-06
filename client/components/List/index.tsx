import React from "react";
import { FlexBox } from "@oladimillion/react-form";
import { StyledCard as Card } from "./styled";
import { CountryName, CountryRegion, Row } from "./styled";

type SelectedCountry = { name?: string; region?: string };
type Props = {
  data: Array<SelectedCountry>;
  setSelectedCountry(v: SelectedCountry): void;
  selectedCountry: SelectedCountry;
};

export const List = (props: Props) => {
  const { data, selectedCountry, setSelectedCountry } = props;

  return (
    <FlexBox width="40%">
      <Card>
        {data.map((value) => (
          <Row
            key={value.name}
            onClick={() => setSelectedCountry(value)}
            selected={value.name === selectedCountry.name}
          >
            <FlexBox flexDirection="column" p={3}>
              <CountryName>{value.name}</CountryName>
              <CountryRegion>{value.region}</CountryRegion>
            </FlexBox>
          </Row>
        ))}
      </Card>
    </FlexBox>
  );
};

List.defaultProps = {
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
