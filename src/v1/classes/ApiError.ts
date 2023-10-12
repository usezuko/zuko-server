import { QueryError } from "mysql2"
class ApiError {
	ApiErrorcode: number;
	message: string;

	constructor(ApiErrorcode: number, message: string) {
		this.ApiErrorcode = ApiErrorcode;
		this.message = message;
	}
}

export default ApiError;
