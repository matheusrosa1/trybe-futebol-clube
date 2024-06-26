export type ServiceMessage = { message: string };

export type ServiceRoleMessage = { role: string };

type ServiceResponseErrorType = 'INVALID_DATA'
| 'UNAUTHORIZED'
| 'NOT_FOUND'
| 'CONFLICT'
| 'UNPROCESSABLE_ENTITY';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL',
  data: T
};

export type ServiceResponseCreated<T> = {
  status: 'CREATED',
  data: T,
};

export type ServiceResponse<T> = ServiceResponseError
| ServiceResponseSuccess<T> | ServiceResponseCreated<T>;
