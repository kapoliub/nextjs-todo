import { addToast } from "@heroui/toast";

export const addSuccessToast = (message: String, title?: string) =>
  addToast({
    title: title ?? "Success",
    color: "success",
    description: message,
  });

export const addInfoToast = (message: String, title?: string) =>
  addToast({
    title: title ?? "Info",
    color: "success",
    description: message,
  });

export const addErrorToast = (message: String, title?: string) =>
  addToast({
    title: title ?? "Error",
    color: "danger",
    description: message,
  });
