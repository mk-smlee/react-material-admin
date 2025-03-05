import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';

// API 응답 인터페이스 정의
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

// 에러 응답 인터페이스 정의
export class ErrorPayLoad {
  statusCode: number = 500;
  message: string = '알 수 없는 오류가 발생했습니다.';
  errors?: string[];
  stack?: string;
}

if (!process.env.REACT_APP_API_BASE_URL) {
  throw new Error('Missing REACT_APP_API_BASE_URL environment variable');
}

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// 응답 인터셉터 설정
api.interceptors.response.use(
  // 성공 응답 처리
  <T>(response: AxiosResponse<ApiResponse<T>>): T => {
    // API 응답에서 실제 데이터만 추출하여 반환
    return response.data.data as T;
  },
  // 에러 응답 처리
  (error: AxiosError<ErrorPayLoad>) => {
    // 요청 정보 추출
    const url = error.config?.url || '알 수 없는 URL';
    const method = error.config?.method?.toUpperCase() || 'UNKNOWN';
    
    let errorMessage = '알 수 없는 오류가 발생했습니다.';
    let statusCode = 500;
    let errorDetails: string[] = [];
    
    // 서버에서 받은 에러 정보가 있는 경우
    if (error.response) {
      const errorPayload = error.response.data;
      errorMessage = errorPayload?.message || `서버 에러 (${error.response.status})`;
      statusCode = errorPayload?.statusCode || error.response.status;
      errorDetails = errorPayload?.errors || [];
    } 
    // 요청이 서버에 도달했으나 응답 형식이 잘못된 경우
    else if (error.request) {
      errorMessage = '서버 응답을 받지 못했습니다. 네트워크 연결을 확인해주세요.';
      statusCode = 0;
    } 
    // 요청 설정 중 에러가 발생한 경우
    else {
      errorMessage = `요청 설정 중 오류: ${error.message}`;
    }
    
    // API URL과 메서드 정보 추가
    const requestInfo = `${method} ${url}`;
    
    // 표준화된 에러 객체 생성
    const enhancedError = new Error(errorMessage);
    
    // 추가 정보 저장
    (enhancedError as any).statusCode = statusCode;
    (enhancedError as any).errors = errorDetails;
    (enhancedError as any).isApiError = true;
    (enhancedError as any).url = url;
    (enhancedError as any).method = method;
    (enhancedError as any).requestInfo = requestInfo;
    
    // 콘솔에 자세한 에러 정보 로깅 (개발 환경에서만)
    if (process.env.NODE_ENV === 'development') {
      console.error(`API 에러 (${requestInfo}):`, { 
        statusCode, 
        message: errorMessage, 
        details: errorDetails,
        originalError: error
      });
    }
    
    return Promise.reject(enhancedError);
  }
);

// 타입 안전성을 위한 요청 헬퍼 함수들
export const apiService = {
  /**
   * GET 요청을 수행합니다.
   * @param url 요청 URL
   * @param params 쿼리 파라미터
   */
  get: async <T>(url: string, params?: any): Promise<T> => {
    return api.get<ApiResponse<T>, T>(url, { params });
  },
  
  /**
   * POST 요청을 수행합니다.
   * @param url 요청 URL
   * @param data 요청 바디
   */
  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return api.post<ApiResponse<T>, T>(url, data, config);
  },
  
  /**
   * PUT 요청을 수행합니다.
   * @param url 요청 URL
   * @param data 요청 바디
   */
  put: async <T>(url: string, data?: any): Promise<T> => {
    return api.put<ApiResponse<T>, T>(url, data);
  },
  
  /**
   * PATCH 요청을 수행합니다.
   * @param url 요청 URL
   * @param data 요청 바디
   */
  patch: async <T>(url: string, data?: any): Promise<T> => {
    return api.patch<ApiResponse<T>, T>(url, data);
  },
  
  /**
   * DELETE 요청을 수행합니다.
   * @param url 요청 URL
   */
  delete: async <T>(url: string): Promise<T> => {
    return api.delete<ApiResponse<T>, T>(url);
  },
  
  /**
   * API 에러인지 확인합니다.
   * @param error 확인할 에러 객체
   */
  isApiError: (error: any): boolean => {
    return error && error.isApiError === true;
  },
};

export default api;