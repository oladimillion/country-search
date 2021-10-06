import React from "react";
import { get } from "lodash";
import { FlexBox, Text } from "@oladimillion/react-form";
import { CountryDetail, Placeholder } from "./styled";
import { StyledCard as Card } from "./styled";

type Props = {
  data?: { name: string };
};

const mapProperties = {
  alpha2Code: {
    label: "Code",
  },
  capital: {
    label: "Capital",
  },
  region: {
    label: "Region",
  },
  altSpellings: {
    label: "Calling Codes",
    getValue: (data?: Array<string>) => {
      return data?.join(", ");
    },
  },
};

const ordering = ["capital", "region", "altSpellings", "alpha2Code"];

const renderCountryDetail = (data: Props["data"]) => {
  return ordering.map((key: string) => {
    const { label, getValue } = get(mapProperties, key);
    const dataDetail = get(data, key);
    const value = getValue ? getValue(dataDetail) : dataDetail;

    return (
      <FlexBox my={2} key={key}>
        <Placeholder />
        <FlexBox flexDirection="column" flex={1}>
          <Text fontWeight="500" m={0} color="#111">
            {label}
          </Text>
          <Text color="#444">{value}</Text>
        </FlexBox>
      </FlexBox>
    );
  });
};

export const Detail = (props: Props) => {
  const { data } = props;

  return (
    <FlexBox width="50%" ml={2} p={1} pb={5}>
      <Card width="100%">
        <Card.Header>
          <Card.HeaderText>{data?.name}</Card.HeaderText>
        </Card.Header>
        <CountryDetail>{renderCountryDetail(data)}</CountryDetail>
      </Card>
    </FlexBox>
  );
};

Detail.defaultProps = {
  data: {
    name: "Nigeria",
    alpha2Code: "NG",
    callingCodes: ["234"],
    capital: "Abuja",
    altSpellings: ["NG", "Nijeriya", "Naíjíríà", "Federal Republic of Nigeria"],
    region: "Africa",
  },
};
