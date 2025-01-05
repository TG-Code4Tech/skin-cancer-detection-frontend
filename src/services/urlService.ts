import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const removeUrlSearchParams = (router: AppRouterInstance, paramsToRemove: string[]): void => {
    const cleanUrl = new URL(window.location.href);
    paramsToRemove.forEach((param) => cleanUrl.searchParams.delete(param));
    router.replace(cleanUrl.toString());
};
