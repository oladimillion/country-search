import { compose } from "lodash/fp";
import { withData, withAccount } from "../../hoc";
import { mustBeAuthenticated } from "../../helpers/mustBeAuthenticated";

export const connect = compose(withAccount, withData(mustBeAuthenticated));
