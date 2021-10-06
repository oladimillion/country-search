import swal from "sweetalert";
import { ButtonList } from "sweetalert/typings/modules/options/buttons";

type Props = {
  title?: string;
  content?: string;
  actions?: { label: string; onClick(): void }[];
};

/***
 *
 * {
 *     title: 'title',
 *     content: 'content',
 *     actions: [
 *       {
 *          label: 'Yes',
 *          onClick: () => {},
 *       },
 *       {
 *          label: 'No',
 *          onClick: () => {},
 *       },
 *       ...
 *     ]
 * }
 *
 **/

export const sweetAlert = async (props = {} as Props) => {
  const { title, content, actions: modalActions = [], ...rest } = props;
  const buttons = modalActions.reduce((accum: any, { label }) => {
    accum[label.toLowerCase()] = label;
    return accum;
  }, {});
  const noop = () => {};
  const asyncRequests = modalActions.reduce((accum: any, curr: any) => {
    const { label, onClick } = curr;
    accum[label.toLowerCase()] = onClick || noop;
    return accum;
  }, {});

  try {
    const value = await swal({
      ...(title && { title }),
      ...(content && { text: content }),
      buttons: {
        cancel: "Close",
        ...buttons,
      } as ButtonList,
      ...rest,
    });
    if (value) {
      await asyncRequests[value]();
    }
    // @ts-ignore
    swal.close();
  } catch (e) {
    throw e;
  }
};
