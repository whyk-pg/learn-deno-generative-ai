// deno-lint-ignore-file no-explicit-any

interface LangChainErrorLike {
  message: string;
  response?: {
    status: number;
  };
}

/** LangChainによるエラーかどうか */
export const isLangChainErrorLike = (
  error: unknown,
): error is LangChainErrorLike => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as any).message === "string" &&
    (!("response" in error) ||
      (typeof (error as any).response === "object" &&
        (error as any).response !== null &&
        "status" in (error as any).response &&
        typeof ((error as any).response as any).status === "number"))
  );
};
