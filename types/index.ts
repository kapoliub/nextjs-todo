import { SVGProps } from "react";

import { Database } from "@/lib/database.types";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ServerResponse<T> = Promise<{ data?: T; error?: string }>;

// --- Extract Types from the Database schema ---
// Todos
export type Todo = Database["public"]["Tables"]["todos"]["Row"];
export type InsertTodo = Database["public"]["Tables"]["todos"]["Insert"];
export type UpdateTodo = Database["public"]["Tables"]["todos"]["Update"];

// Lists
export type List = Database["public"]["Tables"]["lists"]["Row"];
export type InsertList = Database["public"]["Tables"]["lists"]["Insert"];
