import Button from "@material-ui/core/Button";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "react-query";
import Loader from "./Loader";
import Result from "./Result";
import { apiService } from "../../api";

type QueryWrapperProps = {
  children: React.ReactNode;
};

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

/**
 * 에러 유형에 따라 적절한 메시지를 반환하는 함수
 */
const getErrorMessage = (error: Error): { title: string; subTitle: string } => {
  // API 에러인 경우 (apiService에서 생성된 에러)
  if (apiService.isApiError(error)) {
    const statusCode = (error as any).statusCode;
    const errors = (error as any).errors || [];
    // const method = (error as any).method || "";
    const url = (error as any).url || "";

    // 상태 코드별 메시지 처리
    if (statusCode === 401) {
      return {
        title: "인증 오류",
        subTitle: "로그인이 필요하거나 인증이 만료되었습니다. 다시 로그인해주세요.",
      };
    } else if (statusCode === 403) {
      return {
        title: "권한 오류",
        subTitle: "해당 작업을 수행할 권한이 없습니다.",
      };
    } else if (statusCode === 404) {
      return {
        title: "리소스를 찾을 수 없음",
        subTitle: `요청하신 리소스(${url})를 찾을 수 없습니다.`,
      };
    } else if (statusCode >= 500) {
      return {
        title: "서버 오류",
        subTitle: "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
      };
    } else if (statusCode === 0) {
      return {
        title: "네트워크 오류",
        subTitle: "서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.",
      };
    }

    // 기타 API 에러
    return {
      title: `API 오류 (${statusCode})`,
      subTitle: `${error.message}${errors.length > 0 ? ` - ${errors.join(", ")}` : ""}`,
    };
  }

  // React Query 관련 에러
  if (error.name === "QueryError") {
    return {
      title: "데이터 조회 오류",
      subTitle: "데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.",
    };
  }

  // 기타 일반 에러
  return {
    title: "오류 발생!",
    subTitle: "문제가 발생했습니다! 문제가 지속되면 문의해주세요.",
  };
};

/**
 * 에러 발생 시 표시할 컴포넌트
 */
const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps): JSX.Element => {
  const errorInfo = getErrorMessage(error);

  return (
    <Result
      extra={
        <Button onClick={() => resetErrorBoundary()} variant="contained">
          다시 시도
        </Button>
      }
      status="error"
      subTitle={errorInfo.subTitle}
      title={errorInfo.title}
    />
  );
};

const QueryWrapper = ({ children }: QueryWrapperProps): JSX.Element => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={(props) => <ErrorFallback {...props} />}
    >
      <React.Suspense fallback={<Loader />}>{children}</React.Suspense>
    </ErrorBoundary>
  );
};

export default QueryWrapper;
