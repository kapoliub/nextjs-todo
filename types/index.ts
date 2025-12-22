import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ServerResponse<T> = Promise<{ data?: T; error?: string }>;
