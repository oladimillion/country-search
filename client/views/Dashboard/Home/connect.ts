import { inject, observer } from "mobx-react";
import { compose } from "lodash/fp";

export const connect = compose(inject("countryStore"), observer);
