type ErrorHandler = (error: any) => void;

let globalErrorHandler: ErrorHandler = (error) => {
  if (!error.handled) {
    console.error('Unhandled error:', error);
  }
};

export const setGlobalErrorHandler = (handler: ErrorHandler) => {
  globalErrorHandler = handler;
};

export const handleError = (error: any) => {
  globalErrorHandler(error);
}; 