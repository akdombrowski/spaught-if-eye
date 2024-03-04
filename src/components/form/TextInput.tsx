// /* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { forwardRef as forwardRef, useImperativeHandle } from "react";

// import TextField from "@mui/material/TextField";

// export const MyInputComponent = forwardRef((props, ref) => {
//   const { component: Component, ...other } = props;

//   // implement `InputElement` interface
//   // useImperativeHandle(ref, () => ({
//   //   focus: () => {
//   //     // logic to focus the rendered component from 3rd party belongs here
//   //   },
//     // hiding the value e.g. react-stripe-elements
//   }));

//   // `Component` will be your `SomeThirdPartyComponent` from below
//   return <Component {...other} />;
// });

// export const TextInput = () => {
//   return (
//     <TextField
//       InputProps={{
//         inputComponent: MyInputComponent,
//         inputProps: {
//           component: TextField,
//         },
//       }}
//     />
//   );
// };

// export default TextInput;
