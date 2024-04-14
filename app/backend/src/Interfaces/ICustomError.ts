// Interface utilizada no error middleware para customizar os erros
interface ICustomError extends Error {
  statusCode?: number;
}

export default ICustomError;
