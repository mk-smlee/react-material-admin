import Button from "@material-ui/core/Button";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "react-query";
import Loader from "./Loader";
import Result from "./Result";

type QueryWrapperProps = {
  children: React.ReactNode;
};

const QueryWrapper = ({ children }: QueryWrapperProps) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <Result
          extra={
            <Button onClick={() => resetErrorBoundary()} variant="contained">
              다시 시도
            </Button>
          }
          status="error"
          subTitle="문제가 발생했습니다! 문제가 지속되면 문의해주세요."
          title="오류 발생!"
        />
      )}
    >
      <React.Suspense fallback={<Loader />}>{children}</React.Suspense>
    </ErrorBoundary>
  );
};

export default QueryWrapper;
