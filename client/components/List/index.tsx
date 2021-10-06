import React from "react";
import { FlexBox, Text } from "@oladimillion/react-form";
import { StyledCard as Card } from "./styled";
import { CountryName, CountryRegion, Row } from "./styled";
import { isEmptyValue } from "../../helpers";

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
        {isEmptyValue(data) && (
          <Text textAlign="center" py={4} as="h3">
            Nothing to display
          </Text>
        )}
      </Card>
    </FlexBox>
  );
};
