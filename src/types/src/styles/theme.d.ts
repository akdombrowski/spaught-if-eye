import { type ThemeOptions } from "@mui/material/styles";
declare module "@mui/material/styles" {
    interface Theme {
        status: {
            danger: string;
        };
    }
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
}
export declare const themeOptions: ThemeOptions;
export declare const theme: import("@mui/material").Theme;
export default theme;
//# sourceMappingURL=theme.d.ts.map